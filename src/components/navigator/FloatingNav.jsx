import React, { useEffect } from "react";
import "./FloatingNav.css";
import { useFloatingNavPosition } from "../../hooks/useFloatingNavPosition";

const navItems = [
  { id: "home", label: "Home", icon: "lucide:home", target: "#home" },
  { id: "projects", label: "Projects", icon: "lucide:folder-open", target: "#projects" },
  { id: "about", label: "About", icon: "lucide:user", target: "#about" },
  { id: "contact", label: "Contact", icon: "lucide:mail", target: "#contact" },
];

export const FloatingNav = () => {
  const {
    navRef,
    position,
    setPosition,
    orientation,
    drag,
    setDrag,
    offset,
    setOffset,
    snapToEdge,
    updateOrientation,
  } = useFloatingNavPosition();

  const handleMouseDown = (e) => {
    if (window.innerWidth < 700) return;
    setDrag(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    if (window.innerWidth < 700) {
      setPosition({ x: 0, y: window.innerHeight - 60 });
      return;
    }
    if (!drag) return;
    const handleMouseMove = (e) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const nav = navRef.current;
      const navW = nav.offsetWidth;
      const navH = nav.offsetHeight;
      const marginX = Math.round(vw * 0.02);
      const marginY = Math.round(vh * 0.02);
      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;
      if (newX < marginX) newX = marginX;
      if (newY < marginY) newY = marginY;
      if (newX + navW > vw - marginX) newX = vw - navW - marginX;
      if (newY + navH > vh - marginY) newY = vh - navH - marginY;
      setPosition({ x: newX, y: newY });
      updateOrientation(newX, newY);
    };
    const handleMouseUp = () => {
      setDrag(false);
      document.body.style.userSelect = "";
      setTimeout(() => {
        setPosition((pos) => {
          const snapped = snapToEdge(pos.x, pos.y);
          updateOrientation(snapped.x, snapped.y);
          return snapped;
        });
      }, 10);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [drag, offset, navRef, setPosition, snapToEdge, updateOrientation]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setPosition({ x: 0, y: window.innerHeight - 60 });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setPosition]);

  const handleNav = (target) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;

  return (
    <nav
      ref={navRef}
      className={`floating-nav ${isMobile ? "horizontal fixed-bottom" : orientation}`}
      style={
        isMobile
          ? { left: "50%", transform: "translateX(-50%)", bottom: "18px", top: "unset" }
          : { left: position.x, top: position.y, bottom: "unset", transform: "none" }
      }
      tabIndex={0}
      aria-label="Main navigation"
    >
      {!isMobile && (
        <div
          className="floating-nav-drag"
          onMouseDown={handleMouseDown}
          aria-label="Move navigation"
          tabIndex={-1}
        />
      )}
      <ul className="floating-nav-list">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className="floating-nav-btn"
              aria-label={item.label}
              title={item.label}
              tabIndex={0}
              onClick={() => handleNav(item.target)}
            >
              <iconify-icon icon={item.icon} width="20" height="20" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};