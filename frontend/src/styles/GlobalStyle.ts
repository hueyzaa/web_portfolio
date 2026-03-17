import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: #050a10;
    --bg-light: #0d121d;
    --primary-hologram: #00f2ff;
    --secondary-hologram: #bd00ff;
    --accent-hologram: #ff00d4;
    --hologram-gradient: linear-gradient(135deg, #00f2ff 0%, #bd00ff 50%, #ff00d4 100%);
    --primary-color: var(--primary-hologram); /* Fallback for existing components */
    --card-bg: rgba(255, 255, 255, 0.03);
    --text-main: #f8fafc;
    --text-dim: #94a3b8;
    --accent-color: var(--secondary-hologram);
    --font-display: 'Space Grotesk', sans-serif;
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.8);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-main);
    font-family: var(--font-display);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    position: relative;
    
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% -20%, rgba(0, 242, 255, 0.05), transparent 70%),
                  radial-gradient(circle at 0% 100%, rgba(189, 0, 255, 0.05), transparent 70%);
      pointer-events: none;
      z-index: -1;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: white;
    font-weight: 700;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  a:hover {
    color: var(--primary-hologram);
    text-shadow: 0 0 8px rgba(0, 242, 255, 0.5);
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .glass {
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
  }

  .hologram-text {
    background: var(--hologram-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-color);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    
    &:hover {
      background: var(--primary-hologram);
    }
  }
`;
