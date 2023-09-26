export type TMember = {
  name: string
  login: string
  role: string
  imagePath: string
  description: string
  links: {
    name: string
    url: string
  }[]
  stat?: {
    name: string
    value: number
    max: number
  }[]
}

const template: TMember = {
  name: "",
  login: "",
  role: "",
  imagePath: "",
  description: "",
  links: [
    {
      name: "",
      url: "",
    },
  ],
  stat: [
    {
      name: "",
      value: 0,
      max: 0,
    },
  ],
}

export const members: TMember[] = [
  {
    name: "Rod Van Meter",
    login: "rdv",
    role: "Chief AQUAnaut",
    imagePath:
      "/images/members/rdv-kawaguchiko-2204-recropped-small-avatar.jpg",
    description: "Doing quantum since 2003",
    links: [
      { name: "Mastodon", url: "https://famichiki.jp/@rdviii" },
      { name: "Facebook", url: "https://www.facebook.com/rdviii" },
      { name: "Github", url: "https://github.com/rdviii" },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=-YlArkcAAAAJ&hl=en",
      },
    ],
    stat: [
      { name: "Strength", value: 20, max: 100 },
      { name: "Agility", value: 30, max: 100 },
      { name: "Intelligence", value: 93, max: 100 },
      { name: "Luck", value: 10, max: 100 },
    ],
  },
  {
    name: "Poramet",
    role: "D1",
    login: "poramet",
    imagePath: "/images/members/poramet.jpg",
    description: "I'm a student at Keio University",
    links: [
      { name: "Facebook", url: "" },
      { name: "Github", url: "" },
    ],
    stat: [
      { name: "Strength", value: 20, max: 100 },
      { name: "Agility", value: 30, max: 100 },
      { name: "Intelligence", value: 50, max: 100 },
      { name: "Luck", value: 10, max: 100 },
    ],
  },
]
