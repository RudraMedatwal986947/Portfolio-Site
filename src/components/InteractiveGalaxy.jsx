import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/useTheme';

const InteractiveGalaxy = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Resize observer
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      vx: 0,
      vy: 0,
      isHovered: false,
      radius: 175,
    };

    let hoverTimeout = null;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      mouse.vx = newX - (mouse.targetX === -1000 ? newX : mouse.targetX);
      mouse.vy = newY - (mouse.targetY === -1000 ? newY : mouse.targetY);
      mouse.targetX = newX;
      mouse.targetY = newY;
      mouse.isHovered = true;

      // Reset hover timeout
      if (hoverTimeout) clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        mouse.vx *= 0.1;
        mouse.vy *= 0.1;
      }, 100);
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };

    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    // Galaxy Star Generation
    const STAR_COUNT = 480;
    const ARMS = 3;
    const stars = [];

    const isDark = theme === 'dark';

    // Mostly white stars with subtle ethereal hints of violet/purple and emerald green
    const darkStarColors = [
      'rgba(255, 255, 255, ',
      'rgba(255, 255, 255, ',
      'rgba(255, 255, 255, ',
      'rgba(192, 132, 252, ', // subtle purple
      'rgba(52, 211, 153, ',  // subtle emerald green
    ];
    const lightStarColors = [
      'rgba(15, 23, 42, ',
      'rgba(30, 41, 59, ',
      'rgba(126, 34, 206, ', // deep purple
      'rgba(5, 150, 105, ',  // deep emerald green
    ];

    const starColors = isDark ? darkStarColors : lightStarColors;

    for (let i = 0; i < STAR_COUNT; i++) {
      // Spiral distribution
      const arm = i % ARMS;
      const armOffset = (arm * 2 * Math.PI) / ARMS;
      // Exponential distribution towards center
      const distanceRatio = Math.pow(Math.random(), 1.5);
      const maxRadius = Math.min(width, height) * 0.48;
      const r = 18 + distanceRatio * maxRadius;

      // Spiral swirl formula
      const spiralAngle = r * 0.0075;
      const spread = (Math.random() - 0.5) * (0.35 + distanceRatio * 0.5);
      const angle = armOffset + spiralAngle + spread;

      stars.push({
        baseR: r,
        angle: angle,
        size: Math.random() * 1.8 + (distanceRatio < 0.12 ? 2.2 : 0.6),
        color: starColors[Math.floor(Math.random() * starColors.length)],
        alpha: Math.random() * 0.6 + 0.35,
        twinkleSpeed: 0.015 + Math.random() * 0.025,
        twinklePhase: Math.random() * Math.PI * 2,
        // Fluid displacement
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.isHovered) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
        mouse.vx *= 0.88;
        mouse.vy *= 0.88;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle core ambient glow
      const coreGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, height) * 0.32
      );
      if (isDark) {
        coreGradient.addColorStop(0, 'rgba(168, 85, 247, 0.04)'); // subtle purple
        coreGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.025)'); // subtle emerald
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        coreGradient.addColorStop(0, 'rgba(147, 51, 234, 0.03)');
        coreGradient.addColorStop(0.5, 'rgba(5, 150, 105, 0.02)');
        coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // FIXED STABLE BASE POSITION (No continuous rotation when idle)
        const targetX = centerX + Math.cos(star.angle) * star.baseR;
        const targetY = centerY + Math.sin(star.angle) * star.baseR * 0.72; // 3D tilted galaxy plane

        // Current position including fluid displacement
        let posX = targetX + star.dx;
        let posY = targetY + star.dy;

        // Fluid Mouse Interaction ONLY when hovered
        if (mouse.isHovered) {
          const distToMouse = Math.hypot(posX - mouse.x, posY - mouse.y);

          if (distToMouse < mouse.radius) {
            const force = 1 - distToMouse / mouse.radius;
            // Fluid swirl vortex around cursor
            const angleToMouse = Math.atan2(posY - mouse.y, posX - mouse.x);
            const swirlAngle = angleToMouse + Math.PI * 0.45; // Tangential flow

            const mouseVelocity = Math.hypot(mouse.vx, mouse.vy);
            const dynamicPush = force * 4.2 * (1 + Math.min(mouseVelocity * 0.08, 2.5));

            star.vx += Math.cos(swirlAngle) * dynamicPush * 0.35;
            star.vy += Math.sin(swirlAngle) * dynamicPush * 0.35;
          }
        }

        // Spring physics: smoothly pull perturbed star back to stable position
        star.vx += -star.dx * 0.045;
        star.vy += -star.dy * 0.045;

        // Damping / friction
        star.vx *= 0.85;
        star.vy *= 0.85;

        star.dx += star.vx;
        star.dy += star.vy;

        // If almost still, settle to exact zero displacement
        if (!mouse.isHovered && Math.abs(star.dx) < 0.01 && Math.abs(star.dy) < 0.01) {
          star.dx = 0;
          star.dy = 0;
          star.vx = 0;
          star.vy = 0;
        }

        posX = targetX + star.dx;
        posY = targetY + star.dy;

        // Gentle calm twinkle
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.2 + 0.8;
        const alpha = Math.min(Math.max(star.alpha * twinkle, 0.15), 1);

        // Draw star with assigned color (mostly white with subtle purple/emerald)
        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${alpha})`;
        ctx.fill();

        // Delicate halo glow for larger stars
        if (star.size > 1.8) {
          ctx.beginPath();
          ctx.arc(posX, posY, star.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${alpha * 0.2})`;
          ctx.fill();
        }

        // Delicate constellation lines connecting disturbed stars near cursor
        if (mouse.isHovered) {
          const distToMouse = Math.hypot(posX - mouse.x, posY - mouse.y);
          if (distToMouse < mouse.radius * 0.65) {
            for (let j = i + 1; j < Math.min(i + 4, stars.length); j++) {
              const other = stars[j];
              const otherX = centerX + Math.cos(other.angle) * other.baseR + other.dx;
              const otherY = centerY + Math.sin(other.angle) * other.baseR * 0.72 + other.dy;
              const lineDist = Math.hypot(posX - otherX, posY - otherY);

              if (lineDist < 42) {
                const lineAlpha = (1 - lineDist / 42) * 0.2 * (1 - distToMouse / (mouse.radius * 0.65));
                ctx.beginPath();
                ctx.moveTo(posX, posY);
                ctx.lineTo(otherX, otherY);
                // Subtle purple-emerald gradient tint for constellation lines
                ctx.strokeStyle = isDark
                  ? (i % 2 === 0 ? `rgba(168, 85, 247, ${lineAlpha})` : `rgba(52, 211, 153, ${lineAlpha})`)
                  : (i % 2 === 0 ? `rgba(126, 34, 206, ${lineAlpha})` : `rgba(5, 150, 105, ${lineAlpha})`);
                ctx.lineWidth = 0.6;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
};

export default InteractiveGalaxy;
