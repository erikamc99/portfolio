import { useState, useRef, useCallback } from "react";

export const EDGE_MARGIN_PERC = 0.03;

export const useFloatingNavPosition = () => {
  const navRef = useRef(null);
  const [position, setPosition] = useState({ x: 32, y: 32 });
  const [orientation, setOrientation] = useState("vertical");
  const [drag, setDrag] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const snapToEdge = useCallback((x, y) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const navW = navRef.current.offsetWidth;
    const navH = navRef.current.offsetHeight;
    const marginX = Math.round(vw * EDGE_MARGIN_PERC);
    const marginY = Math.round(vh * EDGE_MARGIN_PERC);
    const distLeft = x - marginX;
    const distRight = vw - navW - marginX - x;
    const distTop = y - marginY;
    const distBottom = vh - navH - marginY - y;
    const min = Math.min(distLeft, distRight, distTop, distBottom);
    if (min === distLeft)
      return { x: marginX, y: Math.min(Math.max(y, marginY), vh - navH - marginY) };
    if (min === distRight)
      return { x: vw - navW - marginX, y: Math.min(Math.max(y, marginY), vh - navH - marginY) };
    if (min === distTop)
      return { x: Math.min(Math.max(x, marginX), vw - navW - marginX), y: marginY };
    if (min === distBottom)
      return { x: Math.min(Math.max(x, marginX), vw - navW - marginX), y: vh - navH - marginY };
    return { x, y };
  }, []);

  const updateOrientation = useCallback((x, y) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const navW = navRef.current.offsetWidth;
    const navH = navRef.current.offsetHeight;
    const marginX = Math.round(vw * EDGE_MARGIN_PERC);
    const marginY = Math.round(vh * EDGE_MARGIN_PERC);
    const nearLeft = x <= marginX + 2;
    const nearRight = x + navW >= vw - marginX - 2;
    const nearTop = y <= marginY + 2;
    const nearBottom = y + navH >= vh - marginY - 2;
    if (nearTop || nearBottom) setOrientation("horizontal");
    else setOrientation("vertical");
  }, []);

  return {
    navRef,
    position,
    setPosition,
    orientation,
    setOrientation,
    drag,
    setDrag,
    offset,
    setOffset,
    snapToEdge,
    updateOrientation,
  };
};