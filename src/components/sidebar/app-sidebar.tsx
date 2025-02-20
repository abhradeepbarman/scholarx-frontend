"use client";

import {
    BookOpen,
    Bot,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";
import * as React from "react";

import { RootState } from "@/app/store";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";
import { UserRole } from "@/config/constants";
import { useSelector } from "react-redux";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// TODO: Fill actual Data

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
};

const OrgSidebarContent = {
    navMain: [
        {
            title: "Dashboard",
            url: "/org/dashboard",
            icon: SquareTerminal,
        },
        {
            title: "Scholarships",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Add Scholarship",
                    url: "/org/scholarships/add",
                },
                {
                    title: "View Scholarships",
                    url: "/org/scholarships/view",
                },
            ],
        },
        {
            title: "Applications",
            url: "/org/applications",
            icon: SquareTerminal,
        },
    ],
    projects: [
        {
            name: "Hello",
            url: "#",
            icon: PieChart,
        },
    ],
};

const StudentSidebarContent = {
    navMain: [
        {
            title: "Dashboard",
            url: "/student/dashboard",
            icon: SquareTerminal,
            isActive: true,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { role } = useSelector((state: RootState) => state.auth);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain
                    items={
                        role === UserRole.STUDENT
                            ? StudentSidebarContent.navMain
                            : OrgSidebarContent.navMain
                    }
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
