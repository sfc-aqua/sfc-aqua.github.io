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
        className="overscroll-auto overflow-x-auto w-full h-[40vh] md:h-[55vh] xl:h-[60vh] bg-gradient-to-b to-primary/25 from-primary-100 max-w-[1800px]"
      >
        <img
          src="/images/members/aqua-group-2025.jpg"
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
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto mt-10"
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
            .sort((firstMember, secondMember) => {
              const getSortOrder = (member: (typeof members)[number]) => {
                if (member.name === "Rod Van Meter") return 0

                const roles = member.role.join(" ")
                if (/Professor|Director|助教/.test(roles)) return 1
                if (/^D\d/.test(roles)) return 2
                if (/^M2/.test(roles)) return 3
                if (/^M1/.test(roles)) return 4
                if (/^B\d/.test(roles)) return 5
                if (roles.includes("Alumni") && /\b20\d{2}\b/.test(roles)) {
                  return 6
                }
                if (roles.includes("Alumni")) return 7
                return 8
              }

              const firstSortOrder = getSortOrder(firstMember)
              const secondSortOrder = getSortOrder(secondMember)

              if (firstSortOrder !== secondSortOrder) {
                return firstSortOrder - secondSortOrder
              }

              if (firstSortOrder === 6) {
                const firstYear = firstMember.role.join(" ").match(/20[0-9]{2}/)
                const secondYear = secondMember.role
                  .join(" ")
                  .match(/20[0-9]{2}/)

                return Number(secondYear?.[0]) - Number(firstYear?.[0])
              }

              return 0
            })
            .map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
        </div>
      </div>
    </div>
  )
}
