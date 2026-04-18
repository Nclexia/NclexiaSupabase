import { SidebarProvider, } from "@/components/ui/sidebar";
import AdminGuard from './guard/AdminGuard'
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '@/components/gui/ThemeToggle';
import "../../styles/admin.css";
import { CoonditionalDashboardProvider } from "@/app/context/ConditionalDashboardProvider";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Nclexia - Ace Your NCLEX Exam with Smart Learning",
  description: 'Master the NCLEX exam with personalized practice tests, and interactive lessons designed to boost your nursing career success.',
  manifest: '/manifest.json', 

}; 
export default async function AdminLayout({ children }: { children: React.ReactNode }) {


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      storageKey="nclex-theme"
      value={{ light: 'light', dark: 'dark', system: "system" }}
      disableTransitionOnChange
    >
      <ThemeToggle />
      <SidebarProvider defaultOpen={true}>
        <AdminGuard>
          <CoonditionalDashboardProvider />
          <main>
            {children}
          </main>

        </AdminGuard>
      </SidebarProvider>
    </ThemeProvider>
  );
}
