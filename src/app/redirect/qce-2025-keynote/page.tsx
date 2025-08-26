import { permanentRedirect } from "next/navigation"

export default function Page() {
  permanentRedirect(
    "https://docs.google.com/presentation/d/16pDsMia2eJae-dG3Q93Zpkuf_ONhpcEox1KCjbNzpzA/edit?usp=sharing"
  )
}
