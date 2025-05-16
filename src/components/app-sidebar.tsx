import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"

import { Links } from "./navigator"
import Link from "next/link"

export function AppSidebar() {
  const { resolvedTheme, setTheme, systemTheme } = useTheme()
  return (
    <Sidebar className="sm:hidden">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">
            <Link href='/' legacyBehavior>
              🌊 AQUA
            </Link>
            <Toggle
              onPressedChange={(pressed) => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }}
            >
              {resolvedTheme === "dark" ? <>☀️</> : <>⭐</>}
            </Toggle>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Links.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.children && (
                    <SidebarMenuSub>
                      {item.children.map((subitem) => (
                        <SidebarMenuSubItem key={subitem.label}>
                          <SidebarMenuSubButton asChild>
                            <a href={subitem.href}>
                              <span>{subitem.label}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
