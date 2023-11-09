"use client"

import { useState, useEffect, useRef } from "react"
import { members } from "./members-data"
import MemberCard from "./member-card"
import { cn } from "@/components/utils"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const scrollAmount = (container.scrollWidth - container.clientWidth) / 2
      container.scrollLeft = scrollAmount
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* top section with image */}
      <div
        ref={containerRef}
        className="overscroll-auto overflow-x-scroll w-full h-[50vh] l:h-[55vh] xl:h-[60vh] bg-gradient-to-b to-primary/25 from-primary-100"
      >
        <img
          src="/images/members/aqua-group-221117.jpg"
          alt="Picture of AQUA Members"
          className="min-w-[1000px] min-h-[361px]"
        />
      </div>
      <div className="flex flex-col items-center justify-center mx-10 py-10">
        <div className="text-4xl font-bold">Members</div>
        <div className="text-base-content">The people in our group</div>

        {/* Filter */}
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex items-center justify-center">
            <input
              className="input input-primary input-bordered text-center rounded-md"
              type="text"
              placeholder="Search or filter members"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div
          className={cn(
            "grid grid-rows-4 grid-flow-col items-center justify-center mt-10 gap-4 "
          )}
        >
          {members
            .filter(
              (member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
        </div>
      </div>
    </div>
  )
}
