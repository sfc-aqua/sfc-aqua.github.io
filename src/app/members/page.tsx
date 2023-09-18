"use client";

import { useState } from "react";
import { members } from "./members-data";
import MemberCard from "./member-card";
import { cn } from "@/components/utils";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* top section with image */}
      <div
        className="flex flex-col items-center justify-center w-full h-[50vh] bg-cover bg-center bg-gradient-to-b to-primary/25 from-primary-100"
        style={{
          backgroundImage: `url(/images/members/aqua-group-221117.jpg)`,
        }}
      ></div>

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

        <div className={cn("flex flex-wrap items-center justify-center mt-10 gap-4 ")}>
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
  );
}


