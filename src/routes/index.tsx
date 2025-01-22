import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main class="relative">
      <div class="relative z-10">
        <Hero />
        <Features />
        <Calculator />
        <CallToAction />
        <Footer />
      </div>
      <div class="absolute inset-0 z-0 h-screen w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </main>
  );
}
