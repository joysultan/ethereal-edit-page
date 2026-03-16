import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ── floating shape data ── */
const shapes = [
  { type: "ring", size: 120, x: "10%", y: "15%", delay: 0, dur: 22, gradient: "start" },
  { type: "hexagon", size: 90, x: "82%", y: "10%", delay: 1.2, dur: 18, gradient: "mid" },
  { type: "triangle", size: 70, x: "78%", y: "65%", delay: 0.6, dur: 25, gradient: "end" },
  { type: "hexagon", size: 55, x: "15%", y: "74%", delay: 2, dur: 20, gradient: "mid" },
  { type: "cross", size: 40, x: "90%", y: "40%", delay: 1.5, dur: 16, gradient: "start" },
  { type: "ring", size: 80, x: "48%", y: "85%", delay: 0.8, dur: 24, gradient: "end" },
  { type: "diamond", size: 45, x: "32%", y: "18%", delay: 1.8, dur: 19, gradient: "mid" },
  { type: "hexagon", size: 60, x: "62%", y: "42%", delay: 0.4, dur: 21, gradient: "start" },
];

/* ── light streak data ── */
const streaks = [
  { angle: -35, top: "12%", left: "-10%", width: 550, delay: 0, dur: 8 },
  { angle: -25, top: "52%", left: "55%", width: 450, delay: 3, dur: 10 },
  { angle: -40, top: "32%", left: "25%", width: 380, delay: 5, dur: 7 },
  { angle: -30, top: "75%", left: "10%", width: 300, delay: 7, dur: 9 },
];

/* ── shape renderers ── */
const ShapeSVG = ({ type, size, gradient }: { type: string; size: number; gradient: string }) => {
  const color = `hsl(var(--gradient-${gradient}))`;
  switch (type) {
    case "ring":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
          <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="0.5" opacity="0.15" />
        </svg>
      );
    case "hexagon":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,3 93,25 93,75 50,97 7,75 7,25" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,8 92,88 8,88" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
        </svg>
      );
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
        </svg>
      );
    case "cross":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <line x1="50" y1="10" x2="50" y2="90" stroke={color} strokeWidth="1.2" opacity="0.25" />
          <line x1="10" y1="50" x2="90" y2="50" stroke={color} strokeWidth="1.2" opacity="0.25" />
        </svg>
      );
    default:
      return null;
  }
};

/* ── Creative tool floating UI hints ── */
const ToolHints = () => (
  <>
    {/* Timeline bar (Premiere Pro) */}
    <motion.div
      className="absolute hidden md:block"
      style={{ left: "3%", top: "35%", opacity: 0.12 }}
      animate={{ y: [0, -12, 0], opacity: [0.08, 0.15, 0.08] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="160" height="50" viewBox="0 0 160 50">
        <rect x="0" y="20" width="160" height="2" rx="1" fill="hsl(var(--gradient-mid))" opacity="0.5" />
        <rect x="10" y="10" width="25" height="12" rx="2" fill="hsl(var(--gradient-start))" opacity="0.4" />
        <rect x="40" y="10" width="35" height="12" rx="2" fill="hsl(var(--gradient-end))" opacity="0.35" />
        <rect x="80" y="10" width="20" height="12" rx="2" fill="hsl(var(--gradient-mid))" opacity="0.3" />
        <rect x="105" y="10" width="40" height="12" rx="2" fill="hsl(var(--gradient-start))" opacity="0.25" />
        <rect x="15" y="28" width="30" height="8" rx="2" fill="hsl(var(--gradient-mid))" opacity="0.25" />
        <rect x="50" y="28" width="45" height="8" rx="2" fill="hsl(var(--gradient-end))" opacity="0.2" />
        <rect x="100" y="28" width="25" height="8" rx="2" fill="hsl(var(--gradient-start))" opacity="0.2" />
        {/* playhead */}
        <line x1="70" y1="5" x2="70" y2="45" stroke="hsl(var(--gradient-mid))" strokeWidth="1.5" opacity="0.6" />
        <polygon points="67,5 73,5 70,0" fill="hsl(var(--gradient-mid))" opacity="0.6" />
      </svg>
    </motion.div>

    {/* Color wheel (Color grading) */}
    <motion.div
      className="absolute hidden md:block"
      style={{ right: "4%", top: "22%", opacity: 0.1 }}
      animate={{ rotate: [0, 360], opacity: [0.06, 0.12, 0.06] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="35" fill="none" stroke="hsl(var(--gradient-end))" strokeWidth="0.8" opacity="0.4" />
        <circle cx="40" cy="40" r="28" fill="none" stroke="hsl(var(--gradient-mid))" strokeWidth="0.6" opacity="0.3" />
        <circle cx="40" cy="40" r="20" fill="none" stroke="hsl(var(--gradient-start))" strokeWidth="0.6" opacity="0.25" />
        <circle cx="40" cy="12" r="3" fill="hsl(var(--gradient-end))" opacity="0.5" />
        <circle cx="60" cy="52" r="3" fill="hsl(var(--gradient-mid))" opacity="0.5" />
        <circle cx="20" cy="52" r="3" fill="hsl(var(--gradient-start))" opacity="0.5" />
      </svg>
    </motion.div>

    {/* Vector path (Illustrator) */}
    <motion.div
      className="absolute hidden lg:block"
      style={{ right: "8%", bottom: "25%", opacity: 0.1 }}
      animate={{ y: [0, -8, 0], opacity: [0.06, 0.13, 0.06] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      <svg width="120" height="80" viewBox="0 0 120 80">
        <path d="M10,60 Q30,10 60,40 T110,20" fill="none" stroke="hsl(var(--gradient-start))" strokeWidth="1.2" opacity="0.4" />
        {/* anchor points */}
        <rect x="7" y="57" width="6" height="6" fill="none" stroke="hsl(var(--gradient-mid))" strokeWidth="1" opacity="0.5" />
        <rect x="57" y="37" width="6" height="6" fill="none" stroke="hsl(var(--gradient-mid))" strokeWidth="1" opacity="0.5" />
        <rect x="107" y="17" width="6" height="6" fill="none" stroke="hsl(var(--gradient-mid))" strokeWidth="1" opacity="0.5" />
        {/* handles */}
        <line x1="10" y1="60" x2="30" y2="10" stroke="hsl(var(--gradient-mid))" strokeWidth="0.5" opacity="0.25" strokeDasharray="3,3" />
        <circle cx="30" cy="10" r="2.5" fill="hsl(var(--gradient-mid))" opacity="0.4" />
      </svg>
    </motion.div>

    {/* Layers panel (Photoshop) */}
    <motion.div
      className="absolute hidden lg:block"
      style={{ left: "5%", bottom: "18%", opacity: 0.1 }}
      animate={{ y: [0, -10, 0], opacity: [0.06, 0.12, 0.06] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    >
      <svg width="100" height="70" viewBox="0 0 100 70">
        <rect x="0" y="0" width="100" height="70" rx="4" fill="none" stroke="hsl(var(--gradient-start))" strokeWidth="0.6" opacity="0.2" />
        <rect x="5" y="5" width="90" height="12" rx="2" fill="hsl(var(--gradient-start))" opacity="0.15" />
        <rect x="5" y="21" width="90" height="12" rx="2" fill="hsl(var(--gradient-end))" opacity="0.1" />
        <rect x="5" y="37" width="90" height="12" rx="2" fill="hsl(var(--gradient-mid))" opacity="0.08" />
        <rect x="5" y="53" width="90" height="12" rx="2" fill="hsl(var(--gradient-start))" opacity="0.06" />
        {/* eye icons */}
        <circle cx="12" cy="11" r="2" fill="hsl(var(--gradient-mid))" opacity="0.4" />
        <circle cx="12" cy="27" r="2" fill="hsl(var(--gradient-mid))" opacity="0.3" />
        <circle cx="12" cy="43" r="2" fill="hsl(var(--gradient-mid))" opacity="0.2" />
      </svg>
    </motion.div>

    {/* Keyframe curve (After Effects) */}
    <motion.div
      className="absolute hidden md:block"
      style={{ left: "25%", top: "8%", opacity: 0.08 }}
      animate={{ x: [0, 6, 0], opacity: [0.05, 0.1, 0.05] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    >
      <svg width="140" height="40" viewBox="0 0 140 40">
        <path d="M0,30 C20,30 30,10 50,10 S80,30 100,15 S120,25 140,10" fill="none" stroke="hsl(var(--gradient-end))" strokeWidth="1" opacity="0.35" />
        <diamond />
        <polygon points="48,7 53,10 48,13 43,10" fill="hsl(var(--gradient-end))" opacity="0.5" />
        <polygon points="98,12 103,15 98,18 93,15" fill="hsl(var(--gradient-end))" opacity="0.4" />
        <polygon points="0,27 5,30 0,33 -5,30" fill="hsl(var(--gradient-end))" opacity="0.3" />
      </svg>
    </motion.div>
  </>
);

/* ── animated letters with 3D reveal ── */
const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      delay: 0.6 + i * 0.045,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

const AnimatedLine = ({
  text,
  className,
  startIndex = 0,
}: {
  text: string;
  className?: string;
  startIndex?: number;
}) => (
  <span className={`block ${className || ""}`} style={{ perspective: "800px" }}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={startIndex + i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className="inline-block transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_20px_hsl(var(--gradient-start)/0.8)]"
        style={{ transformOrigin: "bottom", cursor: "default" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

/* ── Lens flare component ── */
const LensFlare = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsl(var(--gradient-mid) / 0.4) 0%, hsl(var(--gradient-start) / 0.1) 40%, transparent 70%)`,
    }}
    animate={{
      opacity: [0, 0.6, 0.2, 0.5, 0],
      scale: [0.8, 1.2, 0.9, 1.1, 0.8],
    }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

/* ════════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════════ */
const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const layer1X = useTransform(smoothX, [0, 1], [30, -30]);
  const layer1Y = useTransform(smoothY, [0, 1], [20, -20]);
  const layer2X = useTransform(smoothX, [0, 1], [-20, 20]);
  const layer2Y = useTransform(smoothY, [0, 1], [-15, 15]);
  const layer3X = useTransform(smoothX, [0, 1], [15, -15]);
  const layer3Y = useTransform(smoothY, [0, 1], [10, -10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        w: 2 + Math.random() * 3,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        grad: ["start", "mid", "end"][i % 3],
        dur: 3 + Math.random() * 4,
        delay: Math.random() * 6,
      })),
    [],
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-[0.10]">
          <source src="https://cdn.pixabay.com/video/2024/02/12/200351-912082564_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* ── NEON ORB LAYER (parallax layer 1) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ x: layer1X, y: layer1Y, translateY: scrollY * -0.15 }}
      >
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-20" style={{ background: "hsl(var(--gradient-start))", top: "0%", left: "0%" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-15" style={{ background: "hsl(var(--gradient-mid))", top: "40%", right: "-5%" }} />
        <div className="absolute w-[450px] h-[450px] rounded-full blur-[130px] opacity-15" style={{ background: "hsl(var(--gradient-end))", bottom: "0%", left: "30%" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-10" style={{ background: "hsl(var(--gradient-mid))", top: "20%", left: "50%" }} />
      </motion.div>

      {/* ── LENS FLARES ── */}
      <motion.div className="absolute inset-0 pointer-events-none z-[2]" style={{ x: layer3X, y: layer3Y }}>
        <LensFlare x="15%" y="20%" size={200} delay={0} />
        <LensFlare x="70%" y="15%" size={150} delay={2} />
        <LensFlare x="80%" y="65%" size={180} delay={4} />
        <LensFlare x="25%" y="70%" size={120} delay={6} />
      </motion.div>

      {/* ── CREATIVE TOOL UI HINTS ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{ x: layer2X, y: layer2Y, translateY: scrollY * -0.05 }}
      >
        <ToolHints />
      </motion.div>

      {/* ── FLOATING GEOMETRIC SHAPES (parallax layer 2) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[4]"
        style={{ x: layer2X, y: layer2Y, translateY: scrollY * -0.08 }}
      >
        {shapes.map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: s.x, top: s.y }}
            animate={{ y: [0, -25, 10, -15, 0], rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          >
            <ShapeSVG type={s.type} size={s.size} gradient={s.gradient} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── LIGHT STREAKS ── */}
      <motion.div className="absolute inset-0 pointer-events-none z-[5]" style={{ x: layer3X, y: layer3Y }}>
        {streaks.map((s, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px]"
            style={{
              width: s.width,
              top: s.top,
              left: s.left,
              rotate: `${s.angle}deg`,
              background: `linear-gradient(90deg, transparent, hsl(var(--gradient-start) / 0.5), hsl(var(--gradient-mid) / 0.3), transparent)`,
            }}
            animate={{ x: [0, 900], opacity: [0, 0.7, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* ── PARTICLE DOTS ── */}
      <div className="absolute inset-0 pointer-events-none z-[6]">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: p.w, height: p.w, top: p.top, left: p.left, background: `hsl(var(--gradient-${p.grad}) / 0.6)` }}
            animate={{ opacity: [0, 1, 0], y: [0, -50, -100], scale: [0, 1.2, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* ── GRID OVERLAY ── */}
      <div
        className="absolute inset-0 z-[7] opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto" style={{ transform: `translateY(${scrollY * -0.3}px)` }}>
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/60 text-sm font-body text-muted-foreground tracking-[0.2em] uppercase backdrop-blur-sm bg-card/30">
            <Play className="w-3.5 h-3.5 text-primary" />
            Video Editor & Graphics Designer
          </span>
        </motion.div>

        {/* main heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.92] mb-4 tracking-tight">
          <AnimatedLine text="Crafting Stories." className="text-foreground" startIndex={0} />
          <AnimatedLine text="Designing" className="gradient-text mt-2" startIndex={16} />
          <AnimatedLine text="Experiences." className="text-foreground mt-2" startIndex={25} />
        </h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 font-body leading-relaxed"
        >
          Where cinematic storytelling meets striking design — crafting visuals
          that captivate, communicate, and leave a lasting impression.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <motion.a
            href="#work"
            className="group relative px-10 py-4 rounded-full font-display font-semibold text-primary-foreground overflow-hidden"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full gradient-bg opacity-100"
              animate={{
                boxShadow: [
                  "0 0 20px hsl(var(--gradient-start) / 0.3), 0 0 60px hsl(var(--gradient-end) / 0.15)",
                  "0 0 40px hsl(var(--gradient-start) / 0.5), 0 0 90px hsl(var(--gradient-end) / 0.25)",
                  "0 0 20px hsl(var(--gradient-start) / 0.3), 0 0 60px hsl(var(--gradient-end) / 0.15)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </span>
          </motion.a>

          <motion.a
            href="#about"
            className="px-10 py-4 rounded-full font-display font-semibold gradient-border bg-card/40 text-foreground backdrop-blur-sm hover:bg-card/70 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            About Me
          </motion.a>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
