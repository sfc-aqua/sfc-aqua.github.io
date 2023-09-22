import Image from "next/image"
import Mission from "./mission.mdx"
import News from "./news.mdx"

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      {/** Hero section */}
      <div className="min-h-[60vw] flex flex-col justify-center items-center w-full h-min">
        <h1 className="text-[9rem] font-mono">AQUA</h1>
        <h2 className="text-[rem] font-mono px-4">
          Advancing Quantum Architecture Research Group
        </h2>
      </div>
      <div className="flex flex-col gap-2 p-4 md:flex-row">
        <div className="p-4 prose border rounded-xl border-base-content/5 bg-base-200">
          <Mission />
        </div>
        <div className="p-4 prose border rounded-xl border-base-content/5 bg-base-200">
          <News />
        </div>
      </div>
    </main>
  )
}
