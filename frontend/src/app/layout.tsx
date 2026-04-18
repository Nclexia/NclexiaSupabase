// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "../styles/globals.css";
// //import  "../styles/global.scss"
// // import SessionWrapper from "@/components/providers/SessionWrapper"
// import {ConditionalHeader,ConditionalFooter} from "@/app/context/ConditionalProvider";
// import { ThemeProvider } from 'next-themes';
// // import Footer from "@/components/layouts/Footer";
// import BootstrapClient from "@/components/layouts/BootstrapClient";
// import 'bootstrap/dist/css/bootstrap.min.css';
//  import ThemeToggle from '@/components/gui/ThemeToggle';
// import { AuthProvider } from '@/app/context/AuthContext';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Nclexia - Ace Your NCLEX Exam with Smart Learning",
//   description: 'Master the NCLEX exam with personalized practice tests, and interactive lessons designed to boost your nursing career success.',
//   manifest: '/manifest.json', 

// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="scroll-smooth" suppressHydrationWarning>
 
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
//        <ThemeProvider 
//         attribute="class"
//         defaultTheme="system"
//         enableSystem = {true}
//         storageKey="nclex-theme"
//         value={{ light: 'light', dark: 'dark',system :"system" }}
//         disableTransitionOnChange>
//           <ThemeToggle/>
//       <BootstrapClient />
//          <AuthProvider>
//         <ConditionalHeader />
//         {children}
//         <ConditionalFooter />
//         </AuthProvider>
//         </ThemeProvider>
//       </body>

//     </html>
//   );
// }


import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { ConditionalHeader, ConditionalFooter } from "@/app/context/ConditionalProvider";
import { ThemeProvider } from 'next-themes';
import BootstrapClient from "@/components/layouts/BootstrapClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeToggle from '@/components/gui/ThemeToggle';
import { AuthProvider } from '@/app/context/AuthContext';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nclexia - Ace Your NCLEX Exam with Smart Learning",
  description: 'Master the NCLEX exam with personalized practice tests.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning  data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          storageKey="nclex-theme"
          value={{ light: 'light', dark: 'dark', system: 'system' }}
          disableTransitionOnChange
        >
          <AuthProvider>  {/* ✅ AuthProvider inside ThemeProvider */}
            <BootstrapClient />
            <ThemeToggle />          {/* ✅ moved inside AuthProvider */}
            <ConditionalHeader />
            {children}
            <ConditionalFooter />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}