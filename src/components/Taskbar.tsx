import { useState, useEffect } from 'react';
import { 
  Monitor, 
  Terminal, 
  Folder, 
  Settings, 
  Chrome,
  Clock
} from 'lucide-react';

interface TaskbarProps {
  windows: Array<{
    id: string;
    title: string;
    isMinimized: boolean;
  }>;
  onWindowRestore: (windowId: string) => void;
}

export const Taskbar = ({ windows, onWindowRestore }: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const taskbarIcons = [
    { icon: Chrome, label: 'Browser', active: false },
    { icon: Terminal, label: 'Terminal', active: false },
    { icon: Folder, label: 'Files', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-50">
      {/* Left side - Application icons */}
      <div className="flex items-center gap-2">
        {/* Kali Logo */}
        <div className="taskbar-icon">
          <Monitor className="w-6 h-6 text-primary" />
        </div>

        {/* Application icons */}
        {taskbarIcons.map((item, index) => (
          <div key={index} className="taskbar-icon" title={item.label}>
            <item.icon className="w-5 h-5 text-foreground" />
          </div>
        ))}
      </div>

      {/* Center - Open windows */}
      <div className="flex items-center gap-2">
        {windows.map((window) => (
          <button
            key={window.id}
            className={`taskbar-icon px-3 py-1 text-sm font-mono ${
              window.isMinimized 
                ? 'bg-muted/30 text-muted-foreground' 
                : 'bg-primary/20 text-primary border border-primary/30'
            }`}
            onClick={() => onWindowRestore(window.id)}
            title={window.title}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* Right side - System tray */}
      <div className="flex items-center gap-4">
        {/* Clock */}
        <div className="flex flex-col items-end text-xs font-mono">
          <div className="text-primary font-bold">
            {formatTime(currentTime)}
          </div>
          <div className="text-muted-foreground text-[10px]">
            {formatDate(currentTime)}
          </div>
        </div>
        <Clock className="w-4 h-4 text-primary" />
      </div>
    </div>
  );
};