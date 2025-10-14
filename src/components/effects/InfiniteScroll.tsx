'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface Item {
  content: ReactNode;
}

interface InfiniteScrollProps {
  items: Item[];
  isTilted?: boolean;
  tiltDirection?: 'left' | 'right';
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: 'up' | 'down';
  pauseOnHover?: boolean;
}

export default function InfiniteScroll({
  items,
  isTilted = false,
  tiltDirection = 'left',
  autoplay = true,
  autoplaySpeed = 0.1,
  autoplayDirection = 'down',
  pauseOnHover = true,
}: InfiniteScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const contentHeight = container.scrollHeight;
    const content = container.firstElementChild as HTMLElement;
    const clone = content.cloneNode(true) as HTMLElement;
    container.appendChild(clone);

    // Reset scroll position when reaching the end
    const resetScroll = () => {
      if (autoplayDirection === 'down') {
        if (container.scrollTop >= contentHeight) {
          container.scrollTop = 0;
        }
      } else {
        if (container.scrollTop <= 0) {
          container.scrollTop = contentHeight;
        }
      }
    };

    // Create the scrolling animation
    const createScrollAnimation = () => {
      if (scrollTween.current) {
        scrollTween.current.kill();
      }

      scrollTween.current = gsap.to(container, {
        scrollTop:
          autoplayDirection === 'down'
            ? '+=' + contentHeight
            : '-=' + contentHeight,
        duration: contentHeight * autoplaySpeed * 0.01,
        ease: 'none',
        repeat: -1,
        onUpdate: resetScroll,
      });

      if (!autoplay) {
        scrollTween.current.pause();
      }
    };

    createScrollAnimation();

    // Handle pause on hover
    if (pauseOnHover) {
      const handleMouseEnter = () => scrollTween.current?.pause();
      const handleMouseLeave = () => autoplay && scrollTween.current?.play();

      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    return () => {
      scrollTween.current?.kill();
    };
  }, [autoplay, autoplayDirection, autoplaySpeed, pauseOnHover]);

  const tiltStyle = isTilted
    ? {
        transform: `rotate(${tiltDirection === 'left' ? '-' : ''}2deg)`,
      }
    : {};

  return (
    <div
      ref={containerRef}
      className='absolute inset-0 overflow-y-hidden'
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div className='space-y-4 py-8' style={tiltStyle}>
        {items.map((item, index) => (
          <div
            key={index}
            className='bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 
                     hover:border-white/20 transition-all duration-300'
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
