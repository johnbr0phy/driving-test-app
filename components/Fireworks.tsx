"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  exploded: boolean;
}

interface FireworksProps {
  duration?: number;
  onComplete?: () => void;
  // Never stops launching; duration/onComplete are ignored. Pair with a
  // custom className to run behind the UI (e.g. Super Amazing Mode).
  continuous?: boolean;
  // Overrides the default overlay positioning/stacking classes.
  className?: string;
  // "gentle" scales the show down for a still-celebratory but lower-key
  // moment (e.g. a failed test that we want to acknowledge without
  // overselling it as a win).
  intensity?: "full" | "gentle";
}

const COLORS = [
  "#ff5252", // red
  "#ff9800", // orange
  "#ffeb3b", // yellow
  "#4caf50", // green
  "#2196f3", // blue
  "#9c27b0", // purple
  "#e91e63", // pink
  "#00bcd4", // cyan
];

export function Fireworks({ duration = 3000, onComplete, intensity = "full", continuous = false, className }: FireworksProps) {
  const gentle = intensity === "gentle";
  const initialBurstCount = gentle ? 2 : 5;
  const launchIntervalMs = gentle ? 650 : 300;
  const burstChanceThreshold = gentle ? 0.85 : 0.5;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number>(0);

  const createParticles = useCallback((x: number, y: number, color: string) => {
    const particleCount = 80 + Math.floor(Math.random() * 40);
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.2;
      const velocity = 2 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.01,
        size: 2 + Math.random() * 2,
      });
    }
  }, []);

  const launchFirework = useCallback((canvas: HTMLCanvasElement) => {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const targetY = Math.random() * canvas.height * 0.3 + canvas.height * 0.1;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    fireworksRef.current.push({
      x,
      y: canvas.height,
      targetY,
      vy: -12 - Math.random() * 4,
      color,
      exploded: false,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    startTimeRef.current = Date.now();

    // Initial burst of fireworks
    for (let i = 0; i < initialBurstCount; i++) {
      setTimeout(() => launchFirework(canvas), i * 150);
    }

    // Continue launching fireworks
    const launchInterval = setInterval(() => {
      if (continuous || Date.now() - startTimeRef.current < duration - 500) {
        launchFirework(canvas);
        if (Math.random() > burstChanceThreshold) {
          setTimeout(() => launchFirework(canvas), 100);
        }
      }
    }, launchIntervalMs);

    const animate = () => {
      // Clear canvas for transparency (UI shows through)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw fireworks
      fireworksRef.current = fireworksRef.current.filter((firework) => {
        if (!firework.exploded) {
          firework.y += firework.vy;
          firework.vy += 0.2; // gravity

          // Draw rocket trail
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = firework.color;
          ctx.fill();

          // Draw trail
          ctx.beginPath();
          ctx.moveTo(firework.x, firework.y);
          ctx.lineTo(firework.x, firework.y + 15);
          ctx.strokeStyle = firework.color;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Check if reached target
          if (firework.y <= firework.targetY || firework.vy >= 0) {
            firework.exploded = true;
            createParticles(firework.x, firework.y, firework.color);
            return false;
          }
          return true;
        }
        return false;
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05; // gravity
        particle.vx *= 0.99; // friction
        particle.alpha -= particle.decay;

        if (particle.alpha <= 0) return false;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      // Check if animation should end
      const elapsed = Date.now() - startTimeRef.current;
      if (!continuous && elapsed >= duration && particlesRef.current.length === 0) {
        cancelAnimationFrame(animationRef.current!);
        clearInterval(launchInterval);
        onComplete?.();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(launchInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [duration, onComplete, createParticles, launchFirework, initialBurstCount, launchIntervalMs, burstChanceThreshold, continuous]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "fixed inset-0 z-[60] pointer-events-none"}
      style={{ background: "transparent" }}
    />
  );
}
