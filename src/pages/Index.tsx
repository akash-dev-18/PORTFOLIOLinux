import { useEffect, useState } from 'react';
import Desktop from '../components/Desktop';
import BootScreen from '@/components/BootScreen';

const Index = () => {
  const [showBoot, setShowBoot] = useState<boolean>(true);

  useEffect(() => {
    // Always show boot on first paint; BootScreen will call onComplete when done or skipped
    setShowBoot(true);
  }, []);

  const handleBootComplete = () => {
    setShowBoot(false);
  };

  return (
    <>
      {showBoot && <BootScreen onComplete={handleBootComplete} />}
      <Desktop />
    </>
  );
};

export default Index;
