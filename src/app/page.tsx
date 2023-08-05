import Image from 'next/image'
import Mission from './mission.mdx'
import News from './news.mdx'

export default function Home() {
    return (
        <main className="relative flex flex-col items-center w-full">
            {/** Hero section */}
            <div className="h-[60vw] flex flex-col justify-center items-center w-full">
                <h1 className="text-[10rem] font-mono">
                    AQUA
                </h1>
                <h2 className="text-[rem] font-mono">
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
