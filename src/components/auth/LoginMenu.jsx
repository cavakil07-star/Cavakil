"use client"
// components/auth/LoginMenu.jsx
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, User, FileText, LogOut, LayoutDashboard } from 'lucide-react';
import AuthDialog from './LoginDialog';

export default function LoginMenu() {
    const { data: session } = useSession();
    // console.log(session)
    const router = useRouter();
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    if (!session || !session.user) {
        return (
            <>
                <Button
                    onClick={() => setIsLoginDialogOpen(true)}
                    className=""
                >
                    Login
                </Button>
                <AuthDialog
                    open={isLoginDialogOpen}
                    onOpenChange={setIsLoginDialogOpen}
                />
            </>
        );
    }

    const { role, phone, email } = session.user;
    const displayName = phone || email || 'User';

    const getRoleColor = () => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'sub-admin': return 'bg-purple-100 text-purple-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    const getInitials = () => {
        if (phone) return phone.slice(-2);
        if (email) return email.slice(0, 2).toUpperCase();
        return 'U';
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 group">
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 rounded-full group-hover:from-blue-600 group-hover:to-indigo-700 transition-all">
                                <Avatar className="w-10 h-10 bg-white border-2 border-white">
                                    <AvatarImage src="/avatar.jpg" alt="avatar" />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                                        {getInitials()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="absolute -bottom-1 -right-1">
                                <Badge className={`${getRoleColor()} px-2 py-0.5 text-xs font-medium rounded-full`}>
                                    {role}
                                </Badge>
                            </div>
                        </div>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-72 p-0 border-0 shadow-xl rounded-xl overflow-hidden"
                >
                    {/* User profile card */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-14 h-14 border-2 border-white/30">
                                <AvatarImage src="/lawyer2.png" alt="avatar" />
                                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-semibold">
                                    {getInitials()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold">{displayName}</h3>
                                <div className={`inline-block ${getRoleColor()} px-2 py-0.5 rounded-full text-xs mt-1 capitalize`}>
                                    {role} account
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-2">
                        {role === 'user' && (
                            <>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-50 cursor-pointer"
                                    onClick={() => router.push('/user')}
                                >
                                    <User className="w-4 h-4 text-blue-600" />
                                    <span>My Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-50 cursor-pointer"
                                    onClick={() => router.push('/user')}
                                >
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    <span>Orders History</span>
                                </DropdownMenuItem>
                            </>
                        )}

                        {(role === 'admin' || role === 'sub-admin') && (
                            <DropdownMenuItem
                                className="flex items-center gap-2 p-3 rounded-md hover:bg-blue-50 cursor-pointer"
                                onClick={() => router.push('/admin')}
                            >
                                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                                <span>Admin Dashboard</span>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator className="my-1" />

                        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                            <DialogTrigger asChild>
                                <DropdownMenuItem
                                    className="flex items-center gap-2 p-3 rounded-md hover:bg-red-50 cursor-pointer"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <LogOut className="w-4 h-4 text-red-600" />
                                    <span className="text-red-600">Sign Out</span>
                                </DropdownMenuItem>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-md rounded-xl">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <LogOut className="w-5 h-5 text-red-500" />
                                        Confirm Sign Out
                                    </DialogTitle>
                                    <DialogDescription className="pt-2">
                                        Are you sure you want to sign out of your account?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="sm:justify-start pt-4">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setIsLogoutDialogOpen(false)}
                                        className="px-6"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="px-6"
                                    >
                                        Sign Out
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}