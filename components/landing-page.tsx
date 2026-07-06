"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FlowingMenu } from "./flowing-menu";
import { CinematicFooter } from "./ui/motion-footer";
import MagicBento from "./ui/magic-bento";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    label: "Detect",
    title: "Operational footsteps in the dust.",
    body: "We track the physical realities of growth before they hit standard databases. A permit filed for a high-tension power line, an environmental clearance for raw materials, or cargo movement spikes.",
    signal: "Environmental clearance filed",
    meta: "17.4629° N · 78.3071° E",
  },
  {
    number: "02",
    label: "Translate",
    title: "From noise to structural intent.",
    body: "Raw data isn't a lead. Udyog Radar translates operational events into capacity shifts. We calculate exactly how many tons of cement, steel, or megawatts of gas a new plant will require.",
    signal: "Expansion intent confirmed",
    meta: "4 independent sources correlated",
  },
  {
    number: "03",
    label: "Synchronize",
    title: "Your catalog, mapped to their need.",
    body: "Our models match the account's operational intent directly to your product catalog. Your reps don't pitch generic packages; they present precise, volume-matched quotes.",
    signal: "High-viscosity lubricant",
    meta: "91% product-fit confidence",
  },
  {
    number: "04",
    label: "Activate",
    title: "Strike four days before the gate closes.",
    body: "We deliver decision-ready dossiers with verified stakeholder contacts. Your sales officer steps into the boardroom with exact technical context while competitors are still waiting for a RFP.",
    signal: "Lead routed to West region",
    meta: "Delivered 08:42 · 4 days early",
  },
];

const industries = ["Fuels & Lubricants", "Cement", "Steel", "Chemicals", "Industrial Gas"];

const flowingMenuSectors = [
  { link: "#industries", text: "Fuels & Lubricants", image: "/images/fuels_lubricants.png" },
  { link: "#industries", text: "Cement", image: "/images/cement.png" },
  { link: "#industries", text: "Steel", image: "/images/steel.png" },
  { link: "#industries", text: "Chemicals", image: "/images/chemicals.png" },
  { link: "#industries", text: "Industrial Gas", image: "/images/industrial_gas.png" },
];

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <i />
    </span>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={diagonal ? "arrow arrow-diagonal" : "arrow"}
    >
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="#top" aria-label="Udyog Radar home">
        <Mark />
        <span>UDYOG RADAR</span>
      </Link>
      <button
        className="menu-button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span />
        <span />
      </button>
      <nav className={open ? "nav-open" : ""} aria-label="Main navigation">
        <Link href="#intelligence" onClick={() => setOpen(false)}>
          Intelligence
        </Link>
        <Link href="#platform" onClick={() => setOpen(false)}>
          Platform
        </Link>
        <Link href="#industries" onClick={() => setOpen(false)}>
          Industries
        </Link>
        <Link className="nav-cta" href="/briefing" onClick={() => setOpen(false)}>
          Request a briefing <Arrow />
        </Link>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-scene" id="top" aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="hero-content shell" data-hero-copy>
          <p className="eyebrow">Industrial intelligence · India</p>
          <h1 id="hero-title">
            Know who&apos;s expanding
            <br />
            <em>before the market does.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Udyog Radar detects industrial change early—then turns it into
              precise, product-matched opportunities for your sales team.
            </p>
            <Link className="primary-button magnetic" href="/briefing">
              Book a private demo <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className="hero-readout" aria-hidden="true">
          <span>LIVE TERRITORY SCAN</span>
          <strong>18° 31&apos; 12.4&quot; N</strong>
          <i />
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to enter</span>
          <i />
        </div>
      </div>
    </section>
  );
}

function Premise() {
  return (
    <section className="premise" id="intelligence">
      <div className="shell premise-grid">
        <p className="section-index">01 · THE BLIND SPOT</p>
        <div>
          <h2 className="reveal-title">
            The best opportunities don&apos;t arrive as leads.
          </h2>
          <p className="premise-copy reveal-copy">
            They begin as quiet changes inside industry—a permit filed, capacity
            added, a new process commissioned. By the time the market notices,
            the buying decision is already in motion.
          </p>
        </div>
        <div className="latency-line" aria-label="Traditional lead discovery timeline">
          <span className="latency-label">The market sees it here</span>
          <span className="latency-track">
            <i className="early-point" />
            <i className="late-point" />
          </span>
          <span className="latency-caption">
            Udyog Radar sees the first operational signal
          </span>
        </div>
      </div>
    </section>
  );
}

function SignalVisual() {
  return (
    <div className="signal-visual" aria-hidden="true">
      <div className="radar-3d-grid">
        <div className="map-grid" />
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        
        {/* Glowing 3D Sweep Line */}
        <div className="radar-beam-3d" />
        
        <div className="signal-core">
          <span />
          <i />
        </div>
        <div className="signal-path path-a" />
        <div className="signal-path path-b" />
        <div className="signal-path path-c" />
        
        {/* Floating 3D Map Pins & Telemetry */}
        <div className="map-label label-a">
          <span className="pulsing-pin" />
          <div className="pin-billboard">
            <span className="pin-text">PUNE · MH</span>
            <span className="pin-intel">GeM Tender Ingested</span>
          </div>
        </div>
        <div className="map-label label-b">
          <span className="pulsing-pin" />
          <div className="pin-billboard">
            <span className="pin-text">VADODARA · GJ</span>
            <span className="pin-intel">Entity Resolved: Tata Chem</span>
          </div>
        </div>
        <div className="map-label label-c">
          <span className="pulsing-pin" />
          <div className="pin-billboard">
            <span className="pin-text">HYDERABAD · TS</span>
            <span className="pin-intel">Model Fit: 91% Conf</span>
          </div>
        </div>
        <div className="map-label label-d">
          <span className="pulsing-pin pin-ember" />
          <div className="pin-billboard">
            <span className="pin-text text-ember">NASHIK · MH</span>
            <span className="pin-intel">PARIVESH EC: Filed 4d ago</span>
          </div>
        </div>
        <div className="map-label label-e">
          <span className="pulsing-pin pin-ember" />
          <div className="pin-billboard">
            <span className="pin-text text-ember">MITHAPUR · GJ</span>
            <span className="pin-intel">Product: Furnace Oil fit</span>
          </div>
        </div>
      </div>
      
      <div className="visual-readout">
        <span>OPPORTUNITY SIGNAL</span>
        <strong data-signal-title>Environmental clearance filed</strong>
        <small data-signal-meta>17.4629° N · 78.3071° E</small>
      </div>
    </div>
  );
}

function Story() {
  return (
    <section className="story" id="platform">
      <div className="story-sticky">
        <div className="story-stage shell">
          <div className="story-visual-wrap">
            <p className="section-index light">02 · FROM SIGNAL TO SALE</p>
            <SignalVisual />
          </div>
          <div className="story-copy">
            {steps.map((step) => (
              <article className="story-step" key={step.number} data-signal={step.signal} data-meta={step.meta}>
                <div className="step-heading">
                  <span>{step.number}</span>
                  <p>{step.label}</p>
                </div>
                <h3 className="story-step-title">{step.title}</h3>
                <p className="story-step-body">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="story-progress" aria-hidden="true">
            <i />
          </div>
        </div>
      </div>
    </section>
  );
}

function Dossier() {
  return (
    <section className="dossier-section">
      <div className="shell dossier-grid">
        <div className="dossier-copy">
          <p className="section-index">03 · DECISION READY</p>
          <h2 className="reveal-title">Not another dashboard. A reason to act.</h2>
          <p className="reveal-copy">
            Every opportunity carries the evidence, product logic and next move.
            Your officer spends less time researching and more time in the right
            conversation.
          </p>
          <div className="dossier-stat">
            <strong>4 days</strong>
            <span>average signal advantage before broad market visibility</span>
          </div>
        </div>
        <div className="device-stage">
          <div className="device-glow" />
          <div className="dossier-card">
            <div className="dossier-topbar">
              <span>NEW OPPORTUNITY</span>
              <i>91% match</i>
            </div>
            <div className="company">
              <small>INDUSTRIAL MANUFACTURING</small>
              <h3>Vardhan Process Industries</h3>
              <p>Medchal, Telangana · 18 km away</p>
            </div>
            <div className="dossier-signal">
              <span className="pulse-icon" />
              <div>
                <small>DETECTED SIGNAL</small>
                <strong>New captive power unit filed 4 days ago</strong>
                <p>Source triangulated across environmental filing and local tender notice.</p>
              </div>
            </div>
            <div className="recommendation">
              <div>
                <small>TOP PRODUCT FIT</small>
                <strong>Industrial turbine lubricant</strong>
              </div>
              <span>91</span>
            </div>
            <div className="match-reason">
              Matched: captive power · turbine installation · operational phase
            </div>
            <div className="dossier-actions">
              <button type="button">Call prospect</button>
              <button type="button" aria-label="Open more actions">
                •••
              </button>
            </div>
          </div>
          <div className="float-note note-a">
            <span>01</span> Source verified
          </div>
          <div className="float-note note-b">
            <span>02</span> Product matched
          </div>
        </div>
      </div>
    </section>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

function Proof() {
  return (
    <section className="proof-section relative overflow-hidden bg-[#0a1928] py-16 md:py-24">
      {/* Background Grid Pattern & Radial glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -left-1/4 top-1/4 w-[600px] h-[600px] rounded-full bg-[#ff7a29]/5 blur-[120px] pointer-events-none" />

      <div className="shell max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-10 md:mb-14">
          <span className="text-[#ff7a29] font-mono text-xs md:text-sm uppercase tracking-[0.35em] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff7a29] animate-pulse" />
            04 · THE DIFFERENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
            Intelligence built for how industry actually moves.
          </h2>
          <p className="text-sm md:text-base text-[#6b7f96] max-w-2xl font-light leading-relaxed">
            Six reasons Udyog Radar isn&apos;t another SaaS dashboard.
          </p>
        </div>

        <MagicBento 
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="255, 122, 41"
        />
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="industries" id="industries">
      <div className="shell">
        <div className="industries-intro">
          <p className="section-index">05 · INDUSTRY PACKS</p>
          <h2 className="reveal-title">Deep context. Sector by sector.</h2>
          <p>
            Purpose-built signal models understand the language, processes and
            purchase triggers unique to each industrial category.
          </p>
        </div>
      </div>
      
      <div className="my-16 h-[500px] relative z-10 border-y border-[#ff7a29]/10">
        <FlowingMenu 
          items={flowingMenuSectors} 
          textColor="#ff7a29"
          bgColor="transparent"
          marqueeBgColor="#ff7a29"
          marqueeTextColor="#000000"
          borderColor="rgba(255, 122, 41, 0.15)"
          speed={18}
        />
      </div>

      <div className="shell">
        <p className="pilot-note">
          <span />
          Currently piloting with leading industrial sales teams across India.
        </p>
      </div>
    </section>
  );
}

function Closing() {
  return <CinematicFooter />;
}

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;
    let tickerUpdate: ((time: number) => void) | undefined;
    let canvasResizeHandler: (() => void) | undefined;

    if (!reduced) {
      lenis = new Lenis({ duration: 1.2, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tickerUpdate = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerUpdate);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      const canvas = document.querySelector<HTMLCanvasElement>("#hero-sequence");
      const context2d = canvas?.getContext("2d", { alpha: false });

      if (canvas && context2d) {
        const frameCount = 81;
        const frames = Array.from({ length: frameCount }, () => new window.Image());
        let requestedFrame = 0;

        const drawFrame = (requestedIndex: number) => {
          const index = Math.max(0, Math.min(frameCount - 1, requestedIndex));
          let image = frames[index];

          // If a visitor scrolls before every frame has downloaded, render the
          // closest available frame instead of leaving the canvas frozen.
          if (!image.complete || image.naturalWidth === 0) {
            for (let distance = 1; distance < frameCount; distance += 1) {
              const before = frames[index - distance];
              const after = frames[index + distance];
              if (before?.complete && before.naturalWidth > 0) {
                image = before;
                break;
              }
              if (after?.complete && after.naturalWidth > 0) {
                image = after;
                break;
              }
            }
          }

          if (!image.complete || image.naturalWidth === 0) return;

          const scale = Math.max(
            canvas.width / image.naturalWidth,
            canvas.height / image.naturalHeight,
          );
          const width = image.naturalWidth * scale;
          const height = image.naturalHeight * scale;

          context2d.clearRect(0, 0, canvas.width, canvas.height);
          context2d.drawImage(
            image,
            (canvas.width - width) / 2,
            (canvas.height - height) / 2,
            width,
            height,
          );
        };

        const sizeCanvas = () => {
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.round(canvas.clientWidth * pixelRatio);
          canvas.height = Math.round(canvas.clientHeight * pixelRatio);
          drawFrame(requestedFrame);
        };

        window.addEventListener("resize", sizeCanvas);
        canvasResizeHandler = () => window.removeEventListener("resize", sizeCanvas);
        sizeCanvas();

        frames.forEach((frame, index) => {
          frame.decoding = "async";
          frame.onload = () => {
            if (index === requestedFrame || index === 0) drawFrame(requestedFrame);
          };
          frame.src = `/images/hero-sequence/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
        });

        if (!reduced) {
          ScrollTrigger.create({
            trigger: ".sequence-wrapper",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
              requestedFrame = Math.round(progress * (frameCount - 1));
              drawFrame(requestedFrame);
            },
          });
        }
      }

      if (reduced) return;

      gsap.fromTo(
        ".hero-image",
        { scale: 1.05, yPercent: -0.75 },
        {
          scale: 1.25,
          yPercent: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: ".sequence-wrapper",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      gsap.to(".hero-vignette", {
        yPercent: -1.2,
        ease: "none",
        scrollTrigger: {
          trigger: ".sequence-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".radar-world", {
        scale: 1.55,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: ".hero-scene", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-title, .reveal-copy").forEach((element) => {
        gsap.set(element, { filter: "blur(6px)" });
        
        gsap.fromTo(element, {
          y: 28,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 1.35,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
        
        gsap.to(element, {
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      const storySteps = gsap.utils.toArray<HTMLElement>(".story-step");
      
      const updateReadout = (index: number) => {
        const step = storySteps[index];
        if (!step) return;
        const title = document.querySelector("[data-signal-title]");
        const meta = document.querySelector("[data-signal-meta]");
        if (title) title.textContent = step.dataset.signal ?? "";
        if (meta) meta.textContent = step.dataset.meta ?? "";
        gsap.fromTo(".visual-readout", { y: 6, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.45 });
        gsap.to(".story-progress i", { scaleY: (index + 1) / storySteps.length, duration: 0.4 });
      };

      updateReadout(0);

      storySteps.forEach((step, idx) => {
        const isFirst = idx === 0;
        const heading = step.querySelector(".step-heading");
        const title = step.querySelector(".story-step-title");
        const body = step.querySelector(".story-step-body");

        gsap.set([heading, title, body], {
          opacity: 0,
          y: 24,
        });
        gsap.set(title, { filter: "blur(6px)" });

        if (!isFirst) {
          gsap.set(step, { opacity: 0, pointerEvents: "none" });
        } else {
          gsap.set(step, { opacity: 1, pointerEvents: "auto" });
        }
      });

      // Animate the first slide's content on page load (gorgeous premium reveal)
      const firstHeading = storySteps[0]?.querySelector(".step-heading");
      const firstTitle = storySteps[0]?.querySelector(".story-step-title");
      const firstBody = storySteps[0]?.querySelector(".story-step-body");
      if (firstTitle) {
        gsap.to([firstHeading, firstTitle, firstBody], {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1.3,
          ease: "power3.out",
          delay: 0.6,
        });
        gsap.to(firstTitle, {
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          delay: 0.72,
        });
      }

      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".story",
          start: "top top",
          end: "bottom-=300vh bottom",
          scrub: true,
        }
      });

      storySteps.forEach((step, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === storySteps.length - 1;
        
        const heading = step.querySelector(".step-heading");
        const title = step.querySelector(".story-step-title");
        const body = step.querySelector(".story-step-body");

        if (isFirst) {
          // Slide 0 exits: slide elements up and fade out
          storyTimeline.to([heading, title, body], {
            opacity: 0,
            y: -24,
            stagger: 0.08,
            duration: 1,
            ease: "power3.in",
            onStart: () => updateReadout(idx),
            onReverseComplete: () => updateReadout(idx),
          }, "+=0.5");
          storyTimeline.to(step, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.1,
          }, "<+=0.8");
        } else {
          // Slide index N enters: make container visible and slide elements up
          storyTimeline.to(step, {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.1,
            onStart: () => updateReadout(idx),
            onReverseComplete: () => updateReadout(idx - 1),
          });

          storyTimeline.fromTo([heading, title, body], {
            opacity: 0,
            y: 24,
          }, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "power3.out",
          }, "<");

          storyTimeline.fromTo(title, {
            filter: "blur(6px)",
          }, {
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out",
          }, "<+=0.1");

          // Slide index N exits (unless it's the last one)
          if (!isLast) {
            storyTimeline.to([heading, title, body], {
              opacity: 0,
              y: -24,
              stagger: 0.08,
              duration: 1,
              ease: "power3.in",
            }, "+=0.5");
            storyTimeline.to(step, {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.1,
            }, "<+=0.8");
          }
        }
      });

      gsap.from(".dossier-card", {
        y: 100,
        rotateY: -10,
        rotateX: 7,
        opacity: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: ".device-stage", start: "top 78%", once: true },
      });
      gsap.to(".float-note.note-a", {
        y: -30,
        scrollTrigger: { trigger: ".device-stage", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".float-note.note-b", {
        y: 35,
        scrollTrigger: { trigger: ".device-stage", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.from(".comparison-row", {
        y: 34,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".comparison", start: "top 78%", once: true },
      });
    }, root);

      let handleMouseMove: ((e: MouseEvent) => void) | undefined;
      if (!reduced) {
        handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPercent = (clientX / window.innerWidth - 0.5) * 2;
          const yPercent = (clientY / window.innerHeight - 0.5) * 2;
          
          gsap.to(".hero-image", {
            x: xPercent * -18,
            y: yPercent * -18,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        window.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        lenis?.destroy();
        if (tickerUpdate) gsap.ticker.remove(tickerUpdate);
        if (canvasResizeHandler) canvasResizeHandler();
        if (handleMouseMove) window.removeEventListener("mousemove", handleMouseMove);
        context.revert();
      };
    }, []);

  return (
    <div ref={root} className="antialiased">
      <Header />
      <main className="relative bg-[#07131f]">
        {/* 1. Fixed Video Background Section */}
        <div className="sequence-wrapper">
          <div className="sequence-background">
            <div className="hero-image" data-hero-image>
              <canvas
                id="hero-sequence"
                className="hero-sequence-canvas"
                aria-hidden="true"
              />
            </div>
            <div className="hero-vignette" />
            <div className="radar-world" aria-hidden="true">
              <span className="radar-ring ring-one" />
              <span className="radar-ring ring-two" />
              <span className="radar-ring ring-three" />
              <span className="radar-beam" />
              <i className="signal-dot dot-one" />
              <i className="signal-dot dot-two" />
              <i className="signal-dot dot-three" />
            </div>
          </div>
          <div className="sequence-content">
            <Hero />
            <Premise />
          </div>
        </div>

        {/* 2. Solid Scrolling Card Deck (Story, Dossier, Proof, Industries) */}
        <div className="card-deck relative z-10 bg-[#07131f]">
          <Story />
          <Dossier />
          <Proof />
          <Industries />
        </div>

        {/* 3. Fixed Footer Curtain Reveal */}
        <Closing />
      </main>
    </div>
  );
}
