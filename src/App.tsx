import { Outlet } from "react-router-dom";

import { AppSidebar } from "./components/app-sidebar";

import {
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function App() {
  return (
    <SidebarProvider>

      <div className="flex h-screen w-full overflow-hidden">

        {/* SIDEBAR */}
        <AppSidebar />

        {/* PAGE */}
        <div className="flex-1 overflow-auto bg-gray-50">

          <Outlet />

        </div>

      </div>

    </SidebarProvider>
  );
}