"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import Link from "next/link"

const Links = [
    {
        href: '/about',
        label: 'About'
    },
    {
        href: '/research',
        label: 'Research'
    },
    {
        href: '/publications',
        label: 'Publications'
    },
    {
        href: '/members',
        label: 'Members'
    },
    {
        href: '/for-students',
        label: 'For students'
    },
    {
        href: '/links',
        label: 'Links'
    },
    {
        href: '/access',
        label: 'Access'
    },
]

export default function Navigator() {
    return (

        <div className="sticky top-0 z-50 navbar bg-base-300">
            <div className="navbar-start">
                <Sheet>
                    <SheetTrigger className="btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </SheetTrigger>
                    <SheetContent
                        position={'left'}
                        className="border-0 bg-base-300"
                    >  
                        <SheetHeader>
                            <SheetTitle className="sr-only">Side Navigator</SheetTitle>
                            <NavigationMenu className="navbar-center" orientation='vertical'>
                                <NavigationMenuList className="flex flex-col px-1" >
                                    {Links.map((link, index) => (
                                        <NavigationMenuItem
                                            key={index}
                                        >
                                            <Link href={link.href} legacyBehavior passHref>
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    {link.label}
                                                </NavigationMenuLink>
                                            </Link>
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
            <NavigationMenu className="hidden navbar-center lg:flex" orientation='horizontal'>
                <NavigationMenuList className="px-1" >
                    {Links.map((link, index) => (
                        <NavigationMenuItem
                            key={index}
                        >
                            <Link href={link.href} legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    {link.label}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="navbar-end">
                <a className="btn">EN/JP</a>
            </div>
        </div>
    )
}

