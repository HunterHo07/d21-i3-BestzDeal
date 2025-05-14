'use client';

import { useRef, useEffect } from 'react';

export default function AuroraEffect({
  className = '',
  colors = ['#4F46E5', '#06B6D4', '#8B5CF6', '#3B82F6'],
  speed = 0.2,
  blur = 100,
  ...props
}) {
  const canvasRef = useRef(null);
  const blobsRef = useRef([]);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBlobs();
    };
    
    // Initialize blobs
    const initBlobs = () => {
      blobsRef.current = [];
      const numBlobs = 5;
      
      for (let i = 0; i < numBlobs; i++) {
        blobsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 300 + 100,
          color: colors[i % colors.length],
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    // Update and draw blobs
    const updateBlobs = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply blur filter
      ctx.filter = `blur(${blur}px)`;
      
      // Draw each blob
      blobsRef.current.forEach(blob => {
        // Move blob
        blob.x += blob.speedX;
        blob.y += blob.speedY;
        
        // Bounce off edges
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        
        // Draw blob
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        gradient.addColorStop(0, `${blob.color}${Math.round(blob.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${blob.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Reset filter
      ctx.filter = 'none';
      
      animationFrameId = requestAnimationFrame(updateBlobs);
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    
    // Initialize
    handleResize();
    updateBlobs();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, speed, blur]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-20 opacity-70 ${className}`}
      {...props}
    />
  );
}
