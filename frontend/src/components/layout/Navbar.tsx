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
  background: rgba(16, 22, 34, 0.8);
  backdrop-filter: blur(12px);
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
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
  color: var(--primary-color);
  font-weight: 700;
  font-size: 1.25rem;

  svg {
    width: 2rem;
    height: 2rem;
  }

  span {
    color: white;
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
    transition: color 0.3s;

    &:hover {
      color: var(--primary-color);
    }
  }
`;

const ContactBtn = styled(Link)`
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  background: var(--primary-color);
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.3s;

  box-shadow: 0 4px 15px rgba(13, 89, 242, 0.3);

  &:hover {
    background: #0b4ecd;
    box-shadow: 0 4px 20px rgba(13, 89, 242, 0.5);
    transform: translateY(-1px);
    color: white;
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
        const response = await apiClient.get("/settings");
        setSettings(response.data);
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchSettings();
  }, []);

  const siteName = settings.site_name || "Phan Gia Mẫn";
  const logoUrl = settings.site_logo 
    ? (settings.site_logo.startsWith('http') ? settings.site_logo : `${API_URL}${settings.site_logo}`)
    : null;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Nav>
        <Container>
          <Link to="/">
            <LogoWrapper>
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} style={{ height: '2.5rem', objectFit: 'contain' }} />
              ) : (
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C26.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
              <span>{siteName}</span>
            </LogoWrapper>
          </Link>
          <NavLinks>
            <Link to="/portfolio">Dự án</Link>
            <Link to="/about">Giới thiệu</Link>
            <Link to="/skills">Kỹ năng</Link>
            <Link to="/services">Dịch vụ</Link>
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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <MobileMenuBtn onClick={toggleMenu}>
                  <CloseOutlined />
                </MobileMenuBtn>
              </div>
              <DrawerLinks>
                <Link to="/portfolio" onClick={toggleMenu}>Dự án</Link>
                <Link to="/about" onClick={toggleMenu}>Giới thiệu</Link>
                <Link to="/skills" onClick={toggleMenu}>Kỹ năng</Link>
                <Link to="/services" onClick={toggleMenu}>Dịch vụ</Link>
                <div style={{ marginTop: '1rem' }}>
                  <ContactBtn to="/contact" onClick={toggleMenu} style={{ display: 'inline-block' }}>
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
