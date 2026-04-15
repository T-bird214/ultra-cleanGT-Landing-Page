import Header from '@/components/Header'
import HeroSection from '@/components/sections/HeroSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import ValueSection from '@/components/sections/ValueSection'
import SocialProofSection from '@/components/sections/SocialProofSection'
import CtaSection from '@/components/sections/CtaSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ValueSection />
        <SocialProofSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
