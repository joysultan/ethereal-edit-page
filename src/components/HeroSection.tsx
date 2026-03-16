import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ── floating shape data ── */
const shapes = [
  { type: "ring", size: 120, x: "12%", y: "18%", delay: 0, dur: 22, color: "var(--gradient-start)" },
  { type: "triangle", size: 80, x: "82%", y: "14%", delay: 1.2, dur: 18, color: "var(--gradient-mid)" },
  { type: "ring", size: 60, x: "70%", y: "72%", delay: 0.6, dur: 25, color: "var(--gradient-end)" },
  { type: "diamond", size: 50, x: "20%", y: "75%", delay: 2, dur: 20, color: "var(--gradient-mid)" },
  { type: "cross", size: 40, x: "90%", y: "45%", delay: 1.5, dur: 16, color: "var(--gradient-start)" },
  { type: "ring", size: 90, x: "50%", y: "85%", delay: 0.8, dur: 24, color: "var(--gradient-end)" },
];

/* ── light streak data ── */
const streaks = [
  { angle: -35, top: "15%", left: "-10%", width: 500, delay: 0, dur: 8 },
  { angle: -25, top: "55%", left: "60%", width: 400, delay: 3, dur: 10 },
  { angle: -40, top: "35%", left: "30%", width: 350, delay: 5, dur: 7 },
];

/* ── shape renderers ── */
const ShapeSVG = ({ type, size, color }: { type: string; size: number; color: string }) => {
  const stroke = `hsl(${color})`;
  switch (type) {
    case "ring":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,8 92,88 8,88" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.35" />
        </svg>
      );
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.35" />
        </svg>
      );
    case "cross":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <line x1="50" y1="10" x2="50" y2="90" stroke={stroke} strokeWidth="1.5" opacity="0.3" />
          <line x1="10" y1="50" x2="90" y2="50" stroke={stroke} strokeWidth="1.5" opacity="0.3" />
        </svg>
      );
    default:
      return null;
  }
};

/* ── animated word (letter-by-letter 3D reveal) ── */
const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, delay: 0.6 + i * 0.05, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
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
        className="inline-block transition-all duration-300 hover:text-primary hover:drop-shadow-[0_0_18px_hsl(var(--gradient-start)/0.8)]"
        style={{ transformOrigin: "bottom", cursor: "default" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
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

  /* parallax transforms for different layers */
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

  /* scroll-based parallax for the whole section */
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* ── VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-[0.12]"
          poster=""
        >
          <source
            src="https://cdn.pixabay.com/video/2024/02/12/200351-912082564_large.mp4"
            type="video/mp4"
          />
        </video>
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* ── NEON ORB LAYER (parallax layer 1) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ x: layer1X, y: layer1Y, translateY: scrollY * -0.15 }}
      >
        <div
          className="absolute w-[550px] h-[550px] rounded-full blur-[140px] opacity-25"
          style={{ background: "hsl(var(--gradient-start))", top: "5%", left: "5%" }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full blur-[130px] opacity-20"
          style={{ background: "hsl(var(--gradient-mid))", top: "45%", right: "0%" }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ background: "hsl(var(--gradient-end))", bottom: "5%", left: "25%" }}
        />
      </motion.div>

      {/* ── FLOATING GEOMETRIC SHAPES (parallax layer 2) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{ x: layer2X, y: layer2Y, translateY: scrollY * -0.08 }}
      >
        {shapes.map((s, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: s.x, top: s.y }}
            animate={{
              y: [0, -25, 10, -15, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          >
            <ShapeSVG type={s.type} size={s.size} color={s.color} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── LIGHT STREAKS (parallax layer 3) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{ x: layer3X, y: layer3Y }}
      >
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
            animate={{ x: [0, 800], opacity: [0, 0.7, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* ── PARTICLE DOTS ── */}
      <div className="absolute inset-0 pointer-events-none z-[4]">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `hsl(var(--gradient-${["start", "mid", "end"][i % 3]}) / 0.6)`,
            }}
            animate={{ opacity: [0, 1, 0], y: [0, -40, -80], scale: [0, 1.2, 0] }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* ── GRID OVERLAY ── */}
      <div
        className="absolute inset-0 z-[5] opacity-[0.025]"
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
          {/* primary CTA — pulsing glow */}
          <motion.a
            href="#work"
            className="group relative px-10 py-4 rounded-full font-display font-semibold text-primary-foreground overflow-hidden"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* pulsing glow ring behind */}
            <motion.span
              className="absolute inset-0 rounded-full gradient-bg opacity-100"
              animate={{ boxShadow: [
                "0 0 20px hsl(var(--gradient-start) / 0.3), 0 0 60px hsl(var(--gradient-mid) / 0.15)",
                "0 0 35px hsl(var(--gradient-start) / 0.5), 0 0 80px hsl(var(--gradient-mid) / 0.25)",
                "0 0 20px hsl(var(--gradient-start) / 0.3), 0 0 60px hsl(var(--gradient-mid) / 0.15)",
              ]}}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.a>

          {/* secondary CTA */}
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
