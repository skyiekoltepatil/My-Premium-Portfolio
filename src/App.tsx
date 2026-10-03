import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Desktop Pages
import { Layout as DesktopLayout } from './components/layout/Layout';

// Lazy load routes
const HomeDesktop = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const AboutDesktop = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const ExperienceDesktop = lazy(() => import('./pages/Experience').then(module => ({ default: module.Experience })));
const HobbiesDesktop = lazy(() => import('./pages/Hobbies').then(module => ({ default: module.Hobbies })));
const FunGamesDesktop = lazy(() => import('./pages/FunGames').then(module => ({ default: module.FunGames })));
const ContactDesktop = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const QuoteDesktop = lazy(() => import('./pages/Quote').then(module => ({ default: module.Quote })));
const ProjectDesktop = lazy(() => import('./pages/Project').then(module => ({ default: module.Project })));
const AdminMessages = lazy(() => import('./pages/AdminMessages').then(module => ({ default: module.AdminMessages })));

// Shared Sections for Full Home Page
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(module => ({ default: module.ContactSection })));
const QuoteSection = lazy(() => import('./components/sections/QuoteSection').then(module => ({ default: module.QuoteSection })));
const AboutSection = lazy(() => import('./components/sections/AboutSection').then(module => ({ default: module.AboutSection })));
const PhotoGallery = lazy(() => import('./components/sections/PhotoGallery').then(module => ({ default: module.PhotoGallery })));

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen w-full bg-white">
    <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const FullHomePageDesktop = () => (
  <Suspense fallback={<LoadingScreen />}>
    <HomeDesktop />
    <PhotoGallery />
    <QuoteSection />
    <AboutSection />
    <ExperienceDesktop />
    <ContactSection />
  </Suspense>
);

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
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
        </Suspense>
      </BrowserRouter>
      <SpeedInsights />
      <Analytics />
    </>
  );
}