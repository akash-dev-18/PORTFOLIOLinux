import { useState, useRef, memo, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  onMouseDown: () => void;
  animationClassName?: string;
}

export const Window = memo(({
  id,
  title,
  children,
  position,
  size,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  onSizeChange,
  onMouseDown,
  animationClassName,
}: WindowProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeRef = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleDragMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onMouseDown();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    onMouseDown();
    setIsResizing(true);
    resizeRef.current = {
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      };
      onPositionChange(newPosition);
    }
    if (isResizing) {
      const newSize = {
        width: resizeRef.current.width + (e.clientX - resizeRef.current.x),
        height: resizeRef.current.height + (e.clientY - resizeRef.current.y),
      };
      onSizeChange(newSize);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const windowStyle: React.CSSProperties = {
    width: size.width,
    height: size.height,
    transform: `translate(${position.x}px, ${position.y}px)`,
    zIndex,
  };

  if (isMaximized) {
    windowStyle.width = '100vw';
    windowStyle.height = 'calc(100vh - 60px)';
    windowStyle.transform = 'translate(0, 0)';
  }

  return (
    <div
      style={windowStyle}
      className={`window absolute flex flex-col ${isClosing ? 'animate-fade-out-down' : (animationClassName ?? 'animate-fade-in-up')}`}
      onMouseDown={onMouseDown}
    >
      <div className="window-header" onMouseDown={handleDragMouseDown}>
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
            onClick={handleClose}
            title="Close"
          >
            <X className="w-2 h-2" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-card">
        {children}
      </div>
      <div className="resize-handle w-4 h-4 absolute bottom-0 right-0 cursor-se-resize" onMouseDown={handleResizeMouseDown}></div>
    </div>
  );
});