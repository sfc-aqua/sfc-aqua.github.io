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
      {
        name: "IETF Datatracker",
        url: "https://datatracker.ietf.org/person/rdv@sfc.wide.ad.jp",
      },
      { name: "blog", url: "https://rdvlivefromtokyo.blogspot.com/" },
      { name: "campus web page", url: "https://web.sfc.keio.ac.jp/~rdv/" },
      { name: "YouTube", url: "https://www.youtube.com/@rodvanmeter517" },
    ],
    stat: [
      { name: "Strength", value: 20, max: 100 },
      { name: "Agility", value: 30, max: 100 },
      { name: "Intelligence", value: 93, max: 100 },
      { name: "Luck", value: 10, max: 100 },
    ],
  },
  {
    name: "Michal Hajdušek",
    role: "Project Associate Professor",
    login: "michal",
    imagePath: "/images/members/michal.png",
    description: "Engineering is hard!",
    links: [
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=8DgauUcAAAAJ&hl=en&oi=ao",
      },
    ],
    stat: [
      { name: "Strength", value: 32, max: 100 },
      { name: "Agility", value: 68, max: 100 },
      { name: "Intelligence", value: 91, max: 100 },
      { name: "Luck", value: 20, max: 100 },
    ],
  },
  {
    name: "Bernard Ousmane Sane",
    role: "Project Assistant Professor",
    login: "bernard",
    imagePath: "/images/members/bernard.jpg",
    description: "Distributed Quantum Error Correction ",
    links: [
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=YMJbS5wAAAAJ&hl=en",
      },
    ],
    stat: [
      { name: "Strength", value: 32, max: 100 },
      { name: "Agility", value: 68, max: 100 },
      { name: "Intelligence", value: 91, max: 100 },
      { name: "Luck", value: 20, max: 100 },
    ],
  },
  {
    name: "Amin Taherkhani",
    login: "amin",
    role: "Research Assistant",
    imagePath: "/images/members/amin.jpg",
    description: "(|Classical\u27E9+|Quantum\u27E9)/\u221A2 Networking",
    links: [
      {
        name: "Scholar",
        url: "https://scholar.google.com/citations?user=z8rkbsIAAAAJ&hl=en",
      },
      {
        name: "Github",
        url: "https://github.com/hhatpsi",
      },
    ],
    stat: [
      { name: "Strength", value: 12, max: 100 },
      { name: "Agility", value: 4, max: 100 },
      { name: "Intelligence", value: 4, max: 100 },
      { name: "Luck", value: 60, max: 100 },
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
  {
    name: "Sara A. Metwalli",
    role: "D4",
    login: "sara",
    imagePath: "/images/members/sara.JPG",
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
  {
    name: "Naphan Benchasattabuse",
    role: "D3+",
    login: "whit3z",
    imagePath: "/images/members/whit3z.png",
    description: "I don't know what I'm doing.",
    links: [
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=FRsTsksAAAAJ",
      },
      { name: "Github", url: "https://github.com/Naphann" },
    ],
    stat: [
      { name: "Strength", value: 77, max: 100 },
      { name: "Agility", value: 88, max: 100 },
      { name: "Intelligence", value: 50, max: 100 },
      { name: "Luck", value: 122, max: 100 },
    ],
  },
  {
    name: "Makoto Nakai",
    role: "M2",
    login: "dave",
    imagePath: "/images/members/dave.png",
    description: "I'm a student at Keio University",
    links: [{ name: "Github", url: "https://github.com/makotonakai" }],
    stat: [
      { name: "Strength", value: 20, max: 100 },
      { name: "Agility", value: 30, max: 100 },
      { name: "Intelligence", value: 50, max: 100 },
      { name: "Luck", value: 10, max: 100 },
    ],
  },
  {
    name: "Yinjie Zhou",
    role: "M2",
    login: "syu",
    imagePath: "/images/members/syu.png",
    description: "I'm a student at Keio University",
    links: [{ name: "Github", url: "" }],
    stat: [
      { name: "Strength", value: 5, max: 100 },
      { name: "Agility", value: 15, max: 100 },
      { name: "Intelligence", value: 10, max: 100 },
      { name: "Luck", value: 100, max: 100 },
    ],
  },
  {
    name: "Kento Samuel Soon",
    role: "B2",
    login: "soon",
    imagePath: "/images/members/soon.png",
    description: "Quantum information seems interesting",
    links: [{ name: "Github", url: "https://github.com/res6idue" }],
    stat: [
      { name: "Strength", value: 23, max: 100 },
      { name: "Agility", value: 43, max: 100 },
      { name: "Intelligence", value: 68, max: 100 },
      { name: "Luck", value: 99, max: 100 },
    ],
  },
  {
    name: "Kiichi Hojo",
    role: "B1",
    login: "kiichi",
    imagePath: "/images/members/Kiichi.png",
    description: "Let's give it a try",
    links: [{ name: "Github", url: "https://github.com/kiichi123" }],
    stat: [
      { name: "Strength", value: 90, max: 100 },
      { name: "Agility", value: 40, max: 100 },
      { name: "Intelligence", value: 70, max: 100 },
      { name: "Luck", value: 50, max: 100 },
    ],
  },
  {
    name: "Wataru Morishita",
    role: "B3",
    login: "morishita",
    imagePath: "/images/members/morishita.png",
    description: "The mastermind behind this kenkyukai",
    links: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/profile.php?id=100028828711584",
      },
      { name: "BLOG", url: "https://scienceboy.jp/" },
      { name: "Portfolio", url: "https://morishitawataru.com/" },
      { name: "Github", url: "https://github.com/Durey-creater" },
    ],
    stat: [
      { name: "Strength", value: 100, max: 100 },
      { name: "Agility", value: 100, max: 100 },
      { name: "Intelligence", value: 2, max: 100 },
      { name: "Luck", value: 100, max: 100 },
    ],
  },
  {
    name: "Monet Tokuyama",
    role: "B3",
    login: "bob",
    imagePath: "/images/members/bob.jpg",
    description: "I like sushi",
    links: [
      { name: "Github", url: "https://github.com/funkeyteth" },
      { name: "Instagram", url: "https://www.instagram.com/funkeyteth/" },
    ],
    stat: [
      { name: "Strength", value: 40, max: 100 },
      { name: "Agility", value: 100, max: 100 },
      { name: "Intelligence", value: 10, max: 100 },
      { name: "Luck", value: 50, max: 100 },
    ],
  },
  {
    name: "Marii Koyama",
    login: "mia",
    role: "B2",
    imagePath: "/images/members/mia.jpg",
    description: "I'm a student at Keio University",
    links: [
      {
        name: "Github",
        url: "https://github.com/Marie2222",
      },
    ],
    stat: [
      { name: "Strength", value: 60, max: 100 },
      { name: "Agility", value: 70, max: 100 },
      { name: "Intelligence", value: 30, max: 100 },
      { name: "Luck", value: 98, max: 100 },
    ],
  },
  {
    name: "Hikaru Yokomori",
    login: "voy",
    role: "B4",
    imagePath: "/images/members/voy.jpg",
    description: "Adventuring Science",
    links: [
      {
        name: "Github",
        url: "https://github.com/Hikaru7-7",
      },
    ],
    stat: [
      { name: "Strength", value: 30, max: 100 },
      { name: "Agility", value: 30, max: 100 },
      { name: "Intelligence", value: 30, max: 100 },
      { name: "Luck", value: 99, max: 100 },
    ],
  },
]
