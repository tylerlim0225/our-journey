import FloatingNav from '@/components/FloatingNav';
import IntroSection from '@/components/IntroSection';
import MapSection from '@/components/MapSection';
import JourneySection from '@/components/JourneySection';
import MemoriesSection from '@/components/MemoriesSection';
import NotesSection from '@/components/NotesSection';
import VaultSection from '@/components/VaultSection';
import PlaceCard from '@/components/PlaceCard';

export default function Page() {
  return (
    <main className="relative">
      <FloatingNav />
      <IntroSection />
      <MapSection />
      <JourneySection />
      <MemoriesSection />
      <NotesSection />
      <VaultSection />
      <PlaceCard />
    </main>
  );
}
