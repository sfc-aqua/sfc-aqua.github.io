"use client";
import * as React from "react";
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
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";
import { cn } from "./utils";

type TLink = {
  href: string;
  label: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
};

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
        label: "Book",
        href: "/publications#books",
      },
      {
        label: "Google Scholar",
        href: "/publications#google-scholar",
      },
      {
        label: "Journal Papers",
        href: "/publications#journal-papers",
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
];

export default function Navigator() {
  const [open, setOpen] = React.useState(false);

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
            className="border-0 bg-base-300">
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
      <div className="navbar-end">
        <a className="btn rounded-md">EN/JP</a>
      </div>
    </div>
  );
}

const DialogNavigationMenu = ({
  link,
  parentOpen,
  setParentOpen,
}: {
  link: TLink;
  parentOpen?: boolean;
  setParentOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {link.label}
        </NavigationMenuLink>
      </DialogTrigger>
      <DialogContent className="bg-base-100 w-[90%] max-h-[90vh] overflow-y-scroll">
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
                  setOpen(false);
                  if (setParentOpen) {
                    setParentOpen(false);
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
  );
};
