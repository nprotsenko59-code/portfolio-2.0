import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Connect from "@/components/Connect";
import HomeScrollRestore from "@/components/HomeScrollRestore";

export default function Home() {
  return (
    <main>
      <HomeScrollRestore />
      <Hero />
      <Work />
      <About />
      <Connect />
    </main>
  );
}
