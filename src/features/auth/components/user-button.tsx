"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export const UserButton = () => {
    const { signOut } = useAuthActions();
    const router = useRouter();
    const { data, isLoading } = useCurrentUser();

    const handleSignOut = () => {
        signOut();
        router.replace("/auth");
    }

    if (isLoading){
        return <Loader className="size-4 animated-spin text-muted-foreground"/>
    }
    if(!data){
        return null;
    }

    const {image, name} = data;
    const avatarFallback = name!.charAt(0).toUpperCase();
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage alt={name} src={image}/>
                    <AvatarFallback className="bg-sky-500 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={() => {handleSignOut()}} className="h-10 flex items-center">
                    <LogOut className="size-4 mr-2"/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}