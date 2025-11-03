import React, { useEffect, useRef, useState } from 'react';

// A lightweight mouse-driven mini-game: collect orbs by hovering near them.
// Orbs float gently; moving your mouse attracts them. Gain points when an orb touches the cursor.
export default function MiniGame() {
  const canvasRef = useRef(null);
  const animRef = useRef(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [running, setRunning] = useState(true);

  const orbsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  // Initialize orbs
  const spawnOrbs = (w, h, count = 20) => {
    const orbs = [];
    for (let i = 0; i < count; i++) {
      orbs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 6 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        hue: 180 + Math.random() * 160,
        active: true,
      });
    }
    orbsRef.current = orbs;
  };

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawnOrbs(rect.width, rect.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // Timer
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, running]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Background grid glow
      ctx.fillStyle = 'rgba(7, 9, 20, 0.9)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Gentle grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < rect.width; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      for (let y = 0; y < rect.height; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      const mouse = mouseRef.current;

      // Update and draw orbs
      orbsRef.current.forEach((o) => {
        // Float
        o.x += o.vx;
        o.y += o.vy;

        // Wrap
        if (o.x < -20) o.x = rect.width + 20;
        if (o.x > rect.width + 20) o.x = -20;
        if (o.y < -20) o.y = rect.height + 20;
        if (o.y > rect.height + 20) o.y = -20;

        // Mouse attraction
        if (mouse.active) {
          const dx = mouse.x - o.x;
          const dy = mouse.y - o.y;
          const dist = Math.hypot(dx, dy) + 0.0001;
          const force = Math.min(1.5 / dist, 0.03);
          o.vx += dx * force * 0.02;
          o.vy += dy * force * 0.02;
        }

        // Friction
        o.vx *= 0.995;
        o.vy *= 0.995;

        // Draw orb
        const gradient = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 2.2);
        gradient.addColorStop(0, `hsla(${o.hue}, 90%, 70%, 0.95)`);
        gradient.addColorStop(1, `hsla(${o.hue}, 90%, 55%, 0.05)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        // Collect
        const dx = (mouse.x || -9999) - o.x;
        const dy = (mouse.y || -9999) - o.y;
        if (Math.hypot(dx, dy) < o.r + 8 && running && timeLeft > 0) {
          o.x = Math.random() * rect.width;
          o.y = Math.random() * rect.height;
          o.vx = (Math.random() - 0.5) * 0.8;
          o.vy = (Math.random() - 0.5) * 0.8;
          setScore((s) => s + 1);
        }
      });

      // Cursor pulse
      if (mouse.active) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 2;
        ctx.arc(mouse.x, mouse.y, 10 + Math.sin(Date.now() / 200) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [running, timeLeft]);

  // Mouse events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => (mouseRef.current.active = false);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const reset = () => {
    setScore(0);
    setTimeLeft(45);
    setRunning(true);
  };

  return (
    <section id="game" className="relative w-full py-12 md:py-16 bg-[#0a0a14] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Cursor Catch: Collect the energy orbs</h2>
            <p className="text-white/70 mt-1">Move your mouse to attract orbs. Each touch earns a point. Beat the timer!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/10 px-3 py-2 text-white">
              <span className="text-xs uppercase tracking-wide text-white/70">Score</span>
              <span className="ml-2 text-lg font-semibold">{score}</span>
            </div>
            <div className="rounded-lg bg-white/10 px-3 py-2 text-white">
              <span className="text-xs uppercase tracking-wide text-white/70">Time</span>
              <span className="ml-2 text-lg font-semibold">{Math.max(0, timeLeft)}s</span>
            </div>
            <button
              onClick={reset}
              className="rounded-lg border border-white/20 text-white px-3 py-2 hover:bg-white/10 transition"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="relative w-full h-[320px] md:h-[380px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl">
          <canvas ref={canvasRef} className="block w-full h-full" />

          {!running || timeLeft <= 0 ? (
            <div className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-white/80 mb-2">Time's up!</p>
                <p className="text-white text-2xl font-semibold mb-4">Final score: {score}</p>
                <button onClick={reset} className="rounded-lg bg-white text-black px-4 py-2 font-semibold">Play Again</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
