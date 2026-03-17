import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0f172a; // Dark background to match theme
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const SpinnerCircle = styled(motion.div)`
  position: absolute;
  inset: 0;
  border: 4px solid rgba(13, 89, 242, 0.1);
  border-top-color: var(--primary-color);
  border-radius: 50%;
`;

const FloatingParticles = styled(motion.div)`
  position: absolute;
  inset: -10px;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
`;

const LoadingText = styled(motion.p)`
  color: white;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
`;

interface GlobalLoaderProps {
  isLoading: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <Overlay
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <SpinnerWrapper>
            <SpinnerCircle
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <FloatingParticles
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
                rotate: [0, 90, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
          </SpinnerWrapper>
          <LoadingText
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.4, 0.8, 0.4], y: 0 }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            Đang tải dữ liệu...
          </LoadingText>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;
