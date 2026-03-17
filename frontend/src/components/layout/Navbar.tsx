import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import apiClient, { API_URL } from "../../api/apiClient";
import { AnimatePresence, motion } from "framer-motion";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(16, 22, 34, 0.4);
  backdrop-filter: blur(20px);
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--hologram-gradient);
    opacity: 0.3;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.25rem;
  background: var(--hologram-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  span {
    color: inherit;
  }
`;

const NavLinks = styled.div`
  display: none;
  align-items: center;
  gap: 2.5rem;

  @media (min-width: 768px) {
    display: flex;
  }

  a {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-main);
    transition: all 0.3s;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--hologram-gradient);
      transition: width 0.3s;
    }

    &:hover {
      color: var(--primary-hologram);
      &::after {
        width: 100%;
      }
    }
  }
`;

const ContactBtn = styled(Link)`
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  background: var(--hologram-gradient);
  background-size: 200% auto;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.4s;
  box-shadow: 0 4px 15px rgba(0, 242, 255, 0.2);
  position: relative;
  overflow: hidden;

  &:hover {
    background-position: right center;
    box-shadow: 0 4px 25px rgba(189, 0, 255, 0.4);
    transform: translateY(-2px) scale(1.02);
    color: white;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: all 0.6s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const MobileMenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary-color);
  }
`;

const MobileDrawer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: #101622;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  z-index: 2000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1999;
`;

const DrawerLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;

  a {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--text-main);
    padding: 0.5rem 0;
    transition: all 0.3s;

    &:hover {
      color: var(--primary-color);
      padding-left: 0.5rem;
    }
  }
`;

const Navbar: React.FC = () => {
  const [settings, setSettings] = React.useState<any>({});
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get("/public/settings");
        setSettings(response.data);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchSettings();
  }, []);

  const siteName = settings.site_name || "Phan Gia Mẫn";
  const logoUrl = settings.site_logo
    ? settings.site_logo.startsWith("http")
      ? settings.site_logo
      : `${API_URL}${settings.site_logo}`
    : null;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Nav>
        <Container>
          <Link to="/">
            <LogoWrapper>
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={siteName}
                  style={{ height: "2.5rem", objectFit: "contain" }}
                />
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="" fill="currentColor"></path>
                </svg>
              )}
              <span>{siteName}</span>
            </LogoWrapper>
          </Link>
          <NavLinks>
            <Link to="/about">Giới thiệu</Link>
            <Link to="/portfolio">Dự án</Link>
            <Link to="/skills">Kỹ năng</Link>
            <Link to="/services">Dịch vụ</Link>
            <Link to="/blog">Blog</Link>
            <ContactBtn to="/contact">Liên hệ với tôi</ContactBtn>
          </NavLinks>

          <MobileMenuBtn onClick={toggleMenu}>
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
          </MobileMenuBtn>
        </Container>
      </Nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            <MobileDrawer
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <MobileMenuBtn onClick={toggleMenu}>
                  <CloseOutlined />
                </MobileMenuBtn>
              </div>
              <DrawerLinks>
                <Link to="/portfolio" onClick={toggleMenu}>
                  Dự án
                </Link>
                <Link to="/about" onClick={toggleMenu}>
                  Giới thiệu
                </Link>
                <Link to="/skills" onClick={toggleMenu}>
                  Kỹ năng
                </Link>
                <Link to="/services" onClick={toggleMenu}>
                  Dịch vụ
                </Link>
                <Link to="/blog" onClick={toggleMenu}>
                  Blog
                </Link>
                <div style={{ marginTop: "1rem" }}>
                  <ContactBtn
                    to="/contact"
                    onClick={toggleMenu}
                    style={{ display: "inline-block" }}
                  >
                    Liên hệ với tôi
                  </ContactBtn>
                </div>
              </DrawerLinks>
            </MobileDrawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
