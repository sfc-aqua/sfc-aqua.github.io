import AquaParticleLogo from "@/components/aqua-particle-logo"
import Mission from "./mission.mdx"
import News from "./news.mdx"

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      <AquaParticleLogo />
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
