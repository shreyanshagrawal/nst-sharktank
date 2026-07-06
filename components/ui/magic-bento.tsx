"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  accent?: string;
  stat?: string;
  statLabel?: string;
  icon?: string;
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '255, 122, 41'; // Udyog Radar orange
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
  {
    color: '#0c1c2e',
    title: 'Verify Physical Plant Realities',
    description: 'We track permits, environmental clearances, and raw cargo movements — not stale directory databases.',
    label: 'THE DATASOURCE',
    accent: '#ff7a29',
    stat: '12',
    statLabel: 'live sources',
    icon: 'radar'
  },
  {
    color: '#0c1c2e',
    title: '4-Day Signal Advantage',
    description: 'Get notified average 4 days before broad market visibility or official public tender notice filings.',
    label: 'THE TIMING',
    accent: '#ff7a29',
    stat: '4d',
    statLabel: 'avg. lead time',
    icon: 'clock'
  },
  {
    color: '#0c1c2e',
    title: 'Product Fit Matching',
    description: 'Our engine automatically links operational signals to your catalog and sales territories.',
    label: 'THE MATCHING',
    accent: '#ff7a29',
    stat: '91%',
    statLabel: 'match accuracy',
    icon: 'link'
  },
  {
    color: '#0c1c2e',
    title: 'Learns from Field Outcomes',
    description: 'The model dynamically tunes future signals based on your team\'s call feedback.',
    label: 'FEEDBACK LOOP',
    accent: '#ff7a29',
    stat: '↑ 23%',
    statLabel: 'precision/quarter',
    icon: 'loop'
  },
  {
    color: '#0c1c2e',
    title: 'Not Another Dashboard',
    description: 'Every opportunity carries the raw regulatory filing, evidence timeline, and contact information.',
    label: 'EVIDENCE-LED',
    accent: '#ff7a29',
    stat: '0',
    statLabel: 'hours researching',
    icon: 'file'
  },
  {
    color: '#0c1c2e',
    title: 'Less Research, More Selling',
    description: 'Officers get a product-matched dossier and clear reason to call.',
    label: 'OFFICER OUTPUT',
    accent: '#ff7a29',
    stat: '3×',
    statLabel: 'more conversations',
    icon: 'phone'
  }
];

const CardIcon: React.FC<{ icon?: string; accent?: string }> = ({ icon, accent = '#ff7a29' }) => {
  const cls = 'w-5 h-5 shrink-0';
  const style = { color: accent };
  switch (icon) {
    case 'radar':
      return <svg className={cls} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>;
    case 'clock':
      return <svg className={cls} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    case 'link':
      return <svg className={cls} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
    case 'loop':
      return <svg className={cls} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
    case 'file':
      return <svg className={cls} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'phone':
      return <svg className={cls} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
    default:
      return null;
  }
};

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%,
        rgba(${glowColor}, 0.06) 15%,
        rgba(${glowColor}, 0.03) 25%,
        rgba(${glowColor}, 0.01) 40%,
        transparent 65%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid: React.FC<{
  children: React.ReactNode;
  gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
  <div
    className="bento-section grid gap-3 max-w-[72rem] select-none relative mx-auto"
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const LiveSignalStream = () => {
  return (
    <div className="card__visual mt-5 border border-white/5 bg-[#050e18]/80 rounded-xl p-4 font-mono text-xs flex flex-col gap-3 relative overflow-hidden w-full min-h-[160px]">
      {/* Pulse background radar */}
      <div className="absolute right-4 top-4 w-12 h-12 rounded-full border border-[#ff7a29]/15 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 rounded-full border border-[#ff7a29]/30 animate-ping absolute" />
        <div className="w-2 h-2 rounded-full bg-[#ff7a29]" />
      </div>

      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-[10px] text-neutral-400 tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a29] animate-pulse" />
        LIVE RADAR FEED
      </div>

      <div className="flex flex-col gap-3 overflow-hidden select-none flex-grow justify-center">
        <div className="flex flex-col gap-1 border-l-2 border-green-500 pl-2 py-0.5">
          <div className="flex justify-between text-[9px] text-neutral-500">
            <span>[09:41 AM] ENV_FILING</span>
            <span className="text-green-400/80 font-bold">94% MATCH</span>
          </div>
          <span className="text-[11px] text-neutral-200 truncate font-semibold">Captive power unit approved (Vardhan Industries)</span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-[#ff7a29] pl-2 py-0.5">
          <div className="flex justify-between text-[9px] text-neutral-500">
            <span>[11:05 AM] CARGO_MANIFEST</span>
            <span className="text-[#ff7a29] font-bold">91% MATCH</span>
          </div>
          <span className="text-[11px] text-neutral-200 truncate font-semibold">Bulk shipment of industrial turbine lubricant detected</span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-blue-500 pl-2 py-0.5">
          <div className="flex justify-between text-[9px] text-neutral-500">
            <span>[02:18 PM] DEPT_MINES</span>
            <span className="text-blue-400/80 font-bold">88% MATCH</span>
          </div>
          <span className="text-[11px] text-neutral-200 truncate font-semibold">Limestone crushing plant expansion clearance granted</span>
        </div>
      </div>
    </div>
  );
};

const TimingTimeline = () => {
  return (
    <div className="card__visual mt-4 border border-white/5 bg-[#050e18]/80 rounded-xl p-4 flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <span>TIMELINE GAP</span>
        <span className="text-[#ff7a29] font-bold">4 DAYS EARLIER</span>
      </div>

      <div className="relative flex justify-between items-center py-2 px-1">
        {/* Connection Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-white/5 z-0" />
        <div className="absolute left-6 right-1/2 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#ff7a29] to-[#ff7a29]/30 z-0" />

        <div className="flex flex-col items-center gap-1.5 relative z-10">
          <div className="w-4 h-4 rounded-full bg-[#ff7a29] flex items-center justify-center shadow-[0_0_12px_rgba(255,122,41,0.5)]">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="text-[9px] font-mono text-[#ff7a29] uppercase font-bold">Day 0</span>
          <span className="text-[9px] text-neutral-300 font-medium">Radar Alert</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 relative z-10">
          <div className="w-3 h-3 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
            <div className="w-1 bg-neutral-600 rounded-full" />
          </div>
          <span className="text-[9px] font-mono text-neutral-500 uppercase">Day 2</span>
          <span className="text-[9px] text-neutral-500">Rumors</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 relative z-10">
          <div className="w-4 h-4 rounded-full bg-red-950 border border-red-500/30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
          </div>
          <span className="text-[9px] font-mono text-red-400 uppercase">Day 4</span>
          <span className="text-[9px] text-neutral-400">Public RFP</span>
        </div>
      </div>
    </div>
  );
};

const ProductCorrelation = () => {
  return (
    <div className="card__visual mt-5 border border-white/5 bg-[#050e18]/80 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden w-full min-h-[160px]">
      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-b border-white/5 pb-2">
        <span>CORRELATION ENGINE</span>
        <span className="text-[#ff7a29] font-bold">91% MATCH</span>
      </div>

      <div className="flex flex-col gap-2.5 flex-grow justify-center mt-2">
        <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
          <span className="text-[10px] text-neutral-200 font-mono font-medium truncate max-w-[100px]">Turbine Lubricant</span>
          <div className="flex items-center gap-1.5">
            <div className="w-10 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#ff7a29] rounded-full" style={{ width: '91%' }} />
            </div>
            <span className="text-[9px] text-[#ff7a29] font-mono font-bold">91%</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
          <span className="text-[10px] text-neutral-200 font-mono font-medium truncate max-w-[100px]">Transformer Oil</span>
          <div className="flex items-center gap-1.5">
            <div className="w-10 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '74%' }} />
            </div>
            <span className="text-[9px] text-amber-400 font-mono font-bold">74%</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
          <span className="text-[10px] text-neutral-200 font-mono font-medium truncate max-w-[100px]">Gear & Hydraulic</span>
          <div className="flex items-center gap-1.5">
            <div className="w-10 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }} />
            </div>
            <span className="text-[9px] text-blue-400/80 font-mono font-bold">60%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TriangulationSources = () => {
  return (
    <div className="card__visual mt-4 border border-white/5 bg-[#050e18]/80 rounded-xl p-4 flex flex-col gap-3 w-full">
      <div className="text-[10px] font-mono text-neutral-400 tracking-wider">
        SOURCE TRIANGULATION TRACE
      </div>
      
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-[#030a12] border border-white/5 p-2 rounded-lg flex flex-col gap-1">
          <span className="text-[8px] font-mono text-[#ff7a29] uppercase font-bold">SOURCE 01</span>
          <span className="text-[10px] text-white font-semibold truncate">Env. Clearance</span>
          <span className="text-[8px] text-neutral-500 font-mono">Pollution Filing</span>
        </div>

        <div className="bg-[#030a12] border border-white/5 p-2 rounded-lg flex flex-col gap-1">
          <span className="text-[8px] font-mono text-blue-400 uppercase font-bold">SOURCE 02</span>
          <span className="text-[10px] text-white font-semibold truncate">Tender Registry</span>
          <span className="text-[8px] text-neutral-500 font-mono">Power License</span>
        </div>

        <div className="bg-[#030a12] border border-white/5 p-2 rounded-lg flex flex-col gap-1">
          <span className="text-[8px] font-mono text-green-400 uppercase font-bold">SOURCE 03</span>
          <span className="text-[10px] text-white font-semibold truncate">Cargo Logs</span>
          <span className="text-[8px] text-neutral-500 font-mono">Transit Manifest</span>
        </div>
      </div>
    </div>
  );
};

const ModelLearningSparkline = () => {
  return (
    <div className="card__visual mt-4 border border-white/5 bg-[#050e18]/80 rounded-xl p-3 flex flex-col gap-2 w-full mt-auto">
      <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
        <span>AUTO-TUNING LAYER</span>
        <span className="text-green-400 font-bold">ACTIVE</span>
      </div>
      <div className="flex items-center gap-3">
        {/* Mock Sparkline SVG */}
        <svg className="w-24 h-8 text-[#ff7a29]" viewBox="0 0 100 30" fill="none">
          <path
            d="M0,25 L15,22 L30,12 L45,18 L60,8 L75,14 L90,2 L100,5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0,25 L15,22 L30,12 L45,18 L60,8 L75,14 L90,2 L100,5 L100,30 L0,30 Z"
            fill="url(#sparkline-grad)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff7a29" />
              <stop offset="100%" stopColor="#ff7a29" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex flex-col font-mono text-[9px] text-neutral-400">
          <span>Loss: <strong className="text-white">0.038</strong></span>
          <span>Acc: <strong className="text-white">96.8%</strong></span>
        </div>
      </div>
    </div>
  );
};

const LeadContactCard = () => {
  return (
    <div className="card__visual mt-4 border border-white/5 bg-[#050e18]/80 rounded-xl p-3 flex flex-col gap-2 w-full mt-auto">
      <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 border-b border-white/5 pb-1">
        <span>DIRECT SALES DIRECTORY</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#ff7a29]/10 border border-[#ff7a29]/20 flex items-center justify-center text-[10px] text-[#ff7a29] font-bold">
          RV
        </div>
        <div className="flex flex-col truncate">
          <span className="text-[10px] text-white font-semibold truncate">Rajesh Vardhan</span>
          <span className="text-[8px] text-neutral-500 font-mono">VP Procurement</span>
        </div>
      </div>
      <div className="flex gap-1.5 mt-1">
        <button className="flex-1 bg-[#ff7a29]/10 hover:bg-[#ff7a29]/20 border border-[#ff7a29]/20 text-[#ff7a29] text-[8px] font-mono font-bold py-1 px-1.5 rounded transition-all duration-200 uppercase tracking-wider">
          Call Lead
        </button>
        <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-[8px] font-mono py-1 px-1.5 rounded transition-all duration-200 uppercase tracking-wider">
          Dossier
        </button>
      </div>
    </div>
  );
};

const renderCardVisual = (label?: string) => {
  switch (label) {
    case 'THE DATASOURCE':
      return <LiveSignalStream />;
    case 'THE TIMING':
      return <TimingTimeline />;
    case 'THE MATCHING':
      return <ProductCorrelation />;
    case 'FEEDBACK LOOP':
      return <ModelLearningSparkline />;
    case 'EVIDENCE-LED':
      return <TriangulationSources />;
    case 'OFFICER OUTPUT':
      return <LeadContactCard />;
    default:
      return null;
  }
};

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = false,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 300px;
            --glow-color: ${glowColor};
            --border-color: rgba(255, 122, 41, 0.1);
            --background-dark: #0c1c2e;
            --white: hsl(0, 0%, 100%);
            --ember-primary: rgba(255, 122, 41, 1);
            --ember-glow: rgba(255, 122, 41, 0.15);
            --ember-border: rgba(255, 122, 41, 0.3);
          }
          
          .card-responsive {
            grid-template-columns: 1fr;
            width: 100%;
            margin: 0 auto;
          }
          
          @media (min-width: 600px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
            }
            
            .card-responsive .card:nth-child(1) {
              grid-column: span 2;
            }
            
            .card-responsive .card:nth-child(4) {
              grid-column: span 2;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 1px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.3)) 40%,
                transparent 70%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 40px rgba(${glowColor}, 0.1);
            border-color: rgba(${glowColor}, 0.25);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          @media (max-width: 599px) {
            .card-responsive {
              grid-template-columns: 1fr;
              width: 100%;
              margin: 0 auto;
              padding: 0;
            }
            
            .card-responsive .card {
              width: 100%;
            }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="card-responsive grid gap-3">
          {cardData.map((card, index) => {
            const accent = card.accent || '#ff7a29';
            const baseClassName = `card flex flex-col justify-between relative w-full max-w-full rounded-2xl border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] ${
              enableBorderGlow ? 'card--border-glow' : ''
            }`;

            const cardStyle = {
              backgroundColor: card.color || 'var(--background-dark)',
              borderColor: 'rgba(255, 255, 255, 0.06)',
              color: 'var(--white)',
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '300px'
            } as React.CSSProperties;

            const cardContent = (
              <>
                {/* Subtle corner radial for depth */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-[0.06] z-0" style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }} />
                
                <div className="relative z-20 p-5 flex flex-col gap-3 h-full">
                  {/* Header: icon + label */}
                  <div className="flex items-center gap-2">
                    <CardIcon icon={card.icon} accent={accent} />
                    <span className="font-mono text-[10px] tracking-[0.2em] font-semibold uppercase" style={{ color: accent }}>{card.label}</span>
                  </div>
                  
                  {/* Title + description */}
                  <div className="flex flex-col gap-1.5 flex-grow">
                    <h3 className="font-bold text-[15px] md:text-[17px] tracking-tight m-0 text-white leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[12.5px] leading-[1.6] text-[#8a9bb0] font-normal m-0">
                      {card.description}
                    </p>
                  </div>
                  
                  {/* Stat badge */}
                  {card.stat && (
                    <div className="flex items-center gap-2 mt-1 pt-3 border-t border-white/[0.04]">
                      <span className="text-xl font-black tracking-tight" style={{ color: accent }}>{card.stat}</span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#5a6d82]">{card.statLabel}</span>
                    </div>
                  )}
                </div>
              </>
            );

            if (enableStars) {
              return (
                <ParticleCard
                  key={index}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  {cardContent}
                </ParticleCard>
              );
            }

            return (
              <div
                key={index}
                className={baseClassName}
                style={cardStyle}
                ref={el => {
                  if (!el) return;

                  const handleMouseMove = (e: MouseEvent) => {
                    if (shouldDisableAnimations) return;

                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    if (enableTilt) {
                      const rotateX = ((y - centerY) / centerY) * -10;
                      const rotateY = ((x - centerX) / centerX) * 10;

                      gsap.to(el, {
                        rotateX,
                        rotateY,
                        duration: 0.1,
                        ease: 'power2.out',
                        transformPerspective: 1000
                      });
                    }

                    if (enableMagnetism) {
                      const magnetX = (x - centerX) * 0.05;
                      const magnetY = (y - centerY) * 0.05;

                      gsap.to(el, {
                        x: magnetX,
                        y: magnetY,
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }
                  };

                  const handleMouseLeave = () => {
                    if (shouldDisableAnimations) return;

                    if (enableTilt) {
                      gsap.to(el, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }

                    if (enableMagnetism) {
                      gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }
                  };

                  const handleClick = (e: MouseEvent) => {
                    if (!clickEffect || shouldDisableAnimations) return;

                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const maxDistance = Math.max(
                      Math.hypot(x, y),
                      Math.hypot(x - rect.width, y),
                      Math.hypot(x, y - rect.height),
                      Math.hypot(x - rect.width, y - rect.height)
                    );

                    const ripple = document.createElement('div');
                    ripple.style.cssText = `
                      position: absolute;
                      width: ${maxDistance * 2}px;
                      height: ${maxDistance * 2}px;
                      border-radius: 50%;
                      background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                      left: ${x - maxDistance}px;
                      top: ${y - maxDistance}px;
                      pointer-events: none;
                      z-index: 1000;
                    `;

                    el.appendChild(ripple);

                    gsap.fromTo(
                      ripple,
                      {
                        scale: 0,
                        opacity: 1
                      },
                      {
                        scale: 1,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => ripple.remove()
                      }
                    );
                  };

                  el.addEventListener('mousemove', handleMouseMove);
                  el.addEventListener('mouseleave', handleMouseLeave);
                  el.addEventListener('click', handleClick);
                }}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
