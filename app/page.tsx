import Header from './components/landing/header';
import Hero from './components/landing/hero';
import Videos from './components/landing/videos';
import SocialProof from './components/landing/social-proof';
import Organizer from './components/landing/organizer';
import Repertoire from './components/landing/repertoire';
import Contact from './components/landing/contact';
import Footer from './components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main>
        <Hero />
        <Videos />
        <SocialProof />
        <Organizer />
        <Repertoire />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
