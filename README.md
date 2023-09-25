This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Prerequisites

* [Visual Studio Code](https://code.visualstudio.com/)
* [Docker](https://code.visualstudio.com/docs/devcontainers/containers#_system-requirements)
* [VSCode Dev Container Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

```bash
$ git clone git@github.com:sfc-aqua/sfc-aqua.github.io.git
$ cd sfc-aqua.github.io
# open the cloned repository, if you install the 'code' command, you can do this
# see detail of the 'code' command is here
# https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line
$ code .
# or manually open it on visual studio code
```

then you can open the folder with the Dev Container.
Open command palette by `View > Command Palette` and then type and select `Dev Containers: Rebuild and Reopen in Container`.

## Getting Started

First, run install the dependencies and the development server:

```bash
$ npm install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

before commit your changes, you _must_ run:

```bash
$ npm run lint
```

to format your code.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
