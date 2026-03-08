import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const categories = [
  { name: "Motion Graphics", items: ["Logo Animations", "Intro/Outro", "Kinetic Typography", "Product Showcase"] },
  { name: "Mockup Design", items: ["Product Mockups", "App Mockups", "Branding Mockups", "Packaging Design"] },
  { name: "Banner & Cover", items: ["YouTube Banners", "Facebook Covers", "LinkedIn Banners", "Web Banners"] },
  { name: "Social Media", items: ["Instagram Posts", "Story Templates", "Carousel Designs", "Ad Creatives"] },
];

const CategorySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  return (
    <section id="categories" className="py-32 px-4 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[150px]" style={{ background: "hsl(var(--gradient-end))" }} />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Design <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Explore the different areas of my creative expertise
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-full font-display font-medium text-sm transition-all ${
                active === i
                  ? "gradient-bg text-primary-foreground gradient-glow"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Content grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {categories[active].items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="aspect-square glass-card gradient-border flex items-center justify-center p-6 cursor-pointer group"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-muted mb-4 flex items-center justify-center group-hover:gradient-bg transition-colors duration-300">
                  <span className="text-2xl font-display font-bold gradient-text group-hover:text-primary-foreground">
                    {item.charAt(0)}
                  </span>
                </div>
                <p className="font-display text-sm font-medium text-foreground">{item}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
