
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroScene from '@/components/HeroScene';
import AboutSection from '@/components/AboutSection';
import ScheduleSection from '@/components/ScheduleSection';
import SpeakersSection from '@/components/SpeakersSection';
import RegisterSection from '@/components/RegisterSection';
import SponsorsSection from '@/components/SponsorsSection';
import ThemeSection from '@/components/ThemeSection';
import NewCountdown from '@/components/NewCountdown';
import ProblemStatementSection from '@/components/ProblemStatementSection';
import OrganizersSection from '@/components/OrganizersSection';
import ChatBot from '@/components/ChatBot';
import RoundsSection from '@/components/RoundsSection';
import CodeOfConduct from '@/components/CodeOfConduct';

const Index = () => {
  useEffect(() => {
    // Ensure smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId as string);
      if (targetElement) {
        window.scrollTo({
          top: (targetElement as HTMLElement).offsetTop - 80, // Offset for navbar
          behavior: 'smooth'
        });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Cleanup event listeners on unmount
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroScene />
        <NewCountdown />
        <AboutSection />
<<<<<<< HEAD
        <CodeOfConduct /> {/* Add this line */}
=======
        <CodeOfConduct />
>>>>>>> e9f8ffefa7b71e27211b6ce3c9726a328984c2a6
        <RoundsSection />
        <ProblemStatementSection />
        <ScheduleSection />
        <SpeakersSection />
        {/* <ThemeSection /> */}
        <OrganizersSection />
        <SponsorsSection />
        <RegisterSection />
      </main>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
