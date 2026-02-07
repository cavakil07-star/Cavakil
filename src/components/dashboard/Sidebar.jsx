"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/constants/assets";
import { usePermissions } from "@/hooks/usePermissions";
import SidebarSkeleton from "./SidebarSkeleton";
import LogoutDialog from "../auth/LogoutDialog";


export default function Sidebar({ isOpen, setIsSidebarOpen, sidebarLinks }) {
    const { data, isLoading, error } = usePermissions();
    const pathname = usePathname();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const role = data?.role;
    const perms = data?.permissions || {};

    function can(resource, action) {
        if (role === 'admin') return true;
        if (role === 'sub-admin') return !!perms?.[resource]?.[action];
        return false;
    }

    const allowedLinks = sidebarLinks.filter(link => can(link.key, 'view'));
    // console.log(allowedLinks)

    function onLinkClick() {
        setIsSidebarOpen(false);
    }

    return (
        <div className={`max-[640px]:max-w-58 max-[640px]:absolute ${!isOpen ? "-left-full" : 'left-0'} max-[640px]:top-0 lg:w-[16rem] h-screen bg-gray-900 overflow-auto text-gray-100 border-r border-gray-700 shadow-xl flex flex-col items-center gap-2 px-3 py-2 transition-all duration-500 ease-in-out z-[100]`}>
            {/* Logo Section */}
            <div className="w-full pt-4 pb-4 px-4 hover:scale-[1.02] transition-transform duration-300 rounded-3xl">
                <Image
                    src={IMAGES.LOGO}
                    alt="logo"
                    height={160}
                    width={160}
                    className="object-contain rounded-2xl"
                />
            </div>

            {/* Navigation Links */}
            {isLoading ? <div><SidebarSkeleton /></div>
                : <div className="w-full flex flex-col gap-3 transition-all duration-300 ease-in-out">
                    {allowedLinks?.map(({ href, label, icon }) => {
                        const abc = href.split('/')[1];
                        const isActive = href === `/${abc}` ? pathname === `/${abc}` : pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={onLinkClick}
                                className={`group flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-300
                                ${isActive
                                        ? "bg-gray-700 shadow-md text-white"
                                        : "hover:bg-gray-800 hover:translate-x-1 text-gray-300 hover:text-white"}
                            `}
                            >
                                <span className={`p-2 rounded-lg ${isActive ? "bg-white/10" : "bg-gray-800 group-hover:bg-gray-700"
                                    }`}>
                                    <span
                                        className="text-sm text-gray-100"
                                    // style={{ fontSize: "max(1.1vw, 15px)" }}
                                    >
                                        {icon}
                                    </span>
                                </span>

                                <span className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                                    {label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            }
            {/* Profile Section */}
            <div className="mt-auto w-full border-t border-gray-700 pt-6">
                <div className="flex items-center p-2 space-x-4">
                    <Image src={IMAGES.AVATAR} alt="User" width={40} height={40} className="rounded-full ring-2 ring-gray-400" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">Admin Panel</span>
                        <p className="text-xs text-gray-400 sm:hidden lg:block">cavakil.com</p>
                    </div>
                </div>

                <Button
                    className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-gray-100 transition-colors"
                    onClick={() => setIsLogoutDialogOpen(true)}
                >
                    <LogOut className="mr-2 h-4 w-4 text-red-400" />
                    Logout
                </Button>
            </div>
            <LogoutDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen} />
        </div>
    );
}
