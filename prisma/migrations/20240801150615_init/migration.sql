-- CreateTable
CREATE TABLE "Contact" (
    "contactoid" TEXT NOT NULL,
    "Mail" TEXT NOT NULL,
    "Fecha_Creacion" INTEGER NOT NULL,
    "new_utm_campaign" TEXT NOT NULL,
    "new_utm_content" TEXT NOT NULL,
    "new_utm_medium" TEXT NOT NULL,
    "new_utm_source" TEXT NOT NULL,
    "new_utm_term" TEXT NOT NULL,
    "new_utmsname" TEXT NOT NULL,
    "Estado_Interes" TEXT NOT NULL,
    "Pais" TEXT NOT NULL,
    "Linea_Producto" TEXT NOT NULL,
    "Tipo_Producto" TEXT NOT NULL,
    "Programa" TEXT NOT NULL,
    "utm_campaign_contacto" TEXT NOT NULL,
    "utm_content_contacto" TEXT NOT NULL,
    "utm_medium_contacto" TEXT NOT NULL,
    "utm_source_contacto" TEXT NOT NULL,
    "utm_term_contacto" TEXT NOT NULL,
    "Estado_Venta" TEXT NOT NULL,
    "Importe_Venta" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("contactoid")
);
