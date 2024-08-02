"use client";
import Countdown from "@/components/Countdown";
import Hero from "@/components/Hero";
import { ContactData } from "@/types/global.types";
import { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

export default function Home() {
  const [excelData, setExcelData] = useState<ContactData[] | null>(null);
  const [loading, setLoading] = useState(false);

  function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

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
        try {
          if (e.target && e.target.result) {
            const data = new Uint8Array(e.target.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(json as ContactData[]);

            const chunkSize = 1000;
            const dataChunks = chunkArray(json, chunkSize);

            const deleteRes = await fetch("/api/delete", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(deleteRes);

            const promises = dataChunks.map((chunk) =>
              fetch("/api/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(chunk),
              })
            );
            console.log(promises);
            const res = await Promise.all(promises);

            if (res.every((r) => r.ok)) {
              console.log("Data uploaded successfully");
              toast.dismiss();
              toast.success("Data uploaded successfully");
            }
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
          throw new Error();
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
        {loading && <Countdown />}
      </main>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
