import About from "@/components/layout/About";
import Contact from "@/components/layout/Contact";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";

export default function Home() {

  return (
    <main>
      <Hero />
      <HomeMenu />
      <About />
      <Contact />
    </main>
  )
}