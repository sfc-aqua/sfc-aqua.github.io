export type TMember = {
  name: string;
  role: string;
  imagePath: string;
  description: string;
  links: {
    name: string;
    url: string;
  }[];
  stat?: {
    name: string;
    value: number;
    max: number;
  }[];
};

export const members: TMember[] = [
  // {
  //   name: "Rodney Van Meter",
  //   role: "Sensei",
  //   imagePath: "/images/members/rod.png",
  //   description: "Supervisor of the group",
  //   links: [
  //     { name: "Personal website", url: "http://web.sfc.keio.ac.jp/~rdv/" },
  //     {
  //       name: "Google scholar",
  //       url: "https://scholar.google.co.jp/citations?hl=en&user=-YlArkcAAAAJ&view_op=list_works",
  //     },
  //     { name: "WIDE project", url: "https://www.wide.ad.jp/" },
  //   ],
  //   stat: [
  //     { name: "Strength", value: 100, max: 100 },
  //     { name: "Agility", value: 100, max: 100 },
  //     { name: "Intelligence", value: 100, max: 100 },
  //     { name: "Luck", value: 100, max: 100 },
  //   ],
  // },
  {
    name: "Poramet",
    role: "D1",
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
];
