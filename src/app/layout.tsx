import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

const gothamBlackFont = localFont({
  variable: "--gotham-black",
  src: './fonts/Gotham_Black.otf'
})

export const metadata: Metadata = {
  title: "Alfred technical test",
  description: "Aplicación desarrollada como prueba técnica para Alfred, que demuestra habilidades en React, Next.js y desarrollo de interfaces modernas, desarrollada por Sebastián Londoño Valencia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gothamBlackFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
