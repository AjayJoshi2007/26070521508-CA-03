"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechFlow Inc",
    content: "The AI automation transformed our operations completely. We reduced processing time by 70% and our team can now focus on strategic initiatives instead of repetitive tasks.",
    rating: 5,
    accent: "from-teal-800 to-teal-950",
  },
  {
    name: "Michael Rodriguez",
    role: "Operations Director, ScaleUp",
    content: "Implementing their AI solutions was seamless. The team understood our unique challenges and delivered a system that exceeded our expectations. Game changer for our business.",
    rating: 5,
    accent: "from-cyan-800 to-cyan-950",
  },
  {
    name: "Emily Watson",
    role: "Founder, DataDriven Co",
    content: "We were skeptical at first, but the results speak for themselves. Customer response times dropped from hours to minutes, and satisfaction scores are at an all-time high.",
    rating: 5,
    accent: "from-teal-900 to-teal-950",
  },
  {
    name: "James Park",
    role: "VP Engineering, Innovate Labs",
    content: "The best investment we made this year. Their AI platform integrates perfectly with our existing stack and the ROI was visible within the first month.",
    rating: 5,
    accent: "from-cyan-700 to-cyan-900",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Global Background Handles Blobs */}

      <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.14 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, rotate: 8 }}
            whileInView={{ opacity: 1, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.02, duration: 0.12 }}
            className="inline-block rotate-3 bg-secondary px-4 py-2 shadow-lg text-sm font-bold text-white mb-6 transform hover:rotate-0 transition-transform cursor-default"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
          >
            What Our Clients Say
          </motion.div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_90%] min-w-0 px-3 sm:flex-[0_0_45%] lg:flex-[0_0_33.333%]"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.14, delay: index * 0.03 }}
                    className={`relative h-full p-6 sm:p-8 transition-all duration-300 clay-card ${selectedIndex === index ? "scale-100 opacity-100" : "scale-[0.95] opacity-60"
                      }`}
                  >
                    <div className={`absolute top-0 left-6 h-1.5 w-20 rounded-full bg-gradient-to-r ${testimonial.accent}`} />

                    <div className="flex items-start justify-between mb-4">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-foreground shadow-lg`}>
                        <Quote size={20} className="text-background" />
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-foreground text-foreground" />
                        ))}
                      </div>
                    </div>

                    <p className="text-foreground/70 leading-relaxed mb-6 text-sm sm:text-base font-medium">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-foreground/10">
                      <div className={`h-10 w-10 rounded-full bg-foreground flex items-center justify-center text-background font-bold text-sm`}>
                        {testimonial.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                        <p className="text-xs text-foreground/40">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background border border-foreground/10 shadow-md transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50"
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${selectedIndex === index
                    ? "w-8 bg-foreground"
                    : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background border border-foreground/10 shadow-md transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50"
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
