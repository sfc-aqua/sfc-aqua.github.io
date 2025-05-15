"use client"

import { ThemeProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Navigator from "@/components/navigator"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <main className="flex flex-col items-center w-full min-h-screen">
          <Navigator />
          <SidebarTrigger className="sm:hidden p-1 fixed top-2 left-2 bg-accent/50 z-10" />
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}
