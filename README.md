
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

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
