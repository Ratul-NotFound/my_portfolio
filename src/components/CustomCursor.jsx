'use client';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const { theme } = useTheme();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instantaneous coordinate translation on GPU layer with zero lag
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    // Highly responsive snappy spring trailing loop
    let animationFrameId;
    const animateRing = () => {
      const ease = 0.3; // Increased to 0.3 for snappier, ultra-responsive trailing action
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;

      animationFrameId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    animationFrameId = requestAnimationFrame(animateRing);

    // Dynamic hover scaling over interactive triggers
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const style = window.getComputedStyle(target);
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        style.cursor === 'pointer' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA';

      if (isInteractive) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  // Premium styles tailored per theme
  const getThemeStyles = () => {
    switch (theme) {
      case 'hacker':
        return {
          dot: 'bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.8)]',
          ring: 'border-[#00ff41] border-[1.5px] border-double shadow-[0_0_12px_rgba(0,255,65,0.3)]',
          dotShape: 'rounded-none w-1.5 h-1.5',
          ringShape: 'rounded-none w-7 h-7 rotate-45',
        };
      case 'creative':
        return {
          dot: 'bg-gradient-to-r from-[#0088ff] to-[#ec4899]',
          ring: 'border-[#ec4899] border-[2px] border-dashed animate-[spin_10s_linear_infinite]',
          dotShape: 'rounded-full w-2.5 h-2.5',
          ringShape: 'rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] w-9 h-9',
        };
      case 'light':
        return {
          dot: 'bg-[#4f46e5] shadow-sm',
          ring: 'border-[#4f46e5]/35 border-[1px] shadow-[0_4px_12px_rgba(0,0,0,0.03)]',
          dotShape: 'rounded-full w-1.5 h-1.5',
          ringShape: 'rounded-full w-7 h-7',
        };
      default: // dark
        return {
          dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
          ring: 'border-cyan-400/40 border-[1.5px] shadow-[0_0_15px_rgba(34,211,238,0.15)]',
          dotShape: 'rounded-full w-2 h-2',
          ringShape: 'rounded-full w-7 h-7',
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div
      className={`custom-cursor-wrapper fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block`}
    >
      {/* Inner snappy precise dot pointer */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform transition-[scale,opacity,background-color] duration-150 ease-out ${
          styles.dotShape
        } ${styles.dot} ${
          isClicked ? 'scale-0' : isHovering ? 'scale-[1.8] opacity-60' : 'scale-100'
        }`}
        style={{ left: 0, top: 0 }}
      />

      {/* Trailing snappy spring bubble ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform border transition-[scale,opacity,border-color,background-color,border-radius] duration-200 ease-out ${
          styles.ringShape
        } ${styles.ring} ${
          isClicked
            ? 'scale-[0.8] border-opacity-90 bg-current/10'
            : isHovering
              ? 'scale-[1.5] bg-current/5 border-opacity-80 mix-blend-difference'
              : 'scale-100'
        }`}
        style={{
          left: 0,
          top: 0,
          color: theme === 'creative' ? '#0088ff' : theme === 'hacker' ? '#00ff41' : theme === 'light' ? '#4f46e5' : '#22d3ee'
        }}
      />
    </div>
  );
}
