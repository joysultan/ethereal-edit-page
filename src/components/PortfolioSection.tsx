import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, ExternalLink } from "lucide-react";

const thumbnails = [
  { title: "Gaming Thumbnail", category: "YouTube" },
  { title: "Tech Review", category: "YouTube" },
  { title: "Podcast Cover", category: "Podcast" },
  { title: "Vlog Thumbnail", category: "YouTube" },
  { title: "Music Video", category: "Music" },
  { title: "Tutorial Series", category: "Education" },
];

const videoEdits = [
  { title: "Brand Commercial", duration: "0:30" },
  { title: "Music Video Edit", duration: "3:45" },
  { title: "Product Launch", duration: "1:20" },
  { title: "Social Media Reel", duration: "0:15" },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);

  return (
    <section id="work" className="py-32 px-4 relative">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-10 blur-[150px]" style={{ background: "hsl(var(--gradient-start))" }} />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Thumbnails and video edits that drive engagement
          </p>
        </motion.div>

        {/* Thumbnail showcase - Staggered grid */}
        <div className="mb-20">
          <h3 className="font-display text-2xl font-semibold mb-8 gradient-text">Thumbnail Design</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {thumbnails.map((thumb, i) => (
              <motion.div
                key={thumb.title}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, rotate: 1, zIndex: 10 }}
                onHoverStart={() => setHoveredThumb(i)}
                onHoverEnd={() => setHoveredThumb(null)}
                className="relative aspect-video glass-card overflow-hidden rounded-xl cursor-pointer group"
              >
                <div className="absolute inset-0 gradient-bg opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-display font-semibold text-foreground">{thumb.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{thumb.category}</p>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredThumb === i ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video editing showcase - Horizontal scroll cards */}
        <div>
          <h3 className="font-display text-2xl font-semibold mb-8 gradient-text">Video Editing</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {videoEdits.map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-video glass-card gradient-border overflow-hidden rounded-xl cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-background" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center gradient-glow"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <p className="font-display font-semibold text-foreground">{video.title}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-background/60 px-2 py-1 rounded-full backdrop-blur-sm">
                    {video.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
