import { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  animationClassName?: string;
}

export const Window = ({
  id,
  title,
  children,
  position,
  size,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  animationClassName,
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;

      const newPosition = {
        x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - size.height - 60, e.clientY - dragOffset.y))
      };

      onPositionChange(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, size, onPositionChange, isMaximized]);

  const windowStyle = isMaximized
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 60px)' }
    : {
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height
      };

  return (
    <div
      ref={windowRef}
      className={`window absolute z-10 flex flex-col ${animationClassName ?? 'animate-scale-in'}`}
      style={windowStyle}
    >
      {/* Window Header */}
      <div
        className="window-header"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary/20 rounded border border-primary/40"></div>
          <span className="text-sm font-mono font-bold text-foreground">
            {title}
          </span>
        </div>
        
        <div className="window-controls">
          <button
            className="window-control minimize"
            onClick={onMinimize}
            title="Minimize"
          >
            <Minus className="w-2 h-2" />
          </button>
          <button
            className="window-control maximize"
            onClick={onMaximize}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Square className="w-2 h-2" />
          </button>
          <button
            className="window-control close"
            onClick={onClose}
            title="Close"
          >
            <X className="w-2 h-2" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto p-4 bg-card">
        {children}
      </div>
    </div>
  );
};