import React, { useEffect, useRef, useState } from 'react';

/* --------------------------------------------------------------------------
 * One shared IntersectionObserver for every reveal on the page.
 * Elements get `is-visible` once and are then unobserved, so the cost after
 * the first pass is zero. Without IntersectionObserver everything is shown.
 * ------------------------------------------------------------------------ */

type Callback = () => void;
const callbacks = new WeakMap<Element, Callback>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.();
            callbacks.delete(entry.target);
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
  }
  return sharedObserver;
}

/** Calls `onEnter` the first time the element scrolls into view. */
export function useOnceInView<T extends Element>(onEnter: (el: T) => void) {
  const ref = useRef<T>(null);
  const cbRef = useRef(onEnter);
  cbRef.current = onEnter;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getObserver();
    if (!observer) {
      cbRef.current(el);
      return;
    }
    callbacks.set(el, () => cbRef.current(el));
    observer.observe(el);
    return () => {
      callbacks.delete(el);
      observer.unobserve(el);
    };
  }, []);

  return ref;
}

/** Adds a class to the element when it first enters the viewport. */
export function useRevealClass<T extends Element>(className = 'is-visible') {
  return useOnceInView<T>((el) => el.classList.add(className));
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

/* --------------------------------------------------------------------------
 * <Reveal> — fade + 16px rise (or a rectangular clip for images).
 * ------------------------------------------------------------------------ */

type RevealProps = {
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  variant?: 'rise' | 'clip';
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & Record<string, unknown>;

export const Reveal: React.FC<RevealProps> = ({
  as = 'div',
  delay = 0,
  variant = 'rise',
  className = '',
  style,
  children,
  ...rest
}) => {
  const ref = useRevealClass<HTMLElement>();
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={`${variant === 'clip' ? 'reveal-clip' : 'reveal'} ${className}`}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* --------------------------------------------------------------------------
 * <Scribble> — hand-drawn accent for CTA text only.
 *   oval:      loops around the wrapped words
 *   underline: a single curved stroke under the wrapped words
 * <ScribbleArrow> — a curved arrow that points at a nearby button.
 * The strokes draw in when visible. They are decorative only.
 * ------------------------------------------------------------------------ */

const OVAL_PATH =
  'M 112 9 C 96 1, 34 0, 12 9 C -2 15, 2 33, 24 38 C 52 44, 102 42, 114 30 C 122 21, 114 9, 92 6';
const UNDERLINE_PATH = 'M 2 7 C 30 2, 62 2, 96 5 C 106 6, 113 7, 118 6';

export const Scribble: React.FC<{
  variant?: 'oval' | 'underline';
  children: React.ReactNode;
  className?: string;
}> = ({ variant = 'oval', children, className = '' }) => {
  const ref = useRevealClass<HTMLSpanElement>('is-drawn');
  return (
    <span ref={ref} className={`scribble-host scribble-host--${variant} ${className}`}>
      <span className="relative z-[1]">{children}</span>
      <svg
        className={`scribble scribble--${variant}`}
        viewBox={variant === 'oval' ? '0 0 124 46' : '0 0 120 10'}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path pathLength={1} d={variant === 'oval' ? OVAL_PATH : UNDERLINE_PATH} />
      </svg>
    </span>
  );
};

/** direction "up-left" points from a caption below/right toward a button above/left. */
export const ScribbleArrow: React.FC<{ className?: string; direction?: 'up-left' | 'left' }> = ({
  className = '',
  direction = 'up-left',
}) => {
  const ref = useRevealClass<SVGSVGElement>('is-drawn');
  const d =
    direction === 'up-left'
      ? 'M 42 28 C 30 28, 16 22, 9 7 M 9 7 L 6 16 M 9 7 L 17 10'
      : 'M 42 18 C 32 8, 18 10, 5 16 M 5 16 L 13 9 M 5 16 L 14 21';
  return (
    <svg
      ref={ref}
      className={`scribble scribble--arrow ${className}`}
      viewBox="0 0 46 32"
      aria-hidden="true"
      focusable="false"
    >
      <path pathLength={1} d={d} />
    </svg>
  );
};

/* --------------------------------------------------------------------------
 * Restrained parallax: desktop only, off for reduced motion, rAF-throttled.
 * ------------------------------------------------------------------------ */
export function useParallax<T extends HTMLElement>(strength = 0.08) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches) {
        el.style.transform = '';
        return;
      }
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -strength;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.08)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    desktop.addEventListener?.('change', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      desktop.removeEventListener?.('change', onScroll);
      el.style.transform = '';
    };
  }, [reduced, strength]);

  return ref;
}
