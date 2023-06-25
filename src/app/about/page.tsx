import About from './page.mdx'

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="prose">
                <About />
            </div>
        </div>

    )
}