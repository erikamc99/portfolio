import { useRef, useState, useEffect } from 'react';
import { useSphere } from '../../hooks/useSphere';
import './StackSphere.css';

export default function StackSphere({ icons }) {
  const canvasRef = useRef();
  const [canvasSize, setCanvasSize] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setCanvasSize(width < 640 ? 300 : width < 1024 ? 400 : 500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useSphere(canvasRef, icons);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="stack-canvas" width={canvasSize} height={canvasSize} />
    </div>
  );
}