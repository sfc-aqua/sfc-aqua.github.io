"use client"
import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import Link from "next/link"
import { cn } from "./utils"
import { useTheme } from "next-themes"

type TLink = {
  href: string
  label: string
  children?: {
    label: string
    href: string
    description?: string
  }[]
}

const Links: TLink[] = [
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

export default function Navigator() {
  const [open, setOpen] = React.useState(false)
  const { resolvedTheme, setTheme, systemTheme } = useTheme()

  return (
    <div className="sticky top-0 z-50 navbar bg-base-300">
      <div className="navbar-start">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="btn-ghost lg:hidden"
            aria-label="toggle naviagtor menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </SheetTrigger>
          <SheetContent
            size="lg"
            position={"left"}
            className="border-0 bg-base-300"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Side Navigator</SheetTitle>
              <NavigationMenu className="navbar-center" orientation="vertical">
                <NavigationMenuList className="flex flex-col px-1">
                  {Links.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      {link.children ? (
                        <DialogNavigationMenu
                          link={link}
                          parentOpen={open}
                          setParentOpen={setOpen}
                        />
                      ) : (
                        <Link href={link.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Link href="/" className="text-xl normal-case btn btn-ghost">
          AQUA
        </Link>
      </div>
      <NavigationMenu
        className="hidden navbar-center lg:flex"
        orientation="horizontal"
      >
        <NavigationMenuList className="px-1">
          {Links.map((link, index) => (
            <NavigationMenuItem key={index} onClick={() => setOpen(false)}>
              {link.children ? (
                <DialogNavigationMenu link={link} />
              ) : (
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="navbar-end flex flex-row gap-2">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={() => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }}
          />
          {/* sun icon */}
          <svg
            className="swap-on fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* moon icon */}
          <svg
            className="swap-off fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <a className="btn rounded-md">EN/JP</a>
      </div>
    </div>
  )
}

const DialogNavigationMenu = ({
  link,
  parentOpen,
  setParentOpen,
}: {
  link: TLink
  parentOpen?: boolean
  setParentOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {link.label}
        </NavigationMenuLink>
      </DialogTrigger>
      <DialogContent className="bg-base-100 w-[90%] max-h-[90vh] overflow-y-scroll border-0 rounded-lg">
        <DialogHeader>
          <DialogTitle>{link.label} Menu</DialogTitle>
        </DialogHeader>
        <ul>
          {link.children?.map((child, index) => (
            <li key={index} className="break-normal">
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-base-content "
                )}
                onClick={() => {
                  setOpen(false)
                  if (setParentOpen) {
                    setParentOpen(false)
                  }
                }}
              >
                <Link href={child.href} passHref>
                  {child.label}
                </Link>
              </NavigationMenuLink>
              <DialogDescription>{child.description}</DialogDescription>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
