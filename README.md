# sfc-aqua.github.io

This is the source repository for the SFC AQUA homepage, accessible at [https://aqua.sfc.wide.ad.jp/](https://aqua.sfc.wide.ad.jp/) with a redirect at [https://sfc-aqua.github.io](https://sfc-aqua.github.io).

## Making additions and updates

First, follow the instructions in "Development," below, to set up your development environment.

### Adding or updating your member information

Everyone in AQUA should have a profile on the [Members page](https://aqua.sfc.wide.ad.jp/members).

The profiles are generated from information in the file [`src/app/members/members-data.ts`](https://github.com/sfc-aqua/sfc-aqua.github.io/blob/main/src/app/members/members-data.ts). Edit this file to add or change your profile information.

Pictures should be added to the directory [`public/images/members`](https://github.com/sfc-aqua/sfc-aqua.github.io/tree/main/public/images/members). Your picture should be in JPEG or WebP format with a 1:1 aspect ratio, maximum dimensions 500x500px, and maximum file size of 500kb. Do not use PNG for photographic or photo-like images; PNG is appropriate for rasterized vector graphics. You can upload a square picture; it will be automatically rounded for display.

If you are unsure about what photo editing application to use, try the [GNU Image Manipulation Program](https://www.gimp.org/), a free, open-source alternative to Photoshop.

### Adding or updating publications

Your publications should be added to the appropriate file in [`src/app/publications`](https://github.com/sfc-aqua/sfc-aqua.github.io/tree/main/src/app/publications). Files in this directory use the [MDX](https://mdxjs.com/) format, which is based on the [Markdown](https://en.wikipedia.org/wiki/Markdown) markup language. If you are familiar with Markdown, you can most likely write MDX without any issues.

## Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Prerequisites

In principle, everyone modifying this repository should be a member of the [sfc-aqua GitHub organization](https://github.com/sfc-aqua/). If you are not a member, ask one of the [organization owners](https://github.com/orgs/sfc-aqua/people) to add you before continuing.

You must be familiar with Git usage; see the [Moonshot project Git workflow documentation](https://github.com/moonshot-nagayama-pj/public-documents/blob/main/engineering/git-workflow.md) for basics.

#### Using Visual Studio Code (VSCode)

These instructions will work on Windows, MacOS, or Linux.

Install the following:

- [VSCode](https://code.visualstudio.com/)
- [Docker](https://code.visualstudio.com/docs/devcontainers/containers#_system-requirements)
- [VSCode Dev Container Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

Using VSCode, Git clone this repository.

Then, open the Dev Container: Open the command palette from `View > Command Palette` and then type and select `Dev Containers: Rebuild and Reopen in Container`.

#### Without VSCode

On MacOS, Linux, or other Unix-like systems, simply [install NodeJS](https://nodejs.org/) on your system, `git clone` this repository, and continue.

### Getting Started

**Before making any changes**, be sure to create a Git branch for your work.

Then, to execute the development server, run the following from the repository's base directory (inside your VSCode Dev Container, if using VSCode):

```bash
$ npm install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Before committing or pushing your changes**, run `npm run lint` to format your code. Improperly formatted code will be rejected.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js/)
