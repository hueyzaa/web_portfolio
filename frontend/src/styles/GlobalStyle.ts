import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: #101622;
    --bg-light: #f5f6f8;
    --primary-color: #0d59f2;
    --card-bg: rgba(255, 255, 255, 0.05);
    --text-main: #f1f5f9;
    --text-dim: #94a3b8;
    --accent-color: #0d59f2;
    --font-display: 'Space Grotesk', sans-serif;
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
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
    font-weight: 700;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--accent-color);
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
    transition: all 0.3s ease;
  }

  .glass {
    background: var(--card-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-color);
  }

  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
