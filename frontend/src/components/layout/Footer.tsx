import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  padding: 4rem 1.5rem;
  border-top: 1px solid #1e293b;
  background: var(--bg-color);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--primary-color);
  font-weight: 700;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  span {
    font-size: 0.875rem;
    color: white;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: #64748b;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  a {
    color: #94a3b8;
    transition: color 0.3s;

    &:hover {
      color: white;
    }

    span {
      font-size: 1.25rem;
    }
  }
`;

const SocialLabel = styled.a`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  transition: color 0.3s;

  &:hover {
    color: white;
  }
`;

import apiClient, { API_URL } from "../../api/apiClient";

const FooterSection: React.FC = () => {
  const [settings, setSettings] = React.useState<any>({});

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

  const socialLinks = settings.footer_socials
    ? JSON.parse(settings.footer_socials)
    : [];
  const siteName = settings.site_name || "Phan Gia Mẫn";
  const logoUrl = settings.site_logo
    ? settings.site_logo.startsWith("http")
      ? settings.site_logo
      : `${API_URL}${settings.site_logo}`
    : null;

  return (
    <Footer>
      <Container>
        <LogoWrapper>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={siteName}
              style={{ height: "2rem", objectFit: "contain" }}
            />
          ) : (
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d=""
                fill="currentColor"
              ></path>
            </svg>
          )}
          <span>{siteName}</span>
        </LogoWrapper>
        <Copyright>
          {settings.footer_copyright ||
            `© ${new Date().getFullYear()} ${siteName}. Đã đăng ký bản quyền.`}
        </Copyright>
        <SocialLinks>
          <a href="#">
            <span className="material-symbols-outlined">alternate_email</span>
          </a>
          {socialLinks.map((link: any, index: number) => (
            <SocialLabel
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </SocialLabel>
          ))}
        </SocialLinks>
      </Container>
    </Footer>
  );
};

export default FooterSection;
