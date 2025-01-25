"use client";
import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
  } from "@/components/ui/command"
import { useState } from "react";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { DialogTitle } from "@/components/ui/dialog";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";

export const Toolbar = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { data } = useGetWorkspace({id: workspaceId});
    const {data: channels} = useGetChannels({workspaceId});
    const {data: members} = useGetMembers({workspaceId});
    const [open, setOpen] = useState(false);

    const handleChannelClick = (channelId: Id<"channels">) => {
        setOpen(false);
        router.push(`/workspace/${workspaceId}/channel/${channelId}`);
        console.log("clicked channel");
    }

    const handleMemberClick = (memberId: Id<"members">) => {
        setOpen(false);
        router.push(`/workspace/${workspaceId}/member/${memberId}`);
        console.log("clicked workspace");
    }

    return (
        <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
            <div className="flex-1" />
            <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
                <Button onClick={() => setOpen(true)} size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2">
                    <Search className="size-4 text-white mr-2"/>
                    <span className="text-white text-xs">
                        Search {data?.name}
                    </span>
                </Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <DialogTitle className="hidden"></DialogTitle>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Channels">
                            {channels?.map((channel) => (
                                <CommandItem key={channel._id} onSelect={() => handleChannelClick(channel._id)}>
                                    {channel.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandSeparator/>
                        <CommandGroup heading="Members">
                            {members?.map((member) => (
                                <CommandItem key={member._id} onSelect={() => handleMemberClick(member._id)}>
                                    {member.user.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </div>
            <div className="ml-auto flex-1 flex items-center justify-end">
                <Button variant="transparent" size="iconSm">
                    <Info className="size-5 text-white"/>
                </Button>
            </div>
        </nav>
    );
};