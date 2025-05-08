export type TMember = {
  name: string
  login: string
  role: string[]
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
  role: [""],
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
    role: ["Chief AQUAnaut", "Current"],
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
      { name: "Astrobin", url: "https://www.astrobin.com/users/rdviii/" },
    ],
    stat: [
      { name: "Strength", value: 20, max: 100 },
      { name: "Agility", value: 30, max: 100 },
      { name: "Intelligence", value: 93, max: 100 },
      { name: "Luck", value: 100, max: 100 },
    ],
  },
  {
    name: "Michal Hajdušek",
    role: ["Project Associate Professor", "Current"],
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
    name: "Shota Nagayama",
    login: "shota",
    role: ["QITF Director", "Current"],
    description:
      "Love & Peace & Comprehensive effort to realize Quantum Computer Networks.",
    imagePath: "/images/members/shota-nagayama1.jpg",
    links: [
      { name: "quantum internet task force", url: "https://qitf.org/" },
      {
        name: "JST Moonshot Goal 6 Project Manager",
        url: "https://www.jst.go.jp/moonshot/program/goal6/6C_nagayama.html",
      },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=NyfLP0IAAAAJ&hl=en",
      },
      {
        name: "IETF Datatracker",
        url: "https://datatracker.ietf.org/person/shota@wide.ad.jp",
      },
      {
        name: "Mercari R4D Senior Researcher",
        url: "https://r4d.mercari.com/",
      },
    ],
    stat: [
      { name: "Strength", value: 70, max: 100 },
      { name: "Mail Response Agility", value: 50, max: 100 },
      { name: "Intelligence", value: 40, max: 100 },
      { name: "Luck", value: 100, max: 100 },
    ],
  },
  {
    name: "Bernard Ousmane Sane",
    role: ["Project Assistant Professor", "Current"],
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
    role: ["Project Assistant Professor", "Current"],
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
    name: "Shigeya Suzuki",
    login: "shigeya",
    role: ["Project Professor", "Current-Adjunct 50:50 Probability"],
    imagePath:
      "/images/members/shigeya-2020-0628-K20BP-007_0180_4x3-smaller.jpg",
    description: "I'm an architect",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/shigeya" },
      { name: "Github", url: "https://github.com/shigeya" },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=YUklUm0AAAAJ",
      },
      { name: "Personal web page", url: "http://member.wide.ad.jp/~shigeya/" },
    ],
    stat: [
      { name: "Strength", value: 5, max: 100 },
      { name: "Agility", value: 50, max: 100 },
      { name: "Intelligence", value: 42, max: 100 },
      { name: "Luck", value: 200, max: 100 },
    ],
  },
  {
    name: "Sara A. Metwalli",
    role: ["D4", "Current"],
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
    role: ["D3+", "Current"],
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
    name: "Poramet Pathumsoot",
    role: ["D2", "Current"],
    login: "poramet",
    imagePath: "/images/members/poramet.jpg",
    description: "To boldly go where no one has gone before",
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
    name: "Natchapol (Bank) Patamawisut",
    role: ["M2", "Current"],
    login: "banknatchapol",
    imagePath: "/images/members/banknatchapol.jpg",
    description: "Tomorrow has been exhausting.",
    links: [
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=2oKwxZ0AAAAJ",
      },
      {
        name: "Guthib",
        url: "https://github.com/BankNatchapol",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/natchapol-patamawisut/",
      },
    ],
    stat: [
      { name: "Strength", value: 200, max: 100 },
      { name: "Agility", value: 200, max: 100 },
      { name: "Intelligence", value: 200, max: 100 },
      { name: "Sleep", value: 10, max: 100 },
    ],
  },
  {
    name: "Samanvay Sharma",
    login: "sam",
    role: ["M2", "Current"],
    imagePath: "/images/members/sam.png",
    description: "Power and Responsibility",
    links: [
      { name: "Github", url: "https://github.com/starktech23" },
      { name: "Twitter", url: "https://twitter.com/AnsatzX" },
    ],
    stat: [
      { name: "Luck", value: 10, max: 100 },
      { name: "Skill", value: 10, max: 100 },
      { name: "Concentrated Power of Will", value: 70, max: 100 },
      { name: "Pleasure", value: 10, max: 100 },
      { name: "Pain", value: 50, max: 100 },
      { name: "Reason to Remember the Name", value: 100, max: 100 },
    ],
  },
  {
    name: "Makoto Nakai",
    role: ["M2", "Current"],
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
    role: ["M2", "Current"],
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
    name: "Austin Huang",
    login: "austinh",
    role: ["M2", "Current"],
    imagePath: "/images/members/austin.png",
    description: "I do quantum chemistry with quantum computers",
    links: [
      {
        name: "Github",
        url: "https://github.com/austingmhuang",
      },
    ],
    stat: [
      { name: "Strength", value: 15, max: 100 },
      { name: "Agility", value: 25, max: 100 },
      { name: "Intelligence", value: 45, max: 100 },
      { name: "Luck", value: 88, max: 100 },
    ],
  },
  {
    name: "Pawan Sharma Poudel",
    login: "pawan",
    role: ["M2", "Current"],
    imagePath: "images/members/pawan.png",
    description: "Reducing uncertainties",
    links: [
      {
        name: "Github",
        url: "https://github.com/lmpawan10",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/pawansharmapoudel/",
      },
    ],
    stat: [
      { name: "Strength", value: 50, max: 100 },
      { name: "Agility", value: 40, max: 100 },
      { name: "Intelligence", value: 40, max: 100 },
      { name: "Luck", value: 100, max: 100 },
    ],
  },
  {
    name: "Michael Peyron",
    login: "michael",
    role: ["M1", "Current"],
    imagePath: "/images/members/michael.jpg",
    description: "Its October and there is still a taste of summer in the air",
    links: [
      {
        name: "Github",
        url: "https://github.com/AliceMichael",
      },
    ],
    stat: [
      { name: "BTS Jimin is cool", value: 100, max: 100 },
      { name: "Capybara", value: 77, max: 100 },
      { name: "Stupidity", value: 100, max: 100 },
      { name: "Luck, I dont believe in luck", value: 100, max: 100 },
    ],
  },
  {
    name: "Hikaru Yokomori",
    login: "voy",
    role: ["B4", "Current"],
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
  {
    name: "YUMOTO Kento",
    login: "ken-tea",
    role: ["B4", "Current"],
    imagePath: "/images/members/kent_tea.png",
    description: "I wanna go to Peking and Shenzhen.",
    links: [
      {
        name: "Github",
        url: "https://github.com/KentTea",
      },
    ],
    stat: [
      { name: "Strength", value: 80, max: 100 },
      { name: "Agility", value: 30, max: 100 },
      { name: "Intelligence", value: 100, max: 100 },
      { name: "Luck", value: 100, max: 100 },
    ],
  },
  {
    name: "Hyensoo Choi",
    role: ["B3", "Current"],
    login: "collodi",
    imagePath: "/images/members/collodi.jpg",
    description:
      "… , that this fear of erring is really the error itself. (G.W.F. Hegel)",
    links: [
      { name: "Github", url: "https://github.com/sierpinskiii" },
      { name: "blog", url: "https://collodi.io/" },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=gvlU-vQAAAAJ",
      },
    ],
    stat: [
      { name: "Strength", value: 20, max: 100 },
      { name: "Agility", value: 70, max: 100 },
      { name: "Intelligence", value: 100, max: 100 },
      { name: "Luck", value: 99, max: 100 },
    ],
  },
  {
    name: "Wataru Morishita",
    role: ["B3", "Current"],
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
    role: ["B3", "Current"],
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
    name: "Kento Samuel Soon",
    role: ["B2", "Current"],
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
    name: "Marii Koyama",
    login: "mia",
    role: ["B2", "Current"],
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
    name: "Aman Y. Tekleab",
    login: "aman",
    role: ["B2", "Current"],
    imagePath: "/images/members/darkifywalltemp.jpg",
    description: "I'm me",
    links: [
      {
        name: "Github",
        url: "https://github.com/amanchapi",
      },
    ],
    stat: [
      { name: "Strength", value: 10, max: 100 },
      { name: "Agility", value: 10, max: 100 },
      { name: "Agility", value: 70, max: 100 },
      { name: "Intelligence", value: 10, max: 100 },
      { name: "Luck", value: 50, max: 100 },
    ],
  },
  {
    name: "Shreya Kafle",
    login: "riya",
    role: ["B2", "Current"],
    imagePath: "/images/members/riya.jpg",
    description: "I'm enjoying my life;)",
    links: [
      {
        name: "Github",
        url: "https://github.com/s08chan",
      },
      { name: "Instagram", url: "https://www.instagram.com/s08j127/" },
    ],
    stat: [
      { name: "Strength", value: 40, max: 100 },
      { name: "Agility", value: 50, max: 100 },
      { name: "Intelligence", value: 10, max: 100 },
      { name: "Luck", value: 80, max: 100 },
    ],
  },
  {
    name: "Junseo Kwak",
    role: ["B2", "Current"],
    login: "junseo",
    imagePath: "/images/members/junseo.jpg",
    description: "Student at Keio University",
    links: [{ name: "Github", url: "https://github.com/kwakie0511" }],
    stat: [
      { name: "Strength", value: 40, max: 100 },
      { name: "Agility", value: 40, max: 100 },
      { name: "Intelligence", value: 20, max: 100 },
      { name: "Luck", value: 80, max: 100 },
    ],
  },
  {
    name: "Tetsuma Ariyoshi",
    login: "mono",
    role: ["B1", "Current"],
    imagePath: "/images/members/mono.png",
    description: "I'm a student at Keio University",
    links: [
      {
        name: "Github",
        url: "https://github.com/Mononon-120",
      },
    ],
    stat: [
      { name: "Strength", value: 10, max: 100 },
      { name: "Agility", value: 70, max: 100 },
      { name: "Intelligence", value: 10, max: 100 },
      { name: "Luck", value: 50, max: 100 },
    ],
  },
  {
    name: "Mikawa-Mallery Takumi",
    role: ["B1", "Current"],
    login: "tsukue",
    imagePath: "/images/members/tsukue.png",
    description: "Clueless",
    links: [
      {
        name: "Github",
        url: "https://github.com/TsukueRyu",
      },
    ],
    stat: [
      { name: "Strength", value: 0, max: 100 },
      { name: "Agility", value: 0, max: 100 },
      { name: "Intelligence", value: 0, max: 100 },
      { name: "Luck", value: 0, max: 100 },
    ],
  },
  {
    name: "Haruka Sakate",
    login: "l0gic",
    role: ["B1", "Current"],
    imagePath: "/images/members/logic.jpg",
    description: "I'm a student at Keio University",
    links: [
      {
        name: "Github",
        url: "https://github.com/HarukaSakate",
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
    name: "Yifeng (Tom) Shen",
    login: "tomshen",
    role: ["B3", "Current"],
    imagePath: "/images/members/tomshen.png",
    description: "I like tech things",
    links: [
      {
        name: "Github",
        url: "https://github.com/TomShen1234",
      },
      {
        name: "X (Twitter)",
        url: "https://twitter.com/TomShen1234",
      },
    ],
    stat: [
      { name: "Strength", value: 45, max: 100 },
      { name: "Agility", value: 70, max: 100 },
      { name: "Intelligence", value: 85, max: 100 },
      { name: "Luck", value: Math.floor(Math.random() * 100), max: 100 },
    ],
  },
  {
    name: "Akash prasad",
    login: "pura",
    role: ["B1", "Current"],
    imagePath: "/images/members/pura.jpg",
    description: "I am a first semester student here",
    links: [
      {
        name: "Github",
        url: "https://github.com/purasfc",
      },
    ],
    stat: [
      { name: "Strength", value: 30, max: 100 },
      { name: "Agility", value: 30, max: 100 },
      { name: "Intelligence", value: 30, max: 100 },
      { name: "Luck", value: 99, max: 100 },
    ],
  },
  {
    name: "Xu Haoran",
    login: "joo",
    role: ["B1", "Current"],
    imagePath: "/images/members/Joe.jpg",
    description: "May the force be with you",
    links: [{ name: "Github", url: "https://github.com/Joe-Xuu" }],
    stat: [
      { name: "Strength", value: 50, max: 100 },
      { name: "Agility", value: 50, max: 100 },
      { name: "Intelligence", value: 50, max: 100 },
      { name: "Luck", value: 50, max: 100 },
    ],
  },
  {
    name: "Shin Nishio",
    login: "parton",
    role: ["Alumni"],
    imagePath: "/images/members/parton.jpg",
    description:
      "I was a member of AQUA from 2017 to 2020, where I worked on system software for quantum computers (compilers and quantum circuit optimization). I received my bachelor's degree from Keio University and am currently a PhD student at Sokendai/NII/OIST.",
    links: [
      { name: "Github", url: "https://github.com/parton-quark" },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=gZNt8twAAAAJ&hl=ja",
      },
      { name: "Personal web page", url: "https://parton.info/" },
    ],
    stat: [
      {
        name: "Nonlocality",
        value: 2,
        max: 4,
      },
    ],
  },
  {
    name: "Takahiko Satoh",
    login: "satoh",
    role: ["B.A. 2010", "Alumni"],
    imagePath: "/images/members/satoh.jpg",
    description: "Let's fly together in a glider.",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/takahiko.satoh.75" },
      { name: "Github", url: "https://github.com/ymbr" },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=7sU5XMMAAAAJ&hl=ja",
      },
    ],
    stat: [
      { name: "Strength", value: 30, max: 100 },
      { name: "Agility", value: 25, max: 100 },
      { name: "Intelligence", value: 75, max: 100 },
      { name: "Luck", value: 90, max: 100 },
    ],
  },
  {
    name: "Kentaro Teramoto",
    login: "zigen",
    role: ["Alumni"],
    imagePath: "/images/members/zigen.png",
    description: "I love programming",
    links: [
      { name: "Github", url: "https://github.com/zigen" },
      { name: "Twitter", url: "https://x.com/kei_0811" },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=NziiZC8AAAAJ",
      },
    ],
    stat: [
      { name: "Strength", value: Math.floor(Math.random() * 100), max: 100 },
      { name: "Agility", value: Math.floor(Math.random() * 100), max: 100 },
      {
        name: "Intelligence",
        value: Math.floor(Math.random() * 100),
        max: 100,
      },
      { name: "Luck", value: Math.floor(Math.random() * 100), max: 100 },
    ],
  },
  {
    name: "Shigetora Miyashita",
    login: "shingy",
    role: ["Alumni"],
    imagePath: "/images/members/shingy.png",
    description:
      "Graduate Student in Nuclear Engineering and Management at UTokyo",
    links: [
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=6-xrgvQAAAAJ",
      },
    ],
    stat: [
      { name: "Strength", value: Math.floor(Math.random() * 100), max: 100 },
      { name: "Agility", value: Math.floor(Math.random() * 100), max: 100 },
      {
        name: "Intelligence",
        value: Math.floor(Math.random() * 100),
        max: 100,
      },
      { name: "Luck", value: Math.floor(Math.random() * 100), max: 100 },
    ],
  },
  {
    name: "Andrew Todd",
    login: "atodd",
    role: ["Current", "特任助教"],
    imagePath: "/images/members/andrew-todd.jpg",
    description: "Why not Zoidberg?",
    links: [
      { name: "Homepage", url: "https://auspicacious.org/" },
      { name: "Mastodon", url: "https://mastodon.online/@auspicacious" },
      { name: "GitHub", url: "https://github.com/auspicacious" },
    ],
    stat: [{ name: "These go to 11", value: 11, max: 11 }],
  },
  {
    name: "Kanazawa Yoshiki",
    login: "rikachan",
    role: ["M1", "Current"],
    imagePath: "images/members/rika.jpg",
    description: "The heritage of the Silver Crystal",
    links: [
      {
        name: "Facebook",
        url: "https://www.facebook.com/rika15yk/",
      },
    ],
    stat: [
      { name: "Hope", value: 100, max: 100 },
      { name: "Courage", value: 100, max: 100 },
      { name: "Faith", value: 100, max: 100 },
      { name: "Weakness", value: 100, max: 100 },
    ],
  },
  {
    name: "Kouki Maeda",
    login: "k0uki",
    role: ["B4", "Current"],
    imagePath: "images/members/kouki.jpeg",
    description: "I'm a student at Keio University",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/sky12hi12",
      },
    ],
    stat: [
      { name: "Strength", value: 70, max: 100 },
      { name: "Agility", value: 80, max: 100 },
      { name: "Intelligence", value: 60, max: 100 },
      { name: "Luck", value: 30, max: 100 },
    ],
  },
]
