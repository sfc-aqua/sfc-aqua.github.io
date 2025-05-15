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

  const handleOnCurrentMembersClick = () => {
    // Filter member.role includes "Current" by add to searchQuery
    setSearchQuery("Current")
  }

  const handleOnAlumniClick = () => {
    // Filter member.role includes "Alumni" by add to searchQuery
    setSearchQuery("Alumni")
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* top section with image */}
      <div
        ref={containerRef}
        className="overscroll-auto overflow-x-auto w-full h-[40vh] md:h-[55vh] xl:h-[60vh] bg-linear-to-b to-primary/25 from-primary-100 max-w-[1800px]"
      >
        <img
          src="/images/members/aqua-fall-241114-cropped.jpg"
          alt="Picture of AQUA Members"
          // className="min-w-[1000px] min-h-[579px]"
          className="w-full h-full object-cover object-[50%_10%]"
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

        <div className="flex gap-2 mt-10">
          <button className="btn" onClick={handleOnCurrentMembersClick}>
            Current Members
          </button>
          <button className="btn" onClick={handleOnAlumniClick}>
            Alumni
          </button>
        </div>

        <div
          className={cn(
            "columns-1 sm:columns-2 md:columns-3 lg:columns-4 overflow-x-auto mt-10"
          )}
        >
          {members
            .filter(
              (member) =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role
                  .join(", ")
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
        </div>
      </div>
    </div>
  )
}
