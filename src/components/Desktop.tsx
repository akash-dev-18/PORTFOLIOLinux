import { useState, useCallback } from 'react';
import { Folder, FileText, User, Mail, Terminal as TerminalIcon } from 'lucide-react';
import wallpaper from '@/assets/wallpaper-fog.jpg';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { Resume } from './windows/Resume';
import { Projects } from './windows/Projects';
import { About } from './windows/About';
import { Contact } from './windows/Contact';
import { Terminal } from './Terminal';
import { FileManager } from './windows/FileManager';
import { useIsMobile } from '@/hooks/use-mobile';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  component: React.ReactNode;
  animationClassName?: string;
  zIndex: number;
}

const initialFolders = [
  {
    id: 'resume',
    title: 'Resume',
    icon: FileText,
    component: <Resume />,
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: Folder,
    component: <Projects />,
  },
  {
    id: 'about',
    title: 'About Me',
    icon: User,
    component: <About />,
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: Mail,
    component: <Contact />,
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: TerminalIcon,
    component: <Terminal />,
  },
  {
    id: 'files',
    title: 'Files',
    icon: Folder,
    component: <FileManager />,
  }
];

const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const isMobile = useIsMobile();

  const openWindow = useCallback((folderId: string) => {
    const folder = initialFolders.find(f => f.id === folderId);
    if (!folder) return;

    const existingWindow = windows.find(w => w.id === folderId);
    if (existingWindow) {
      bringToFront(folderId);
      setWindows(prev => prev.map(w => 
        w.id === folderId 
          ? { ...w, isMinimized: false }
          : w
      ));
      return;
    }

    const newWindow: WindowState = {
      id: folderId,
      title: folder.title,
      isOpen: true,
      isMinimized: false,
      isMaximized: isMobile ? true : false,
      position: isMobile ? { x: 0, y: 0 } : { x: 250, y: 150 },
      size: isMobile ? { width: window.innerWidth, height: window.innerHeight - 60 } : { width: 700, height: 420 },
      component: folder.component,
      animationClassName: folder.id === 'terminal' ? 'terminal-3d-open' : 'window-3d-open',
      zIndex: nextZIndex,
    };

    setNextZIndex(prev => prev + 1);
    setWindows(prev => [...prev, newWindow]);
  }, [windows, isMobile, nextZIndex]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { 
        ...w, 
        isMaximized: !w.isMaximized,
      } : w
    ));
  }, []);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  }, []);

  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, size } : w
    ));
  }, []);

  const bringToFront = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-fit">
        {initialFolders.map((folder) => (
          <div
            key={folder.id}
            className="desktop-folder w-24 h-24 flex flex-col items-center justify-center"
            onClick={() => openWindow(folder.id)}
          >
            <folder.icon className="folder-icon w-12 h-12 text-primary mb-2 transition-all duration-300" />
            <span className="text-sm text-foreground font-mono select-none text-center">
              {folder.title}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        !window.isMinimized && (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            position={window.position}
            size={window.size}
            isMaximized={window.isMaximized}
            zIndex={window.zIndex}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onPositionChange={(position) => updateWindowPosition(window.id, position)}
            onSizeChange={(size) => updateWindowSize(window.id, size)}
            onMouseDown={() => bringToFront(window.id)}
            animationClassName={window.animationClassName}
          >
            {window.component}
          </Window>
        )
      ))}

      {/* Taskbar */}
      <Taskbar 
        windows={windows}
        onWindowRestore={(windowId) => {
          bringToFront(windowId);
          setWindows(prev => prev.map(w => 
            w.id === windowId ? { ...w, isMinimized: false } : w
          ));
        }}
      />
    </div>
  );
};

export default Desktop;