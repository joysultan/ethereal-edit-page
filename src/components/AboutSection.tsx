import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[150px]" style={{ background: "hsl(var(--gradient-start))" }} />

      <div ref={ref} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden gradient-border">
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto rounded-full gradient-bg opacity-50 animate-float" />
                <p className="mt-6 text-muted-foreground text-sm">Profile Photo</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 gradient-bg rounded-full mb-8" />

          <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-body">
            I'm a passionate graphic designer and video editor with over 5 years of experience
            crafting compelling visuals that captivate audiences. From eye-catching thumbnails
            to fluid motion graphics, I bring ideas to life with precision and creativity.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-body">
            My mission is to help brands stand out in the digital space through
            stunning design and cinematic editing that leaves a lasting impression.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "500+", label: "Projects" },
              { num: "120+", label: "Clients" },
              { num: "5+", label: "Years" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-card gradient-border p-4 text-center"
              >
                <div className="font-display text-2xl font-bold gradient-text">{stat.num}</div>
                <div className="text-muted-foreground text-sm font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
