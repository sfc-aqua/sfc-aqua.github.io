"use client"

import Books from "./books.mdx"
import JournalPapers from "./journal-papers.mdx"
import RFCs from "./rfcs.mdx"
import InternationalConferencesWithProceedings from "./international-conferences-with-proceedings.mdx"
import WorkshopsConferencesWithoutProceedingsAndPosters from "./workshops-conferences-without-proceedings-and-posters.mdx"
import Theses from "./theses.mdx"
import CommitteeAndWorkingGroupReports from "./committee-and-working-group-reports.mdx"
import SubmittedInProgressPapers from "./submitted-in-progress-papers.mdx"
import InternetDrafts from "./internet-drafts.mdx"
import PublicPresentationsInvitedTalks from "./public-presentations-invited-talks.mdx"
import SfcsOpenResearchForum from "./sfcs-open-research-forum.mdx"
import Posters from "./posters.mdx"
import WhitePapers from "./white-papers.mdx"
import CourseMaterials from "./course-materials.mdx"
import OtherPublications from "./other-publications.mdx"
import { useState } from "react"
import { ListCollapseIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const publications = [
  {
    label: "Books",
    id: "books",
    href: "/publications#books",
    content: <Books />,
  },
  {
    label: "Journal Papers",
    id: "journal-papers",
    href: "/publications#journal-papers",
    content: <JournalPapers />,
  },
  {
    label: "RFCs (Internet Requests for Comments)",
    id: "rfcs",
    href: "/publications#rfcs",
    content: <RFCs />,
  },
  {
    label: "International Conferences with Proceedings",
    id: "international-conferences-with-proceedings",
    href: "/publications#international-conferences-with-proceedings",
    content: <InternationalConferencesWithProceedings />,
  },
  {
    label: "Workshops, Conferences Without Proceedings and Posters",
    id: "workshops-conferences-without-proceedings-and-posters",
    href: "/publications#workshops-conferences-without-proceedings-and-posters",
    content: <WorkshopsConferencesWithoutProceedingsAndPosters />,
  },
  {
    label: "Theses",
    id: "theses",
    href: "/publications#theses",
    content: <Theses />,
  },
  {
    label: "Committee and Working Group Reports",
    id: "committee-and-working-group-reports",
    href: "/publications#committee-and-working-group-reports",
    content: <CommitteeAndWorkingGroupReports />,
  },
  {
    label: "Submitted/in progress papers",
    id: "submitted-in-progress-papers",
    href: "/publications#submitted-in-progress-papers",
    content: <SubmittedInProgressPapers />,
  },
  {
    label: "Internet Drafts",
    id: "internet-drafts",
    href: "/publications#internet-drafts",
    content: <InternetDrafts />,
  },
  {
    label: "Public Presentations/Invited Talks",
    id: "public-presentations-invited-talks",
    href: "/publications#public-presentations-invited-talks",
    content: <PublicPresentationsInvitedTalks />,
  },
  {
    label: "SFC's Open Research Forum",
    id: "sfcs-open-research-forum",
    href: "/publications#sfcs-open-research-forum",
    content: <SfcsOpenResearchForum />,
  },
  {
    label: "posters",
    id: "posters",
    href: "/publications#posters",
    content: <Posters />,
  },
  {
    label: "White Papers",
    id: "white-papers",
    href: "/publications#white-papers",
    content: <WhitePapers />,
  },
  {
    label: "Course Materials",
    id: "course-materials",
    href: "/publications#course-materials",
    content: <CourseMaterials />,
  },
  {
    label: "Other Publications",
    id: "other-publications",
    href: "/publications#other-publications",
    content: <OtherPublications />,
  },
]

export default function Page() {
  const [values, setValues] = useState<string[]>([])
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 relative">
      <Button
        className="self-end sticky top-20 z-10"
        onClick={() => {
          if (values.length === publications.length) {
            setValues([])
          } else {
            setValues(publications.map((publication) => publication.id))
          }
        }}
      >
        <ListCollapseIcon />
      </Button>
      <div className="prose dark:prose-invert">
        <Accordion
          type="multiple"
          value={values}
          onValueChange={setValues}
          className="w-full"
        >
          {publications.map((publication) => (
            <AccordionItem
              value={publication.id}
              id={publication.id}
              key={publication.id}
              className="scroll-mt-16"
            >
              <AccordionTrigger>
                <p className="">{publication.label}</p>
              </AccordionTrigger>
              <AccordionContent className="pl-8">
                {publication.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
