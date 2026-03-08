import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Video, Layers, Sparkles } from "lucide-react";

const services = [
  { icon: Palette, title: "Graphic Design", desc: "Brand identities, logos, and visual systems that make your brand unforgettable." },
  { icon: Video, title: "Video Editing", desc: "Cinematic edits, color grading, and seamless transitions for impactful storytelling." },
  { icon: Layers, title: "Motion Graphics", desc: "Dynamic animations and visual effects that bring static designs to life." },
  { icon: Sparkles, title: "Social Media Design", desc: "Scroll-stopping content designed to boost engagement and grow your audience." },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 px-4 relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[150px]" style={{ background: "hsl(var(--gradient-mid))" }} />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Comprehensive creative solutions tailored to elevate your brand
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card gradient-border p-8 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:gradient-glow transition-shadow">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
