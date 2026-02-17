import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { Story } from "@/components/sections/story"
import { Footer } from "@/components/layout/footer"

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-yellow-400/30">
      <Header />
      <Hero />
      <Work />
      <Story />
      <Footer />
    </main>
  );
}
