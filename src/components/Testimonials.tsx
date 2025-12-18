import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "أحمد مصطفى",
    role: "صاحب مشروع",
    text: "خدمة ممتازة جدًا، التصميم احترافي والتعامل كان سلس وسريع.",
    rating: 5,
  },
  {
    name: "سارة علي",
    role: "صانعة محتوى",
    text: "فهم سريع للمطلوب وتنفيذ دقيق. تجربة رائعة وأنصح بالتعامل.",
    rating: 5,
  },
  {
    name: "محمد طارق",
    role: "مصور فوتوغرافي",
    text: "شغل نظيف واهتمام بأدق التفاصيل. تجربة ممتازة.",
    rating: 4,
  },
  {
    name: "نور حسن",
    role: "مصممة",
    text: "إبداع وسرعة في التنفيذ واحترافية عالية.",
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Cards animation
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      const diff = i - index;

      if (diff === 0) {
        gsap.to(card, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 10,
          duration: 1,
          ease: "power3.out",
        });
      } else if (diff === -1 || diff === testimonials.length - 1) {
        gsap.to(card, {
          x: "-200px",
          y: 40,
          scale: 0.8,
          opacity: 0.35,
          filter: "blur(20px)",
          zIndex: 5,
          duration: 1,
        });
      } else if (diff === 1 || diff === -(testimonials.length - 1)) {
        gsap.to(card, {
          x: "200px",
          y: 40,
          scale: 0.8,
          opacity: 0.35,
          filter: "blur(20px)",
          zIndex: 5,
          duration: 1,
        });
      } else {
        gsap.to(card, {
          y: 120,
          scale: 0.6,
          opacity: 0,
          filter: "blur(30px)",
          zIndex: 1,
          duration: 1,
        });
      }
    });
  }, [index]);

  // Section fade-in
  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-gradient-to-b from-[#0a0e17] to-slate-900/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          آراء{" "}
          <span className="GraphicSchool text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            عملائنا
          </span>
        </h2>
        <p className="text-gray-300 text-xl">
          تجارب حقيقية من عملاء سعداء
        </p>
      </div>

      {/* Slider */}
      <div className="relative h-[300px] flex items-center justify-center">
        {testimonials.map((t, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="absolute w-full max-w-xl bg-slate-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex justify-center mb-4 gap-1">
              {[...Array(5)].map((_, s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s < t.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              “{t.text}”
            </p>

            <h3 className="text-xl font-bold text-white">{t.name}</h3>
            <p className="text-gray-400 text-sm">{t.role}</p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === index
                ? "bg-emerald-400 scale-125"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
