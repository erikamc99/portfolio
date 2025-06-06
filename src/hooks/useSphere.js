import { useEffect } from 'react';

export const useSphere = (canvasRef, icons) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const radius = canvas.width / 3.2;
    const center = { x: w / 2, y: h / 2 };
    const iconSize = Math.round(canvas.width / 12);

    let rotX = 0.02;
    let rotY = 0.02;
    let mouseX = 0;
    let mouseY = 0;

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

    const project = ({ x, y, z }) => {
      const scale = 300 / (300 + z);
      return {
        x: x * scale + center.x,
        y: y * scale + center.y,
        scale,
      };
    };

    const updateCoords = () => {
      return items.map(({ img, phi, theta }) => {
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        return { img, coords: { x, y, z } };
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      rotY += mouseX * 0.015;
      rotX += mouseY * 0.015;

      const sphere = updateCoords();

      sphere.forEach(({ img, coords }) => {
        const rotated = rotate(coords.x, coords.y, coords.z, rotX, rotY);
        const { x, y, scale } = project(rotated);
        ctx.save();
        ctx.globalAlpha = scale;
        ctx.drawImage(img, x - iconSize / 2, y - iconSize / 2, iconSize, iconSize);
        ctx.restore();
      });

      requestAnimationFrame(render);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - center.x;
      const y = e.clientY - rect.top - center.y;
      mouseX = x / canvas.width;
      mouseY = y / canvas.height;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    render();

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [canvasRef, icons]);
};