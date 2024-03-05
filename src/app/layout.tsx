import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/libs/utils";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(
      'bg-white text-slate-900 antialiased', inter.className
    )}>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          {children}
          <Toaster position='bottom-right' />
          <Navbar />
        </Providers>
        {/* Allow for more height on mobile devices */}
        <div className="h-40 md:hidden" aria-hidden/>
      </body>
    </html>
  );
}