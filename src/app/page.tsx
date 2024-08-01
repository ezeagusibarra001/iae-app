"use client";
import Hero from "@/components/Hero";
import { ContactData } from "@/types/global.types";
import { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

export default function Home() {
  const [excelData, setExcelData] = useState<ContactData[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      toast.loading("Cargando...");
      if (!event.target.files) {
        setLoading(false);
        return;
      }
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        if (e.target && e.target.result) {
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setExcelData(json as ContactData[]);

          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
          });

          if (response.ok) {
            console.log("Data uploaded successfully");
            toast.dismiss();
            toast.success("Data uploaded successfully");
          }
          setLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to upload data");
    }
  };

  return (
    <>
      <main>
        <Hero handleFileChange={handleFileChange} loading={loading} />
        {loading ? "Cargando..." : ""}
      </main>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
