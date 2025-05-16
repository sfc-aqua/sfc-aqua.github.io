"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"

export const Links: {
  href: string
  label: string
  children?: {
    label: string
    href: string
    description?: string
  }[]
}[] = [
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/research",
    label: "Research",
  },
  {
    href: "/publications",
    label: "Publications",
    children: [
      {
        label: "Books",
        href: "/publications#books",
      },
      {
        label: "Journal Papers",
        href: "/publications#journal-papers",
      },
      {
        label: "RFCs (Internet Requests for Comments)",
        href: "/publications#rfcs",
      },
      {
        label: "International Conferences with Proceedings",
        href: "/publications#international-conferences-with-proceedings",
      },
      {
        label: "Workshops, Conferences Without Proceedings and Posters",
        href: "/publications#workshops-conferences-without-proceedings-and-posters",
      },
      {
        label: "Theses",
        href: "/publications#theses",
      },
      {
        label: "Committee and Working Group Reports",
        href: "/publications#committee-and-working-group-reports",
      },
      {
        label: "Submitted/in progress papers",
        href: "/publications#submitted-in-progress-papers",
      },
      {
        label: "Internet Drafts",
        href: "/publications#internet-drafts",
      },
      {
        label: "Public Presentations/Invited Talks",
        href: "/publications#public-presentations-invited-talks",
      },
      {
        label: "SFC's Open Research Forum",
        href: "/publications#sfcs-open-research-forum",
      },
      {
        label: "posters",
        href: "/publications#posters",
      },
      {
        label: "White Papers",
        href: "/publications#white-papers",
      },
      {
        label: "Course Materials",
        href: "/publications#course-materials",
      },
      {
        label: "Other Publications",
        href: "/publications#other-publications",
      },
    ],
  },
  {
    href: "/members",
    label: "Members",
  },
  {
    href: "/for-students",
    label: "For students",
  },
  {
    href: "/useful-links",
    label: "Links",
  },
  {
    href: "/access",
    label: "Access",
  },
]

export default function Navigation() {
  const { resolvedTheme, setTheme, systemTheme } = useTheme()

  return (
    <NavigationMenu
      className="py-2 sticky top-0 px-4 bg-background hidden sm:block z-10 rounded-b-xl"
      viewport={false}
    >
      <NavigationMenuList className="flex w-[95vw]">
        <NavigationMenuItem key="home" className="self-start">
          <NavigationMenuLink
            href="/"
            className={cn(
              navigationMenuTriggerStyle(),
              "bg-transparent hover:bg-accent/50"
            )}
          >
            🌊 AQUA
          </NavigationMenuLink>
        </NavigationMenuItem>
        {Links.map((component) => {
          return component.children ? (
            <NavigationMenuItem key={component.label}>
              <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                {component.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] z-20">
                  {component.children.map((subComponent) => (
                    <ListItem
                      key={subComponent.label}
                      title={subComponent.label}
                      href={subComponent.href}
                    >
                      {subComponent.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={component.label}>
              <NavigationMenuLink
                href={component.href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-accent/50"
                )}
              >
                {component.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
        <NavigationMenuItem key="theme">
          <Toggle
            onPressedChange={(pressed) => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }}
          >
            {resolvedTheme === "dark" ? <>☀️</> : <>⭐</>}
          </Toggle>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// import React, { useState } from "react"
// import Link from "next/link"
// import { useTheme } from "next-themes"
// ...import your NavigationMenu, NavigationMenuItem, etc.
