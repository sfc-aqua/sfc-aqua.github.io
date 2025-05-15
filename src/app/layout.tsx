import "./globals.css"
import { Inter } from "next/font/google"

import { cn } from "@/components/utils"
import { Providers } from "./Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AQUA",
  description:
    "AQUA: the Advancing Quantum Architecture research group at Keio University's Shonan Fujisawa Campus",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        />
      </head>
      <body
        className={cn(
          inter.className,
          'min-h-screen'
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
