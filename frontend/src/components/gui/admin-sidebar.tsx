"use client";

import { ChevronUp, ChevronDown, Home, User, CopyPlus, DatabaseZap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
// const items = [
//     { title: "Users", url: "/admin", icon: User },
//     { title: "Add Questions", url: "/admin/add_ques", icon: CopyPlus },
//     { title: "All Questions", url: "/admin/all_ques", icon: DatabaseZap },

//     // // Example of a collapsible menu item with children
//     // {
//     //     title: "More",
//     //     icon: DatabaseZap,
//     //     children: [
//     //         { title: "Archived Questions", url: "/admin" },
//     //         { title: "Reports", url: "/admin" },
//     //     ],
//     // },
// ];
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react"

type SidebarIcon = ForwardRefExoticComponent<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>>

export interface SidebarItem {
    title: string
    url: string
    icon: SidebarIcon
    children?: SidebarItem[]
}

export const items: SidebarItem[] = [
    { title: "Users", url: "/admin", icon: User },
    { title: "Add Questions", url: "/admin/add_ques", icon: CopyPlus },
    { title: "All Questions", url: "/admin/all_ques", icon: DatabaseZap },

]

export function AppSidebar() {
    const [openItem, setOpenItem] = useState<string | null>(null);

    return (
        <div className="bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] w-[256px] min-h-screen p-4">
            <Sidebar className="w-[256px]">
                <SidebarContent>
                    <Image
                        src="/images/apple-icon-white.png"
                        alt="Logo"
                        width={200}
                        height={200}
                        className="img-fluid"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                        priority
                    />

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.children && item.children.length > 0 ? (
                                        <Collapsible
                                            open={openItem === item.title}
                                            onOpenChange={(isOpen) =>
                                                setOpenItem(isOpen ? item.title : null)
                                            }
                                        >
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className="w-full cursor-pointer">
                                                    <div className="flex items-center justify-between w-full text-[var(--sidebar-link)]">
                                                        <div className="flex items-center">
                                                            <item.icon className="w-4 h-4 mr-2" />
                                                            <span>{item.title}</span>
                                                        </div>
                                                        <span className="text-xs">
                                                            {openItem === item.title ? (
                                                                <ChevronUp />
                                                            ) : (
                                                                <ChevronDown />
                                                            )}
                                                        </span>
                                                    </div>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>

                                            <CollapsibleContent className="ml-5 mt-2 flex flex-col gap-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.title}
                                                        href={child.url}
                                                        className="flex items-center text-sm m-1 hover:underline"
                                                    >
                                                        <span className="ml-2">{child.title}</span>
                                                    </Link>
                                                ))}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton asChild>
                                            {item.url ? (
                                                <Link
                                                    href={item.url}
                                                    className="flex gap-2 items-center hover:underline transition-all"
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    {item.title}
                                                </Link>
                                            ) : (
                                                <div className="flex gap-2 items-center opacity-50 cursor-not-allowed">
                                                    <item.icon className="w-4 h-4" />
                                                    {item.title}
                                                </div>
                                            )}

                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarContent>
            </Sidebar>
        </div>
    );
}
