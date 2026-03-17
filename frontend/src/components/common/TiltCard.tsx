import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Container = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 100%;
`;

const Inner = styled(motion.div)`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  position: relative;
`;

const Glare = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(0, 242, 255, 0.15) 0%,
    rgba(189, 0, 255, 0.05) 40%,
    transparent 80%
  );
  pointer-events: none;
  z-index: 10;
  border-radius: inherit;
`;

interface TiltCardProps {
  children: React.ReactNode;
  tiltMax?: number;
  scale?: number;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  tiltMax = 15, 
  scale = 1.05,
  className 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [0, 1], [tiltMax, -tiltMax]);
  const rotateY = useTransform(mouseX, [0, 1], [-tiltMax, tiltMax]);
  const springScale = useSpring(1, { stiffness: 150, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXRelative = (event.clientX - rect.left) / width;
    const mouseYRelative = (event.clientY - rect.top) / height;
    
    x.set(mouseXRelative);
    y.set(mouseYRelative);
    
    // Set CSS variables for glare effect
    ref.current.style.setProperty('--x', `${mouseXRelative * 100}%`);
    ref.current.style.setProperty('--y', `${mouseYRelative * 100}%`);
  };

  const handleMouseEnter = () => {
    springScale.set(scale);
  };

  const handleMouseLeave = () => {
    springScale.set(1);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <Container 
      ref={ref} 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <Inner style={{ rotateX, rotateY, scale: springScale }}>
        {children}
        <Glare />
      </Inner>
    </Container>
  );
};

export default TiltCard;
