
"use client"
import { BookHeart, Home, Settings, NotebookPen, ListChecks, NotepadText, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider, SidebarTrigger
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  
  {
    title: "Qbank",
    icon: BookHeart,
    children: [
      { title: "Create Test", url: "/dashboard/create-test", icon: NotebookPen },
      { title: "Previous Test", url: "#previous-test", icon: NotepadText },
      { title: "Result", url: "/dashboard/result", icon: ListChecks },
    ]
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (

    <div className="bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] w-[256px] min-h-screen p-4">
      <Sidebar className="w-[256px]">
        <SidebarContent>
          <Image
            src="/images/apple-icon-white.png"
            className="img-fluid"
            alt=""
            width={200}
            height={200}
            data-aos="zoom-in"
            data-aos-delay="100"
            priority
          />

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <Collapsible open={openItem === item.title}
                      onOpenChange={(isOpen) => setOpenItem(isOpen ? item.title : null)}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full cursor-pointer">
                          <div className="flex items-center justify-between w-full text-[var(--sidebar-link)]">
                            <div className="flex items-center ">
                              <item.icon className="w-4 h-4 text-[var(--sidebar-link)] mr-2" />
                              <span className="text-[var(--sidebar-link)]">{item.title}</span>
                            </div>
                            <span className="text-xs"> {openItem === item.title ? <ChevronUp /> : <ChevronDown />}</span>
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="ml-5 mt-2 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.url}
                            className="flex items-center  text-sm m-1 hover:underline"
                          >
                            {child.icon && (
                              <child.icon className="text-[var(--sidebar-link)] mx-2 w-4 h-4" />
                            )}
                            <span className="text-[var(--sidebar-link)]">{child.title}</span>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex gap-2 items-center text-[var(--sidebar-link)] hover:[text-decoration-line:none] transition-all"
                      >
                        <item.icon className="text-[var(--sidebar-link)]" />
                        <span className="text-[var(--sidebar-link)]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}