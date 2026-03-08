import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, Search, Lightbulb, PenTool, Layers, Send } from "lucide-react";

const steps = [
  { icon: Search, title: "Discovery", desc: "Understanding your brand, audience, and goals through in-depth research." },
  { icon: Lightbulb, title: "Concept", desc: "Brainstorming creative concepts and developing initial mood boards." },
  { icon: PenTool, title: "Design", desc: "Crafting detailed designs with meticulous attention to every pixel." },
  { icon: Layers, title: "Refine", desc: "Iterating based on feedback until the design is pixel-perfect." },
  { icon: Send, title: "Deliver", desc: "Final delivery with all assets, formats, and source files included." },
];

const faqs = [
  { q: "What's your typical turnaround time?", a: "Most projects are completed within 3-7 business days depending on complexity. Rush orders are available for an additional fee." },
  { q: "What file formats do you deliver?", a: "I deliver in all standard formats including PSD, AI, PNG, JPG, SVG, MP4, MOV, and more based on your project needs." },
  { q: "How many revisions are included?", a: "All packages include 2-3 rounds of revisions. Additional revisions can be arranged at a minimal cost." },
  { q: "Do you offer package deals?", a: "Yes! I offer bundled packages for ongoing content creation, including thumbnails, social media designs, and video editing." },
  { q: "What's the best way to get started?", a: "Simply reach out through the contact form or DM me on social media. I'll schedule a free consultation to discuss your project." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-32 px-4 relative">
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[150px]" style={{ background: "hsl(var(--gradient-end))" }} />

      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Design & Edit <span className="gradient-text">Process</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            A streamlined workflow designed for quality and efficiency
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="relative mb-24">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px gradient-bg hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                className={`flex items-center gap-8 md:gap-16 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground font-body">{step.desc}</p>
                </div>

                <div className="relative z-10 w-14 h-14 rounded-full gradient-bg flex items-center justify-center gradient-glow flex-shrink-0">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
          <h3 className="font-display text-2xl font-semibold text-center mb-8 gradient-text">Frequently Asked Questions</h3>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="glass-card gradient-border overflow-hidden"
                initial={false}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display font-medium text-foreground">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted-foreground font-body leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
