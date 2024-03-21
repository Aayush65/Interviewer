import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { VideoContextProvider } from "./context/videoContext";

export const metadata: Metadata = {
  title: "Interviewer",
  description: "App for interviewing by next js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VideoContextProvider>
          {children}
        </VideoContextProvider>
      </body>
    </html>
  );
}
