'use client';

import { useRef, useEffect } from 'react';

export default function Card({
  children,
  className = '',
  glassmorphism = false,
  hoverEffect = false,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);

  // Base classes for the card
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';

  // Glassmorphism effect classes
  const glassmorphismClasses = glassmorphism
    ? 'backdrop-blur-md bg-white/10 border border-white/20 shadow-xl'
    : 'bg-white shadow-md text-gray-900';

  // Hover effect classes
  const hoverClasses = hoverEffect
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';

  // Combined classes
  const cardClasses = `${baseClasses} ${glassmorphismClasses} ${hoverClasses} ${className}`;

  // Mouse move effect for glassmorphism cards
  useEffect(() => {
    if (!glassmorphism || !cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.backgroundImage = 'none';
    };

    if (glassmorphism) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (glassmorphism) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [glassmorphism]);

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
