import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Desktop Pages
import { Layout as DesktopLayout } from './components/layout/Layout';
import { Home as HomeDesktop } from './pages/Home';
import { About as AboutDesktop } from './pages/About';
import { Experience as ExperienceDesktop } from './pages/Experience';
import { Hobbies as HobbiesDesktop } from './pages/Hobbies';
import { FunGames as FunGamesDesktop } from './pages/FunGames';
import { Contact as ContactDesktop } from './pages/Contact';
import { Quote as QuoteDesktop } from './pages/Quote';
import { Project as ProjectDesktop } from './pages/Project';

import { AdminMessages } from './pages/AdminMessages';

// Shared Sections for Full Home Page
import { ContactSection } from './components/sections/ContactSection';
import { QuoteSection } from './components/sections/QuoteSection';
import { AboutSection } from './components/sections/AboutSection';
import { PhotoGallery } from './components/sections/PhotoGallery';

const FullHomePageDesktop = () => (
  <>
    <HomeDesktop />
    <PhotoGallery />
    <QuoteSection />
    <AboutSection />
    <ExperienceDesktop />
    <ContactSection />
  </>
);
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DesktopLayout />}>
            <Route index element={<FullHomePageDesktop />} />
            <Route path="about" element={<AboutDesktop />} />
            <Route path="experience" element={<ExperienceDesktop />} />
            <Route path="hobbies" element={<HobbiesDesktop />} />
            <Route path="fun-games" element={<FunGamesDesktop />} />
            <Route path="contact" element={<ContactDesktop />} />
            <Route path="quote" element={<QuoteDesktop />} />
            <Route path="project" element={<ProjectDesktop />} />
            <Route path="admin" element={<AdminMessages />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
    </>
  );
}