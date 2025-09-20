import Hero from "@/components/sections/Hero"
import FeaturedProducts from "@/components/sections/FeaturedProducts"
import HeritageStorySection from "@/components/sections/HeritageStorySection"
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection"
import PremiumExperienceSection from "@/components/sections/PremiumExperienceSection"
import RecipeInspirationSection from "@/components/sections/RecipeInspirationSection"
import AboutSection from "@/components/sections/AboutSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import BlogSection from "@/components/sections/BlogSection"
import NewsletterSection from "@/components/sections/NewsletterSection"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProducts />
      <HeritageStorySection />
      <WhyChooseUsSection />
      <PremiumExperienceSection />
      <RecipeInspirationSection />
      <AboutSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
    </div>
  )
}
