import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Content Creator",
    text: "Absolutely blown away by the quality! The thumbnails increased my click-through rate by 40%. Best designer I've worked with.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    text: "The motion graphics were exactly what our brand needed. Professional, creative, and delivered ahead of schedule.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "YouTuber • 2M Subs",
    text: "My channel's visual identity was transformed. The editing style is cinematic and the thumbnails are click magnets!",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-4 relative">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[150px]" style={{ background: "hsl(var(--gradient-mid))" }} />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            What my clients say about working with me
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, type: "spring" }}
              whileHover={{ y: -8 }}
              className="glass-card gradient-border p-8 relative"
            >
              <Quote className="w-8 h-8 text-primary/30 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 font-body leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
