import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Award,
  Bot,
  ClipboardList,
  Facebook,
  GraduationCap,
  Instagram,
  Layout,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Palette,
  PenTool,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { Scene3D } from "./scene-3d";
import { usePageMotion } from "./use-motion";
import { cn } from "@/lib/cn";

const ENROLL = "https://forms.gle/z542PMjW5UxdXiDU6";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#course", label: "Course" },
  { href: "#contact", label: "Contact" },
];

const TOOLS = [
  ["PS", "Photoshop"],
  ["AI", "Illustrator"],
  ["ID", "InDesign"],
  ["CA", "Canva Pro"],
  ["FG", "Figma"],
  ["XD", "Adobe XD"],
  ["WP", "WordPress"],
  ["EL", "Elementor"],
  ["GA", "Analytics"],
  ["MB", "Meta Business"],
  ["GPT", "ChatGPT"],
  ["AF", "Firefly"],
  ["HC", "HTML / CSS"],
];

const SERVICES = [
  {
    n: "01",
    title: "Graphic & Brand Design",
    body: "Visual identities, social content, campaign artwork, presentations, brochures, company profiles and polished brand systems.",
    tags: ["Logo", "Canva", "Branding", "Print"],
  },
  {
    n: "02",
    title: "UI/UX & Product Design",
    body: "Responsive interfaces, dashboards, landing pages, mobile experiences, wireframes and design systems built for usability.",
    tags: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    n: "03",
    title: "Website Design",
    body: "Strategic sites on WordPress, Elementor, Divi and front-end stacks — structured for clarity, responsiveness and conversion.",
    tags: ["WordPress", "HTML/CSS", "Wix"],
  },
  {
    n: "04",
    title: "Digital Marketing",
    body: "Social strategy, campaigns, content direction, email, SEO/SEM and performance-minded communication that actually converts.",
    tags: ["SEO/SEM", "Social", "Email", "Analytics"],
  },
  {
    n: "05",
    title: "Software & AI Agents",
    body: "Chatbots, AI automation workflows and software support — intelligent systems woven into modern brand experiences.",
    tags: ["Chatbots", "Automation", "Software"],
  },
  {
    n: "06",
    title: "Online Teaching",
    body: "Structured Canva & Digital Marketing courses for beginners — practical skills, freelancing guidance and earning from home.",
    tags: ["Canva", "Marketing", "Freelancing"],
  },
];

const MARKETING = [
  ["SEO & SEM", 92],
  ["Social Media Strategy", 90],
  ["Content Marketing", 88],
  ["Email Marketing", 87],
  ["Analytics & Reporting", 85],
] as const;

const DESIGN = [
  ["Graphic Design (Canva/Adobe)", 94],
  ["Brand Identity", 91],
  ["UI/UX — Figma & Adobe XD", 88],
  ["Web Design (WordPress/Wix)", 85],
  ["AI Agents & Chatbots", 80],
  ["HTML / CSS", 78],
] as const;

const WORK = [
  {
    period: "Current · UAE Remote",
    role: "Digital Marketer & Graphic Designer",
    company: "The Vogue Interiors & Fitouts",
    points: [
      "SEO, SEM, social and email campaigns that grow brand reach",
      "Print and digital content: brochures, ads, social assets, banners",
      "Performance reporting with Google Analytics",
      "Responsive web pages aligned with brand and UI best practice",
    ],
  },
  {
    period: "Independent · Product",
    role: "Software & Product Builder",
    company: "Original products for teams",
    points: [
      "Built a team Task Tracker so owners and members can see what everyone is working on, add daily tasks, and keep the team moving every day",
      "Built a full company CRM to capture leads, mark them qualified or not, and run the complete pipeline a sales team needs",
      "Built Black Box Thinking — a company playbook where every department logs mistakes, errors and the learning gained so new people never repeat the same failures",
    ],
  },
  {
    period: "Independent",
    role: "UI/UX, Web & Brand Designer",
    company: "Freelance Projects",
    points: [
      "Brand systems, websites, landing pages, software interfaces and original team products",
      "Work across technology, wellness, interiors, services and education",
    ],
  },
  {
    period: "Previous · USA Remote",
    role: "CSR & Freelance Consultant",
    company: "Spiral Bridge Solutions",
    points: [
      "Multi-channel support with a 95% satisfaction rate",
      "Training materials that lifted team performance",
      "Consulting for small businesses on service improvement",
    ],
  },
  {
    period: "1 Year · Online",
    role: "Canva & Digital Marketing Tutor",
    company: "Independent Teaching",
    points: [
      "Structured online batches of five students",
      "Hands-on curriculum covering design, branding and social strategy",
      "Mentored students onto real freelance and business projects",
    ],
  },
];

const PROJECTS = [
  {
    tag: "SaaS · Teams",
    title: "Task Tracker",
    body: "Owners and team members track what everyone is doing, add everyday tasks, and keep the whole team working in one place.",
  },
  {
    tag: "SaaS · Sales",
    title: "Company CRM",
    body: "A complete CRM to capture leads, qualify them, and follow every stage of the pipeline — everything a company CRM should have.",
  },
  {
    tag: "SaaS · Learning",
    title: "Black Box Thinking",
    body: "Every department logs mistakes, errors and the learning they gained. New people read it as a playbook so the same mistakes are never repeated.",
  },
  { tag: "Brand · Website · Digital", title: "Makzora", body: "Luxury technology, automation and creative services brand." },
  { tag: "UI/UX · SaaS", title: "ClientPilot AI", body: "AI-powered CRM and meeting intelligence platform." },
  { tag: "Web · Brand Direction", title: "Sunora", body: "Premium wellness lighting digital experience." },
  { tag: "Branding · Campaigns · Web", title: "The Vogue Interiors Group", body: "Luxury interior design and fit-out communication." },
];

const EDU = [
  { icon: Award, title: "Digital Marketing Expert", sub: "Future Wise · UAE" },
  { icon: Palette, title: "Graphic Design & Freelancing", sub: "DigiSkills · Pakistan" },
  { icon: Layout, title: "UI/UX Design", sub: "Udemy" },
  { icon: Bot, title: "1 Million Prompters", sub: "Dubai · UAE" },
  { icon: GraduationCap, title: "Intermediate (HSC)", sub: "Allama Iqbal College" },
  { icon: GraduationCap, title: "Matriculation (SSC)", sub: "Alizium Public School" },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14.5 3c.4 2.6 1.8 4.4 4.5 4.8v2.4c-1.5 0-2.9-.5-4.1-1.3v6.6c0 3.4-2.7 6.1-6.2 6.1S2.5 18.9 2.5 15.5 5.2 9.4 8.7 9.4c.4 0 .8 0 1.2.1v2.6c-.4-.1-.8-.2-1.2-.2-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6V3h2.2Z" />
    </svg>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-pill border border-line bg-bg px-2.5 py-1 text-[11px] tracking-wide text-muted">
      {children}
    </span>
  );
}

function Stat({ target, suffix, label }: { target: number; suffix?: string; label: string }) {
  const [val, setVal] = useState(0);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, target]);

  return (
    <div
      ref={setNode}
      className="card-surface rounded-lg px-4 py-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-(--shadow-card)"
    >
      <div className="font-display text-3xl font-semibold tabular-nums text-purple">
        {val}
        {suffix}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-dim">{label}</div>
    </div>
  );
}

function SkillRow({ name, pct }: { name: string; pct: number }) {
  return (
    <div className="mb-5" data-skill={pct}>
      <div className="mb-1.5 flex justify-between text-sm">
        <span>{name}</span>
        <span className="font-medium text-purple">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-pill bg-bg">
        <div
          data-skill-bar
          className="h-full w-0 rounded-pill grad-bg"
        />
      </div>
    </div>
  );
}

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  usePageMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-bg text-fg">
      <Scene3D />
      <div className="orb top-[-80px] left-[-40px] h-72 w-72 bg-purple/25" />
      <div className="orb right-[-60px] top-40 h-80 w-80 bg-teal/20" style={{ animationDelay: "-4s" }} />
      <div className="orb bottom-20 left-1/3 h-64 w-64 bg-gold/15" style={{ animationDelay: "-7s" }} />

      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 transition duration-300 md:px-8",
          scrolled ? "border-b border-line bg-white/85 py-3 shadow-(--shadow-soft) backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <a href="#top" className="font-display text-lg text-charcoal">
          Memona <span className="grad-text">Aslam</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "text-xs font-medium uppercase tracking-[0.14em] text-muted transition hover:text-purple",
                  l.label === "Contact" &&
                    "shine btn-press rounded-pill grad-bg px-4 py-2.5 text-white tracking-normal normal-case hover:text-white",
                )}
              >
                {l.label === "Contact" ? "Let's Talk" : l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-md text-charcoal md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-[60px] z-40 border-b border-line bg-white/95 p-5 shadow-(--shadow-card) backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-md px-3 py-3 text-sm text-muted hover:bg-bg hover:text-purple"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main className="relative z-10" id="top">
        <header className="flex min-h-svh flex-col items-center justify-center px-5 pb-16 pt-28 text-center">
          <div className="hero-in hero-in-1 mb-7 inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-1.5 text-sm font-medium text-purple shadow-(--shadow-soft)">
            <span className="live-dot size-2 rounded-full bg-teal" />
            Available for remote work
          </div>
          <p className="hero-in hero-in-2 font-display text-xl text-muted md:text-2xl">Memona Aslam</p>
          <h1 className="hero-in hero-in-3 font-display text-[clamp(2.8rem,8vw,5.2rem)] font-medium leading-[1.08] text-charcoal">
            Creative
            <br />
            <em className="grad-text italic">thinking.</em>
            <br />
            Real impact.
          </h1>
          <p className="hero-in hero-in-4 mx-auto mt-6 max-w-xl text-base font-light text-muted md:text-lg">
            Multidisciplinary designer and digital strategist creating premium brands, intuitive digital
            experiences and marketing that moves businesses forward worldwide.
          </p>
          <div className="hero-in hero-in-5 mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-dim">
            <span>
              <strong className="font-medium text-fg">Based in</strong> Pakistan
            </span>
            <span>
              <strong className="font-medium text-fg">Working</strong> Worldwide
            </span>
            <span>
              <strong className="font-medium text-fg">Focus</strong> Design · Web · Marketing · AI
            </span>
          </div>
          <div className="hero-in hero-in-6 mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#contact"
              className="shine btn-press inline-flex min-h-12 items-center gap-2 rounded-pill grad-bg px-6 text-sm font-semibold text-white shadow-(--shadow-card)"
            >
              Get in touch <ArrowUpRight className="size-4" />
            </a>
            <a
              href={ENROLL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex min-h-12 items-center gap-2 rounded-pill border border-line bg-white px-6 text-sm font-semibold text-charcoal shadow-(--shadow-soft) hover:border-purple hover:text-purple"
            >
              Enrollment form <ClipboardList className="size-4" />
            </a>
          </div>
          <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            <Stat target={3} label="Years experience" />
            <Stat target={95} suffix="%" label="Satisfaction" />
            <Stat target={6} label="Certifications" />
            <Stat target={2} label="Countries served" />
          </div>
        </header>

        <section id="about" className="mx-auto max-w-6xl px-5 py-24">
          <div data-animate>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple">01 — About</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-tight text-charcoal">
              Design that looks refined and works with <em className="grad-text italic">purpose.</em>
            </h2>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div data-animate className="space-y-4 font-light text-muted">
              <p>
                Digital marketer and graphic designer with expertise in web design, UI/UX, and emerging
                skills in software development and AI agents. Creative vision meets data-driven thinking
                on every project.
              </p>
              <p>
                Remote experience with international clients in the UAE and USA. Also teaching Canva and
                digital marketing — online batches of five students, helping beginners build real skills
                and earn from home.
              </p>
              <p>
                Visual craft, business thinking and modern tools — work that is beautiful, usable and
                commercially meaningful.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: Target, t: "360° creative perspective", d: "Branding, digital, websites and marketing — consistent from first impression to conversion." },
                { icon: Sparkles, t: "Global remote experience", d: "Delivered for clients across UAE, USA and Pakistan with reliable collaboration." },
                { icon: GraduationCap, t: "Educator & mentor", d: "Teaching Canva and digital marketing online so beginners can earn from home." },
              ].map((h) => (
                <div
                  key={h.t}
                  data-animate
                  className="card-surface flex gap-4 rounded-lg p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-card)"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-md grad-soft text-purple">
                    <h.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{h.t}</h3>
                    <p className="mt-1 text-sm text-dim">{h.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-6xl px-5 py-24">
          <div data-animate>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple">02 — Services</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-tight text-charcoal">
              Creative capabilities built around modern <em className="grad-text italic">brands.</em>
            </h2>
            <p className="mt-4 max-w-lg font-light text-muted">
              From a single campaign to a complete digital identity — clarity, consistency and attention to
              detail.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.n}
                data-animate
                className="card-surface group relative overflow-hidden rounded-xl p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-(--shadow-elevated)"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 grad-bg transition duration-500 group-hover:scale-x-100" />
                <div className="font-display text-4xl font-semibold text-purple/20">{s.n}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm font-light text-muted">{s.body}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="overflow-hidden py-8">
          <div className="marquee flex w-max gap-3">
            {[...TOOLS, ...TOOLS].map(([k, v], i) => (
              <span
                key={`${k}-${i}`}
                className="card-surface inline-flex items-center gap-2 rounded-pill px-4 py-2 text-sm text-muted whitespace-nowrap"
              >
                <strong className="font-medium text-purple">{k}</strong> {v}
              </span>
            ))}
          </div>
        </div>

        <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
          <div data-animate>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple">03 — Skills</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium text-charcoal">
              Skills that deliver <em className="grad-text italic">results.</em>
            </h2>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div data-animate>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                Marketing & strategy
              </h3>
              {MARKETING.map(([n, p]) => (
                <SkillRow key={n} name={n} pct={p} />
              ))}
            </div>
            <div data-animate>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                Design & development
              </h3>
              {DESIGN.map(([n, p]) => (
                <SkillRow key={n} name={n} pct={p} />
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-5 py-24">
          <div data-animate>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple">04 — Experience</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium text-charcoal">
              Where I've made an <em className="grad-text italic">impact.</em>
            </h2>
          </div>
          <div className="relative mt-12 space-y-10 border-l-2 border-purple/20 pl-7">
            {WORK.map((w) => (
              <article key={w.role} data-animate className="relative">
                <span className="absolute -left-[37px] top-1.5 size-3 rounded-full border-[3px] border-bg bg-teal shadow-[0_0_0_4px_rgb(15_168_154/0.2)]" />
                <p className="text-xs font-medium tracking-wide text-purple">{w.period}</p>
                <h3 className="mt-1 text-lg font-semibold">{w.role}</h3>
                <p className="text-sm text-muted">{w.company}</p>
                <ul className="mt-3 space-y-1.5">
                  {w.points.map((p) => (
                    <li key={p} className="text-sm font-light text-dim">
                      — {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
          <div data-animate>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple">05 — Selected work</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-tight text-charcoal">
              Projects across design, software and digital <em className="grad-text italic">experiences.</em>
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                data-animate
                className="card-surface rounded-xl p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-(--shadow-elevated)"
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-teal">{p.tag}</p>
                <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 font-light text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="course" className="mx-auto max-w-6xl px-5 py-24">
          <div data-animate>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple">06 — Online course</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium text-charcoal">
              Canva + Digital Marketing <em className="grad-text italic">course</em>
            </h2>
            <p className="mt-4 max-w-lg font-light text-muted">
              A complete 2-month online course for beginners in Pakistan who want real skills and to earn
              from home.
            </p>
          </div>
          <div
            data-animate
            className="card-surface relative mt-10 overflow-hidden rounded-xl p-6 md:grid md:grid-cols-[1.3fr_1fr] md:gap-10 md:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-purple/10 blur-3xl" />
            <div>
              <span className="inline-block rounded-pill grad-bg px-3 py-1 text-xs font-bold tracking-wide text-white">
                Admissions open
              </span>
              <h3 className="font-display mt-4 text-3xl text-charcoal">
                Seekho. Banao. <em className="grad-text italic">Kamaao.</em>
              </h3>
              <p className="mt-3 font-light text-muted">
                From complete beginner to professional designer and digital marketer in 8 weeks. Canva,
                social media, content strategy, paid ads and freelancing — live on Zoom.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Canva Design", "Social Media", "Content Strategy", "Facebook Ads", "Freelancing", "Certificate"].map(
                  (t) => (
                    <Tag key={t}>{t}</Tag>
                  ),
                )}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ["Rs 5,000", "Per month"],
                  ["3", "Classes / week"],
                  ["2", "Months"],
                  ["Zoom", "Platform"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-md border border-line bg-bg p-4 text-center">
                    <div className="font-display text-xl text-purple">{v}</div>
                    <div className="text-xs text-dim">{l}</div>
                  </div>
                ))}
              </div>
              <a
                href={ENROLL}
                target="_blank"
                rel="noopener noreferrer"
                className="shine btn-press mt-6 inline-flex min-h-12 items-center gap-2 rounded-pill grad-bg px-6 text-sm font-semibold text-white"
              >
                Enrollment form <ArrowUpRight className="size-4" />
              </a>
            </div>
            <div className="mt-8 space-y-3 md:mt-0">
              {[
                ["Week 1–2", "Canva & Design Basics", "Canvas sizes · Fonts · Colours · First Instagram post"],
                ["Week 3–4", "Brand & Content Strategy", "Brand kit · Flyers · Content calendar · Hashtags"],
                ["Week 5–6", "Social Media & Paid Ads", "Instagram algorithm · Facebook · Boost · Reels"],
                ["Week 7–8", "Freelancing & Graduation", "Clients · Fiverr · Pricing · Portfolio · Certificate"],
              ].map(([w, t, d]) => (
                <div key={w} className="flex gap-3 rounded-md border border-line bg-bg p-3 transition hover:border-purple/30">
                  <span className="w-16 shrink-0 text-[11px] font-semibold text-teal">{w}</span>
                  <div>
                    <h4 className="text-sm font-semibold">{t}</h4>
                    <p className="text-xs text-dim">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="mx-auto max-w-6xl px-5 py-24">
          <div data-animate>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple">
              07 — Education & certifications
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium text-charcoal">
              Credentials that <em className="grad-text italic">matter.</em>
            </h2>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EDU.map((e) => (
              <article
                key={e.title}
                data-animate
                className="card-surface rounded-lg p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-(--shadow-card)"
              >
                <e.icon className="mx-auto mb-3 size-6 text-purple" />
                <h3 className="font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm text-dim">{e.sub}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-5 py-24 text-center">
          <div data-animate>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple">08 — Get in touch</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium text-charcoal">
              Let's build something <em className="grad-text italic">remarkable.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-light text-muted">
              Ready to elevate your brand, collaborate remotely, or join the course? Reach out or fill the
              enrollment form.
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "mailto:memonaaslam00@gmail.com", icon: Mail, t: "Email", d: "memonaaslam00@gmail.com" },
              { href: "https://www.instagram.com/makzoraai", icon: Instagram, t: "Instagram", d: "@makzoraai" },
              { href: "https://www.tiktok.com/@makzoraai", icon: TikTokIcon, t: "TikTok", d: "@makzoraai" },
              { href: "https://www.facebook.com/makzoraai", icon: Facebook, t: "Facebook", d: "@makzoraai" },
              { href: "https://www.linkedin.com/in/memona-aslam/", icon: Linkedin, t: "LinkedIn", d: "memona-aslam" },
              { href: undefined, icon: MapPin, t: "Location", d: "Pakistan · Remote worldwide" },
              { href: undefined, icon: PenTool, t: "Languages", d: "English · Urdu" },
              { href: ENROLL, icon: ClipboardList, t: "Enrollment form", d: "Apply for the course" },
            ].map((c) => {
              const inner = (
                <>
                  <c.icon className="mx-auto mb-2 size-5 text-purple" />
                  <h3 className="text-sm font-semibold">{c.t}</h3>
                  <p className="mt-1 text-sm text-dim">{c.d}</p>
                </>
              );
              const cls =
                "card-surface block rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:shadow-(--shadow-card)";
              return c.href ? (
                <a
                  key={c.t}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={cls}
                  data-animate
                >
                  {inner}
                </a>
              ) : (
                <div key={c.t} className={cls} data-animate>
                  {inner}
                </div>
              );
            })}
          </div>
          <a
            href={ENROLL}
            target="_blank"
            rel="noopener noreferrer"
            className="shine btn-press mt-10 inline-flex min-h-12 items-center gap-2 rounded-pill grad-bg px-7 text-sm font-semibold text-white"
            data-animate
          >
            Enrollment form <ArrowUpRight className="size-4" />
          </a>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line bg-white px-5 py-8 text-center text-sm text-dim">
        <p>
          © {new Date().getFullYear()} Memona Aslam. Designed with intention.{" "}
          <a href="mailto:memonaaslam00@gmail.com" className="text-purple hover:underline">
            Get in touch
          </a>
        </p>
      </footer>
    </div>
  );
}
