import About from "./page.mdx"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="prose dark:prose-invert">
        <About />
      </div>
    </div>
  )
}
