import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalStyle } from './styles/GlobalStyle';
import AppRouter from './router/AppRouter';
import { QueryClient, QueryClientProvider, useIsFetching } from '@tanstack/react-query';
import LiquidEther from './components/common/LiquidEther';
import GlobalLoader from './components/common/GlobalLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RootContent = () => {
  const isFetching = useIsFetching();
  
  // We consider the site "loading" if there's at least one active query
  // This ensures the spinner stays until initial data is fetched.
  return (
    <>
      <GlobalLoader isLoading={isFetching > 0} />
      <AppRouter />
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GlobalStyle />
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{ position: 'fixed', inset: 0, zIndex: -1 }}
          />
          <RootContent />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
