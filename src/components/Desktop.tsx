import { useState } from 'react';
import { Folder, FileText, User, Mail, Terminal as TerminalIcon } from 'lucide-react';
import wallpaper from '@/assets/kaligreen.jpg';
import { Taskbar } from './Taskbar';
import { Window } from './Window';
import { Resume } from './windows/Resume';
import { Projects } from './windows/Projects';
import { About } from './windows/About';
import { Contact } from './windows/Contact';
import { Terminal } from './Terminal';
import { FileManager } from './windows/FileManager';

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
}

const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const desktopFolders = [
    {
      id: 'resume',
      title: 'Resume',
      icon: FileText,
      component: <Resume />,
      position: { x: 100, y: 100 }
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: Folder,
      component: <Projects />,
      position: { x: 200, y: 150 }
    },
    {
      id: 'about',
      title: 'About Me',
      icon: User,
      component: <About />,
      position: { x: 300, y: 200 }
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: Mail,
      component: <Contact />,
      position: { x: 400, y: 250 }
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: TerminalIcon,
      component: <Terminal />,
      position: { x: 520, y: 160 }
    },
    {
      id: 'files',
      title: 'Files',
      icon: Folder,
      component: <FileManager />,
      position: { x: 620, y: 180 }
    }
  ];

  const openWindow = (folderId: string) => {
    const folder = desktopFolders.find(f => f.id === folderId);
    if (!folder) return;

    const existingWindow = windows.find(w => w.id === folderId);
    if (existingWindow) {
      // Bring to front and unminimize
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
      isMaximized: false,
      position: folder.position,
      size: { width: 700, height: 420 },
      component: folder.component,
      animationClassName: folder.id === 'terminal' ? 'terminal-3d-open' : 'window-3d-open',
    };

    setWindows(prev => [...prev, newWindow]);
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { 
        ...w, 
        isMaximized: !w.isMaximized,
        position: w.isMaximized ? w.position : { x: 0, y: 0 },
        size: w.isMaximized ? w.size : { width: window.innerWidth, height: window.innerHeight - 60 }
      } : w
    ));
  };

  const updateWindowPosition = (windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ));
  };

  return (
    <div 
      className="h-screen w-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-8">
        <div className="grid grid-cols-1 gap-6 w-fit">
          {desktopFolders.map((folder) => (
            <div
              key={folder.id}
              className="desktop-folder"
              onDoubleClick={() => openWindow(folder.id)}
            >
              <folder.icon className="folder-icon w-12 h-12 text-primary mb-2 transition-all duration-300" />
              <span className="text-sm text-foreground font-mono select-none">
                {folder.title}
              </span>
            </div>
          ))}
        </div>
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
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onPositionChange={(position) => updateWindowPosition(window.id, position)}
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
          setWindows(prev => prev.map(w => 
            w.id === windowId ? { ...w, isMinimized: false } : w
          ));
        }}
      />
    </div>
  );
};

export default Desktop;