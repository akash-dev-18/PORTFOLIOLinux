import { useEffect, useRef, useState } from 'react';
import bootLogo from '@/assets/ba-logo-transp.png';

interface BootScreenProps {
  onComplete: () => void;
  durationMs?: number; // optional cap; if provided, completes after this regardless
}

// Helper to wait
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const BootScreen = ({ onComplete, durationMs }: BootScreenProps) => {
  const [stage, setStage] = useState<'grub' | 'boot' | 'logo'>('grub');
  const [countdown, setCountdown] = useState(3);
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);

  // Auto-scroll boot log
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Global skip handlers
  useEffect(() => {
    const skip = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      onComplete();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      // Any key to skip
      if (e.key) skip();
    };
    const onClick = () => skip();
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('click', onClick);
    };
  }, [onComplete]);

  // Optional hard cap for duration
  useEffect(() => {
    if (!durationMs) return;
    const t = setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onComplete();
      }
    }, durationMs);
    return () => clearTimeout(t);
  }, [durationMs, onComplete]);

  // GRUB-like splash then transition to boot
  useEffect(() => {
    if (stage !== 'grub') return;
    let interval: number | undefined;
    // Simple countdown
    interval = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (interval) window.clearInterval(interval);
          setStage('boot');
          return 0;
        }
        return c - 1;
      });
    }, 800);
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [stage]);

  // Boot log simulation
  useEffect(() => {
    if (stage !== 'boot') return;

    const bootLines = [
      'Kali GNU/Linux Rolling \n',
      'Linux version 6.6.0-kali3-amd64 (debian-kernel@lists.debian.org) (gcc (Debian 13.2.0-7) 13.2.0) \n',
      'Command line: BOOT_IMAGE=/boot/vmlinuz root=UUID=xxxx-xxxx ro quiet splash \n',
      '[ OK ] Mounted /boot/efi',
      '[ OK ] Reached target Local File Systems',
      '[ OK ] Started udev Kernel Device Manager',
      '[ OK ] Listening on Journal Socket',
      '[ OK ] Started Load/Save Screen Backlight Brightness',
      '[ OK ] Started Network Manager',
      '[ OK ] Reached target Network',
      '[ OK ] Started OpenSSH server daemon',
      '[ OK ] Started Daily apt download activities',
      '[ OK ] Started Authorization Manager',
      '[ OK ] Started Accounts Service',
      '[ OK ] Started GNOME Display Manager',
      '[ OK ] Started Hostname Service',
      '[ OK ] Reached target Graphical Interface',
      'Kali GNU/Linux rolling kali tty1',
      'kali login: root',
      'Password: ********',
      'Last login: Sat Jan 18 10:22:12 2025 from 127.0.0.1',
      '[ OK ] Initializing user session...',
      '[ OK ] Starting Kali Desktop Environment',
    ];

    let cancelled = false;

    const run = async () => {
      await wait(400);
      for (let i = 0; i < bootLines.length; i++) {
        if (cancelled) return;
        setLines((prev) => [...prev, bootLines[i]]);
        await wait(i < 3 ? 200 : 120);
      }
      await wait(500);
      if (!cancelled) {
        setStage('logo');
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [stage, onComplete]);

  // Logo stage: show blinking logo, then complete
  useEffect(() => {
    if (stage !== 'logo') return;
    let cancelled = false;
    const run = async () => {
      await wait(1600);
      if (!cancelled && !finishedRef.current) {
        finishedRef.current = true;
        onComplete();
      }
    };
    run();
    return () => { cancelled = true; };
  }, [stage, onComplete]);

  if (stage === 'grub') {
    return (
      <div className="fixed inset-0 z-[1000] bg-black text-gray-200 flex items-center justify-center select-none">
        <div className="w-[520px] border border-gray-600 bg-black/70 p-6">
          <div className="text-center text-sm text-gray-400 mb-4">GNU GRUB 2.06</div>
          <div className="border border-gray-600">
            <div className="px-4 py-3 bg-black text-primary font-mono">Kali GNU/Linux</div>
          </div>
          <div className="mt-4 text-xs text-gray-400 font-mono">
            Booting automatically in {countdown}s. Press any key to interrupt boot.
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'logo') {
    return (
      <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center select-none">
        <div className="flex flex-col items-center gap-4">
          <img src={bootLogo} alt="Boot Logo" className="w-44 h-44 object-contain kali-dragon-blink" />
          <div className="text-xs text-terminal-text font-mono">Starting Kali Desktop Environment...</div>
        </div>
      </div>
    );
  }

  // stage === 'boot'
  return (
    <div className="fixed inset-0 z-[1000] bg-black text-terminal-text font-mono select-none">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/30">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <span className="text-sm text-primary">Kali Linux Boot</span>
        <span className="ml-auto text-xs text-gray-400">Press any key to skip</span>
      </div>
      <div ref={containerRef} className="h-[calc(100vh-40px)] overflow-hidden p-4">
        {lines.map((line, idx) => (
          <pre key={idx} className="text-[12px] leading-5 whitespace-pre-wrap">
            {line}
          </pre>
        ))}
        <div className="text-[12px] leading-5 text-primary">_</div>
      </div>
    </div>
  );
};

export default BootScreen; 