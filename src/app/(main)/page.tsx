import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Packages } from "@/components/sections/packages"
import { Story } from "@/components/sections/story"
import { Contact } from "@/components/sections/contact"

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-yellow-400/30">
      <Hero />
      <Services />
      <Packages />
      <Story />
      <Contact />
    </main>
  );
}
