import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import SectionReveal from '@/components/ui/SectionReveal';

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main id="main-content">
        {/* Hero WebGL section */}
        <Hero />

        {/* About Section */}
        <SectionReveal>
          <About />
        </SectionReveal>

        {/* Skills Section */}
        <SectionReveal>
          <Skills />
        </SectionReveal>

        {/* Services / Professional Pillars Section */}
        <SectionReveal>
          <Services />
        </SectionReveal>

        {/* Experience Section */}
        <SectionReveal>
          <Experience />
        </SectionReveal>

        {/* Projects Showcase Section */}
        <SectionReveal>
          <Projects />
        </SectionReveal>

        {/* Testimonials Section */}
        <SectionReveal>
          <Testimonials />
        </SectionReveal>

        {/* Contact Form Section */}
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>

      <Footer />
    </>
  );
}
