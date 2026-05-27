import { useEffect } from 'react';

export const useSphere = (canvasRef, icons, canvasSize) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let rotX = 0.02;
    let rotY = 0.02;
    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId;

    const items = icons.map((icon, i, arr) => {
      const phi = Math.acos(-1 + (2 * i + 1) / arr.length);
      const theta = Math.sqrt(arr.length * Math.PI) * phi;
      const img = new Image();
      img.src = icon.src;
      return { img, phi, theta };
    });

    const rotate = (x, y, z, ax, ay) => {
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      let dx = cosY * x - sinY * z;
      let dz = sinY * x + cosY * z;

      let dy = cosX * y - sinX * dz;
      dz = sinX * y + cosX * dz;

      return { x: dx, y: dy, z: dz };
    };

    const project = ({ x, y, z }, center) => {
      const scale = 300 / (300 + z);
      return {
        x: x * scale + center.x,
        y: y * scale + center.y,
        scale,
      };
    };

    const updateCoords = (radius) => {
      return items.map(({ img, phi, theta }) => {
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        return { img, coords: { x, y, z } };
      });
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      const center = { x: w / 2, y: h / 2 };
      const radius = w / 3.2;
      const iconSize = Math.round(w / 12);

      ctx.clearRect(0, 0, w, h);

      rotY += 0.002 + mouseX * 0.015;
      rotX += 0.002 + mouseY * 0.015;

      const sphere = updateCoords(radius);

      sphere.forEach(({ img, coords }) => {
        const rotated = rotate(coords.x, coords.y, coords.z, rotX, rotY);
        const { x, y, scale } = project(rotated, center);

        ctx.save();
        ctx.globalAlpha = scale;

        ctx.drawImage(
          img,
          x - iconSize / 2,
          y - iconSize / 2,
          iconSize,
          iconSize
        );

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      const w = canvas.width;
      const h = canvas.height;
      const center = { x: w / 2, y: h / 2 };

      const x = e.clientX - rect.left - center.x;
      const y = e.clientY - rect.top - center.y;

      mouseX = x / w;
      mouseY = y / h;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    render();

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, icons, canvasSize]);
  };