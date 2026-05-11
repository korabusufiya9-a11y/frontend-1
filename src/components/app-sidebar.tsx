import * as React from "react";
import { Link } from "react-router-dom";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconDatabase,
  IconReport,
  IconSettings,
  IconHelp,
  IconSearch,
  IconInnerShadowTop,
} from "@tabler/icons-react";

/* ================= DATA ================= */

const data = {
  user: {
    name: "Sakshi",
    email: "sakshi@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  /* ================= MAIN MENU ================= */

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },

    {
      title: "Accounts",
      url: "/accounts",
      icon: IconListDetails,
    },

    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },

    {
      title: "Budgets",
      url: "/budgets",
      icon: IconFolder,
    },

    {
      title: "Categories",
      url: "/categories",
      icon: IconUsers,
    },

    {
      title: "Reports",
      url: "/reports",
      icon: IconReport,
    },
  ],

  /* ================= DOCUMENTS ================= */

  documents: [
    {
      name: "Labels",
      url: "/labels",
      icon: IconDatabase,
    },

    {
      name: "Records",
      url: "/records",
      icon: IconReport,
    },
  ],

  /* ================= FOOTER MENU ================= */

  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },

    {
      title: "Help",
      url: "/help",
      icon: IconHelp,
    },

    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
    },
  ],
};

/* ================= SIDEBAR ================= */

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="border-r border-gray-200"
    >

      {/* ================= HEADER ================= */}

      <SidebarHeader className="border-b border-gray-100">

        <SidebarMenu>

          <SidebarMenuItem>

            <SidebarMenuButton
              asChild
              className="h-14"
            >

              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-2"
              >

                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">

                  <IconInnerShadowTop className="size-5" />

                </div>

                <div className="flex flex-col">

                  <span className="text-sm font-bold text-gray-800">
                    Expense Tracker
                  </span>

                  <span className="text-xs text-gray-400">
                    Banking System
                  </span>

                </div>

              </Link>

            </SidebarMenuButton>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarHeader>

      {/* ================= CONTENT ================= */}

      <SidebarContent className="px-2 py-4">

        <NavMain items={data.navMain} />

        <div className="mt-5">

          <NavDocuments
            items={data.documents}
          />

        </div>

        <div className="mt-auto pt-5">

          <NavSecondary
            items={data.navSecondary}
          />

        </div>

      </SidebarContent>

      {/* ================= FOOTER ================= */}

      <SidebarFooter className="border-t border-gray-100">

        <NavUser user={data.user} />

      </SidebarFooter>

    </Sidebar>
  );
}