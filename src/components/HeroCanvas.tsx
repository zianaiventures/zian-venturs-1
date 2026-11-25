'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let animationFrameId: number;

    const NODE_COUNT = 38;
    const MAX_DIST = 110;
    const NODE_SPEED = 0.35;
    const MOUSE_RADIUS = 130;

    const mouse = { x: -999, y: -999 };

    interface NodeItem {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      pulse: number;
    }

    let nodes: NodeItem[] = [];

    function resize() {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      W = canvas.width = r.width;
      H = canvas.height = r.height;
    }

    function mkNode(): NodeItem {
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 0.42 * Math.min(W || 300, H || 300);
      return {
        x: (W || 300) / 2 + Math.cos(angle) * dist,
        y: (H || 300) / 2 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * NODE_SPEED,
        vy: (Math.random() - 0.5) * NODE_SPEED,
        r: 2 + Math.random() * 2.5,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    function init() {
      resize();
      nodes = Array.from({ length: NODE_COUNT }, mkNode);
    }

    function drawFrame() {
      if (!ctx || W === 0 || H === 0) {
        animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }
      ctx.clearRect(0, 0, W, H);

      /* draw edges */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.55;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* draw nodes */
      nodes.forEach((n) => {
        n.pulse += 0.04;
        const glowR = n.r + Math.sin(n.pulse) * 1.5;

        /* glow */
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR * 4);
        g.addColorStop(0, 'rgba(59,130,246,0.4)');
        g.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        /* core dot */
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(96,165,250,0.9)';
        ctx.fill();
      });

      /* move nodes */
      nodes.forEach((n) => {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS) {
          const force = ((MOUSE_RADIUS - d) / MOUSE_RADIUS) * 1.8;
          n.vx += (dx / d) * force * 0.15;
          n.vy += (dy / d) * force * 0.15;
        }
        n.vx *= 0.98;
        n.vy *= 0.98;
        n.x += n.vx;
        n.y += n.vy;

        const pad = 20;
        if (n.x < pad || n.x > W - pad) n.vx *= -1;
        if (n.y < pad || n.y > H - pad) n.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(drawFrame);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    const handleResize = () => {
      resize();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    init();
    drawFrame();

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="hero-canvas" className="absolute inset-0 w-full h-full rounded-[28px] z-0" />;
}
