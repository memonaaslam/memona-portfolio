import { useEffect } from "react";

export function usePageMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let killed = false;
    const timers: number[] = [];

    void import("gsap").then(async ({ default: gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (killed) return;
      gsap.registerPlugin(ScrollTrigger);

      const els = gsap.utils.toArray<HTMLElement>("[data-animate]");
      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0.15, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.85,
            delay: (i % 6) * 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
        timers.push(
          window.setTimeout(() => {
            gsap.set(el, { clearProps: "all" });
          }, 2800),
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-skill]").forEach((el) => {
        const bar = el.querySelector<HTMLElement>("[data-skill-bar]");
        const pct = Number(el.dataset.skill || 0);
        if (!bar) return;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${pct}%`,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    });

    return () => {
      killed = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);
}
