import React, { useRef, useEffect } from 'react';

const FireCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; opacity: number; size: number; vx: number; vy: number; color: string }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        points.current.push({
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          size: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          color: `hsl(${Math.random() * 20 + 10}, 100%, 50%)`,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.current.length; i++) {
        const point = points.current[i];
        point.opacity -= 0.04;
        point.size -= 0.06;
        point.x += point.vx;
        point.y += point.vy;

        if (point.opacity <= 0 || point.size <= 0) {
          points.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color.replace(/\d+\)/, `${point.opacity})`);
        ctx.shadowColor = point.color;
        ctx.shadowBlur = 10;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, willChange: 'transform' }} />;
};

export default FireCursor;
