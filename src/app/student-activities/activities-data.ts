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
  photoStatus?: "pending" | "unavailable"
}

export const studentActivities: StudentActivity[] = [
  {
    date: "2026-09-16",
    title: "Paper presentation at IEEE Quantum Week 2026",
    description:
      "Tomshen gave a talk in QCE 2026 about a distributed switching algorithm paper that was co-authored with Aman and Martian.",
    students: ["tomshen"],
    links: [{ label: "Paper", url: "https://arxiv.org/pdf/2605.07295" }],
    photo: {
      src: "/images/student-activities/QCE26/tomshen_QCE26_presentation_v2.jpg",
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
    photoStatus: "pending",
  },
  {
    date: "2026-09-14",
    title: "Poster presentation at IEEE Quantum Week 2026",
    description:
      "mia presented a poster about switch architecture for quantum interconnects at IEEE Quantum Week 2026 in Toronto, Canada.",
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
    photoStatus: "pending",
  },
  {
    date: "2026-03-23",
    title: "AQUA Member Named Valedictorian for Spring 2026",
    description:
      "Soon was selected as valedictorian of the graduating class in recognition of their outstanding academic achievement. Congratulations on this exceptional accomplishment!!",
    students: ["soon"],
    links: [],
    photoStatus: "unavailable",
  },
  {
    date: "2026-09-22",
    title: "AQUA Member Named Valedictorian for Fall 2026",
    description:
      "Tomshen was selected as valedictorian of the graduating class in recognition of their outstanding academic achievement. Congratulations on this exceptional accomplishment!!",
    students: ["tomshen"],
    links: [],
    photoStatus: "unavailable",
  },
  {
    date: "2026-09-17",
    title: "Paper presentation at IEEE Quantum Week 2026",
    description:
      "Sam presented a paper about 'Performance Analysis of QAOA Across Distributed Quantum Network Topologies Using SwitchQNet' at IEEE Quantum Week 2026 in Toronto, Canada. The paper shows that Quantum Approximate Optimization Algorithm (QAOA) obtains modest but consistent latency reductions, highlighting its value as a diagnostic benchmark for studying the interaction between algorithm structure, entanglement management, and quantum-network architecture.",
    students: ["sam"],
    links: [],
    photo: {
      src: "/images/student-activities/QCE26/sam_QCE26_presentation.jpg",
      alt: "Paper presentation at IEEE Quantum Week 2026",
    },
  },
]
