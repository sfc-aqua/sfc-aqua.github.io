export type StudentActivityLink = {
  label: string
  url: string
}

export type StudentActivityPhoto = {
  src: string
  alt: string
}

export type StudentActivity = {
  date: string
  title: string
  description: string
  students: string[]
  links: StudentActivityLink[]
  photo?: StudentActivityPhoto
}

export const studentActivities: StudentActivity[] = [
  {
    date: "2026-09-16",
    title: "Paper presentation at IEEE Quantum Week 2026",
    description:
      "Gave a talk in QCE 2026 about a distributed switching algorithm paper that was co-authored with Aman and Martian.",
    students: ["tomshen"],
    links: [{ label: "Paper", url: "https://arxiv.org/pdf/2605.07295" }],
    photo: {
      src: "/images/student-activities/QCE26/tomshen_QCE26_presentation.jpg",
      alt: "Paper presentation by tomshen at IEEE Quantum Week 2026",
    },
  },
  {
    date: "2026-09-14",
    title: "Poster presentation at IEEE Quantum Week 2026",
    description: "",
    students: ["sakumacho"],
    links: [
      {
        label: "Poster Abstract",
        url: "/images/student-activities/QCE26/sakuma_QCE26_abstract.pdf",
      },
      {
        label: "Poster PDF",
        url: "/images/student-activities/QCE26/sakuma_QCE26_poster.pdf",
      },
    ],
  },
  {
    date: "2026-09-14",
    title: "Poster presentation at IEEE Quantum Week 2026",
    description:
      "Presented a poster about switch architecture for quantum interconnects at IEEE Quantum Week 2026 in Toronto, Canada.",
    students: ["mia"],
    links: [
      {
        label: "Poster Abstract",
        url: "/images/student-activities/QCE26/mia_QCE26_abstract.pdf",
      },
      {
        label: "Poster PDF",
        url: "/images/student-activities/QCE26/mia_QCE26_poster.pdf",
      },
    ],
    photo: {
      src: "/images/student-activities/QCE26/mia_QCE26_poster.jpg",
      alt: "Poster presentation at IEEE Quantum Week 2026",
    },
  },
  {
    date: "2026-07-06",
    title: "Paper accepted at IEEE Quantum Week 2026🎉",
    description:
      "A paper about a distributed switching algorithm written by Aman, Tomshen, Martian, Amin, Rodney and Shota was accepted at IEEE Quantum Week 2026.",
    students: ["aman", "tomshen", "martian"],
    links: [{ label: "Paper", url: "https://arxiv.org/pdf/2605.07295" }],
  },
]
