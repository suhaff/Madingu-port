import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import emailjs from "@emailjs/browser";

import Background from "./components/Background";
import profile from "./assets/profile.jpg";

import "./App.css";

type IconName =
  | "arrow"
  | "mail"
  | "github"
  | "linkedin"
  | "download"
  | "spark"
  | "code"
  | "brain"
  | "layers"
  | "send"
  | "check"
  | "external"
  | "menu"
  | "x";

const Icon = ({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),

    github: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4c.1-1-.1-2-.5-3 0 0-1.2-.4-3.9 1.5a13.5 13.5 0 0 0-7 0C5.2.6 4 1 4 1a7.2 7.2 0 0 0-.5 3 5.4 5.4 0 0 0-1.5 4.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
        <path d="M8 19c-3 .9-3-1.4-4.2-1.8" />
      </>
    ),

    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),

    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),

    spark: (
      <>
        <path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z" />
        <path d="m19 14-.6 2.4L16 17l2.4.6L19 20l.6-2.4L22 17l-2.4-.6L19 14Z" />
      </>
    ),

    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </>
    ),

    brain: (
      <>
        <path d="M9.5 4A3.5 3.5 0 0 0 6 7.5c0 .5.1 1 .3 1.4A3.5 3.5 0 0 0 7 15.7V18a3 3 0 0 0 3 3h2V4H9.5Z" />
        <path d="M14.5 4A3.5 3.5 0 0 1 18 7.5c0 .5-.1 1-.3 1.4a3.5 3.5 0 0 1-.7 6.8V18a3 3 0 0 1-3 3h-2V4h2.5Z" />
        <path d="M6 11h3M15 11h3M7 7h2M15 7h2M7 16h2M15 16h2" />
      </>
    ),

    layers: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </>
    ),

    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,

    external: (
      <>
        <path d="M14 3h7v7" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </>
    ),

    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),

    x: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
};

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["achievements", "Achievements"],
  ["projects", "Projects"],
  ["reviews", "Reviews"],
  ["hire", "Hire Me"],
  ["resume", "Resume"],
  ["contact", "Contact"],
] as const;

const projects = [
  {
    number: "01",
    title: "Continual Anomaly Detection",
    category: "Computer Vision / Research",
    description:
      "A continual-learning framework for industrial anomaly detection using transformer-based visual representations and nearest-embedding methods on MVTec AD.",
    stack: ["PyTorch", "ViT", "DNE", "MVTec"],
    accent: "pink",
  },
  {
    number: "02",
    title: "Real-Time Sentiment API",
    category: "NLP / Backend",
    description:
      "A real-time sentiment analysis service designed around clean API architecture, inference and fallback dataset strategies.",
    stack: ["Python", "FastAPI", "NLP", "REST"],
    accent: "violet",
  },
  {
    number: "03",
    title: "AI Resume Matching",
    category: "Full Stack / AI",
    description:
      "A job-board platform focused on connecting candidates with suitable opportunities through structured resume and job information.",
    stack: ["Next.js", "Django", "SQL", "React"],
    accent: "cyan",
  },
  {
    number: "04",
    title: "Arena — 2D Tactical Shooter",
    category: "Game Development",
    description:
      "A fast-paced 2D tactical shooter prototype inspired by competitive mobile action games.",
    stack: ["Unity", "C#", "Game Dev"],
    accent: "orange",
  },
];

const skills = [
  { name: "Python", value: 92 },
  { name: "Machine Learning", value: 90 },
  { name: "Computer Vision", value: 88 },
  { name: "React / TypeScript", value: 84 },
  { name: "PyTorch", value: 86 },
  { name: "Backend / APIs", value: 82 },
];

const highlights = [
  {
    title: "Research-driven engineering",
    text: "Building complete experimental systems instead of isolated model demos.",
    icon: "brain" as IconName,
  },
  {
    title: "Full-stack range",
    text: "Moving between model training, APIs and polished interactive interfaces.",
    icon: "layers" as IconName,
  },
  {
    title: "Project-first mindset",
    text: "Turning ideas into tangible software with measurable behavior.",
    icon: "code" as IconName,
  },
  {
    title: "Continuous learning",
    text: "Exploring new architectures, tools and workflows through implementation.",
    icon: "spark" as IconName,
  },
];

function MagneticButton({
  children,
  href,
  secondary = false,
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
}) {
  return (
    <a href={href}>
      <motion.span
        className={`magnetic-button ${secondary ? "secondary" : ""}`}
        whileHover={{ y: -3, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.span>
    </a>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 160,
    damping: 18,
  });

  const springY = useSpring(y, {
    stiffness: 160,
    damping: 18,
  });

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  return (
    <motion.div
      className={`tilt-card ${className}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        x.set((event.clientX - rect.left) / rect.width - 0.5);
        y.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const form = useRef<HTMLFormElement>(null);

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.current || isSending) return;

    setIsSending(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        "service_vd6x4w5",
        "template_w61eawe",
        form.current,
        {
          publicKey: "StWST4-3BSlTTmjIo",
        }
      );

      form.current.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <Background />

      {/* NAVIGATION */}
      <header className="nav-wrap">
        <nav className="nav">
          <a className="brand" href="#home" onClick={closeMenu}>
            <span className="brand-mark">IG</span>

            <span>
              Ibtism<span className="accent">.</span>
            </span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={closeMenu}>
                {label}
              </a>
            ))}

            <a className="nav-cta" href="#contact" onClick={closeMenu}>
              Let's talk
              <Icon name="arrow" size={15} />
            </a>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-grid" />

          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />

          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="eyebrow">
              <span className="status-dot" />
              Available for selected projects
            </div>

            <h1>
              Building <span>intelligent</span>
              <br />
              digital experiences.
            </h1>

            <p className="hero-lead">
              AI/ML engineer and full-stack developer crafting
              research-driven systems, thoughtful interfaces and products
              that actually work.
            </p>

            <div className="hero-actions">
              <MagneticButton href="#projects">
                Explore my work
                <Icon name="arrow" size={18} />
              </MagneticButton>

              <MagneticButton href="#contact" secondary>
                Start a conversation
                <Icon name="mail" size={18} />
              </MagneticButton>
            </div>

            <div className="hero-meta">
              <span>
                <strong>AI / ML</strong> · Computer Vision · Full Stack
              </span>

              <span className="meta-line" />

              <span>Research → Product</span>
            </div>
          </motion.div>

          {/* FUTURISTIC PROFILE */}
          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.15 }}
          >
            <div className="portrait-halo" />

            <div className="portrait-frame">
              <img src={profile} alt="Ibtism Gul" />

              <div className="portrait-scan" />

              <div className="portrait-label">
                <span>IBTISM GUL</span>
                <small>AI / SOFTWARE ENGINEER</small>
              </div>
            </div>

            <div className="floating-chip chip-one">PYTORCH</div>
            <div className="floating-chip chip-two">REACT</div>
            <div className="floating-chip chip-three">VISION</div>
          </motion.div>

          <a className="scroll-cue" href="#about">
            <span>Scroll to explore</span>
            <span className="scroll-line" />
          </a>
        </section>

        {/* ABOUT */}
        <section id="about" className="section section-about">
          <div className="section-heading">
            <span>01 / About</span>

            <h2>
              A builder between
              <br />
              <em>research and reality.</em>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p className="lead-paragraph">
                I’m Ibtism Gul — an AI/ML-focused software engineer who enjoys
                taking complex technical ideas and turning them into clear,
                usable products.
              </p>

              <p>
                My work spans computer vision, continual learning, NLP, APIs
                and interactive web applications.
              </p>

              <p>
                I care about both sides of a system: the intelligence behind
                it and the experience around it.
              </p>

              <div className="signature-row">
                <span className="signature">IG</span>

                <span>
                  Curious by default. <strong>Precise by choice.</strong>
                </span>
              </div>
            </div>

            <div className="skills-panel">
              {skills.map((skill, index) => (
                <div className="skill-row" key={skill.name}>
                  <div className="skill-head">
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>

                  <div className="skill-track">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: index * 0.08,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <div className="section-heading compact">
            <span>02 / Experience</span>
            <h2>The journey so far.</h2>
          </div>

          <div className="timeline">
            {[
              [
                "01",
                "AI / ML Engineering",
                "Research & project work",
                "Designing and implementing computer-vision, continual-learning and NLP systems from experiments through usable APIs.",
              ],
              [
                "02",
                "Full-Stack Development",
                "Product engineering",
                "Building responsive interfaces and backend-connected applications with React, TypeScript, Python and modern web tooling.",
              ],
              [
                "03",
                "Game & Interactive Development",
                "Unity / C#",
                "Exploring interaction, game mechanics and real-time systems through hands-on 2D game development.",
              ],
            ].map(([num, title, period, text], index) => (
              <motion.div
                className="timeline-item"
                key={num}
                initial={{
                  opacity: 0,
                  x: index % 2 ? 25 : -25,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
              >
                <div className="timeline-num">{num}</div>

                <div className="timeline-body">
                  <span className="mini-label">{period}</span>

                  <h3>{title}</h3>

                  <p>{text}</p>
                </div>

                <Icon name="arrow" size={18} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="section education-section">
          <div className="section-heading compact">
            <span>03 / Education</span>
            <h2>Learning with intention.</h2>
          </div>

          <div className="education-grid">
            <TiltCard>
              <div className="edu-year">2024 — 2027</div>

              <span className="mini-label">Undergraduate</span>

              <h3>Bachelor of Computer Science</h3>

              <p>Software Engineering</p>

              <div className="edu-footer">
                Universiti Sains Malaysia · USM
              </div>
            </TiltCard>

            <TiltCard>
              <div className="edu-year">2023 — 2024</div>

              <span className="mini-label">Undergraduate</span>

              <h3>B.Tech / Computer Science</h3>

              <p>Data Science</p>

              <div className="edu-footer">Amity University Noida</div>
            </TiltCard>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="section">
          <div className="section-heading compact">
            <span>04 / Achievements</span>
            <h2>Highlights, not hype.</h2>
          </div>

          <div className="highlight-grid">
            {highlights.map((item, index) => (
              <motion.div
                className="highlight-card"
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <div className="icon-box">
                  <Icon name={item.icon} />
                </div>

                <span>0{index + 1}</span>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section projects-section">
          <div className="section-heading">
            <span>05 / Selected work</span>

            <h2>
              Projects that made
              <br />
              <em>the ideas tangible.</em>
            </h2>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <motion.article
                className={`project-card ${project.accent}`}
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -8,
                }}
              >
                <div className="project-top">
                  <span>{project.number}</span>

                  <Icon name="external" size={17} />
                </div>

                <div className="project-content">
                  <span className="mini-label">
                    {project.category}
                  </span>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>
                </div>

                <div className="tag-row">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="section reviews-section">
          <div className="section-heading compact">
            <span>06 / Reviews</span>

            <h2>
              What people can say
              <br />
              after we build together.
            </h2>
          </div>

          <div className="review-grid">
            {[
              "Project collaboration",
              "Technical work",
              "Working together",
            ].map((title, index) => (
              <TiltCard className="review-card" key={title}>
                <div className="stars">★★★★★</div>

                <p>
                  “Real testimonials will go here once clients,
                  collaborators or teammates provide verified feedback.”
                </p>

                <div className="review-author">
                  <span>0{index + 1}</span>

                  <div>
                    <strong>{title}</strong>
                    <small>Verified testimonial slot</small>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* HIRE ME */}
        <section id="hire" className="section hire-section">
          <div className="hire-shell">
            <div className="hire-copy">
              <span className="eyebrow">07 / Hire me</span>

              <h2>
                Have a difficult problem?
                <br />
                <span>Good. I like those.</span>
              </h2>

              <p>
                Choose the kind of work you need and let’s turn the brief
                into a concrete plan.
              </p>
            </div>

            <div className="hire-cards">
              {[
                [
                  "AI / ML",
                  "Models, experiments, computer vision & NLP.",
                  "brain",
                ],
                [
                  "Full Stack",
                  "Web apps, APIs, dashboards & integrations.",
                  "layers",
                ],
                [
                  "Prototype",
                  "Turn an idea into a working technical MVP.",
                  "spark",
                ],
              ].map(([title, text, icon]) => (
                <a className="hire-card" href="#contact" key={title}>
                  <div className="icon-box">
                    <Icon name={icon as IconName} />
                  </div>

                  <h3>{title}</h3>

                  <p>{text}</p>

                  <span>
                    Discuss a project
                    <Icon name="arrow" size={15} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* RESUME */}
        <section id="resume" className="section resume-section">
          <div className="resume-shell">
            <div>
              <span className="mini-label">08 / Resume</span>

              <h2>
                A concise view of
                <br />
                the whole picture.
              </h2>

              <p>
                Use the printable resume below or save it as a PDF from your
                browser.
              </p>
            </div>

            <a className="magnetic-button" href="#resume-card">
              <Icon name="download" size={18} />
              Open resume
            </a>
          </div>

          <div id="resume-card" className="resume-card">
            <div className="resume-header">
              <div>
                <span className="mini-label">
                  CURRICULUM VITAE
                </span>

                <h3>Ibtism Gul</h3>

                <p>AI / ML Engineer · Software Developer</p>
              </div>

              <div className="resume-links">
                <a href="#contact">
                  <Icon name="mail" size={15} />
                  Contact
                </a>

                <a href="#projects">
                  <Icon name="code" size={15} />
                  Portfolio
                </a>
              </div>
            </div>

            <div className="resume-columns">
              <div>
                <h4>Profile</h4>

                <p>
                  AI/ML-focused software engineer building
                  research-driven systems and end-to-end digital products
                  across computer vision, NLP, APIs and interactive web
                  applications.
                </p>

                <h4>Core skills</h4>

                <p>
                  Python · PyTorch · Computer Vision · Machine Learning ·
                  React · TypeScript · Next.js · Node.js · SQL · MongoDB ·
                  Unity · C#
                </p>
              </div>

              <div>
                <h4>Education</h4>

                <p>
                  <strong>Universiti Sains Malaysia</strong>
                  <br />
                  B.Comp. Science — Software Engineering
                  <br />
                  2024 — 2027
                </p>

                <p>
                  <strong>Amity University Noida</strong>
                  <br />
                  B.Tech — Data Science
                  <br />
                  2023 — 2024
                </p>
              </div>

              <div>
                <h4>Selected projects</h4>

                <p>
                  Continual Anomaly Detection · Sentiment API · AI Resume
                  Matching · Arena 2D Tactical Shooter
                </p>

                <h4>Focus</h4>

                <p>Research → Engineering → Product</p>
              </div>
            </div>

            <button
              className="print-button"
              onClick={() => window.print()}
            >
              <Icon name="download" size={16} />
              Print / Save as PDF
            </button>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">09 / Contact</span>

              <h2>
                Let’s make something
                <br />
                <span>worth shipping.</span>
              </h2>

              <p>
                Tell me what you’re building, what’s blocked, or what you want
                to explore. I’ll get back to you through email.
              </p>

              <div className="contact-direct">
                <a href="#contact">
                  <Icon name="mail" />
                  Use the contact form below
                </a>

                <div className="social-row">
                  <a
                    href="https://github.com/suhaff"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="github" />
                  </a>

                  <a href="#resume">
                    <Icon name="download" />
                  </a>
                </div>
              </div>
            </div>

            <form
              ref={form}
              onSubmit={sendEmail}
              className="contact-form"
            >
              <div className="form-row">
                <label>
                  <span>Name</span>

                  <input
                    name="user_name"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  <span>Email</span>

                  <input
                    type="email"
                    name="user_email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <label>
                <span>What are you building?</span>

                <input
                  name="subject"
                  placeholder="Project, collaboration, freelance..."
                  required
                />
              </label>

              <label>
                <span>Message</span>

                <textarea
                  name="message"
                  placeholder="Give me the context, goals and anything you already know..."
                  rows={7}
                  required
                />
              </label>

              <div className="form-bottom">
                <small>
                  By sending this form, you’re starting a direct
                  conversation.
                </small>

                <button
                  className="submit-button"
                  type="submit"
                  disabled={isSending}
                >
                  {isSending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send message
                      <Icon name="send" size={17} />
                    </>
                  )}
                </button>
              </div>

              {status === "success" && (
                <div className="form-status success">
                  <Icon name="check" size={17} />
                  Message sent successfully.
                </div>
              )}

              {status === "error" && (
                <div className="form-status error">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">IG</span>

          <span>
            Ibtism<span className="accent">.</span>
          </span>
        </a>

        <span>
        © 2026 Suhaffinity — All rights reserved.
        </span>

        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}

export default App;