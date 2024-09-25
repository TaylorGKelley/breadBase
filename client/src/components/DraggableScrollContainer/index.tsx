import React, { useRef, useState } from 'react';
import type { HTMLProps, PropsWithChildren } from 'react';

type DraggableScrollContainerProps = PropsWithChildren &
  HTMLProps<HTMLDivElement> & { scrollSnap?: boolean };

function DraggableScrollContainer({
  scrollSnap = false,
  className,
  children,
  ...attributes
}: DraggableScrollContainerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('moved mouse');

    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={scrollRef}
      className={`scroll-hidden flex max-w-80 cursor-grab gap-4 overflow-x-scroll scroll-smooth whitespace-nowrap rounded-3xl *:select-none *:snap-start active:cursor-grabbing ${className} ${scrollSnap ? 'snap-x snap-mandatory scroll-px-6' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...attributes}
    >
      {children}
    </div>
  );
}

export default DraggableScrollContainer;
