'use client';
import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Blog from './_components/Blog';
import Experiences from './_components/Experiences';
import ContactSection from './_components/ContactSection';
import GithubActivity from './_components/GithubActivity';
import SpotifySection from './_components/SpotifySection';
import ProjectList from './_components/ProjectList';
import Skills from './_components/Skills';

export default function Home() {
  return (
    <div>
      <Banner />
      <AboutMe />
      <Skills />
      <Experiences />
      <ProjectList />
      <SpotifySection />
      <Blog />
      <GithubActivity />
      <ContactSection />
    </div>
  );
}
