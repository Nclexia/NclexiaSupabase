import { SidebarProvider } from "@/components/ui/sidebar";
import AdminShell from './guard/AdminShell';
import { CoonditionalDashboardProvider } from "@/app/context/ConditionalDashboardProvider";
import { ReactNode } from "react";
import "../../styles/admin.css";
import type { Metadata } from "next";
import AuthListener from "./AuthListener";

export const metadata: Metadata = {
  title: "Nclexia - Ace Your NCLEX Exam with Smart Learning",
  description: 'Master the NCLEX exam with personalized practice tests.',
  manifest: '/manifest.json',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthListener />

      <SidebarProvider defaultOpen={true}>
        <AdminShell>
          <CoonditionalDashboardProvider />
          <main>
            {children}
          </main>
        </AdminShell>
      </SidebarProvider>
    </>
  );
}