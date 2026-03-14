import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import apiClient from "../api/apiClient";
import { message } from "antd";

const SectionWrapper = styled.section`
  padding: 6rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  gap: 5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.span`
  color: var(--primary-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  color: white;
  margin-top: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: #94a3b8;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const InfoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #cbd5e1;
  font-size: 1.125rem;
  transition: color 0.3s;
  
  &:hover {
    color: var(--primary-color);
  }

  .icon {
    width: 3rem;
    height: 3rem;
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    span {
      font-size: 1.25rem;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.a`
  width: 3rem;
  height: 3rem;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
  
  &:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: currentColor;
  }
`;

const FormSide = styled.div`
  background: rgba(15, 23, 42, 0.5);
  padding: 2.5rem;
  border-radius: 1.5rem;
  border: 1px solid #1e293b;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroupGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubmitBtn = styled.button`
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(13, 89, 242, 0.2);
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ContactSection = () => {
  const [settings, setSettings] = useState<any>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Freelance Inquiry",
    message: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get("/settings");
        setSettings(response.data);
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/contact", formData);
      message.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "Freelance Inquiry", message: "" });
    } catch (err) {
      message.error("Failed to send message.");
    }
  };

  return (
    <SectionWrapper id="contact">
      <Grid>
        <InfoSide>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Label>{settings.contact_label || "LIÊN HỆ"}</Label>
            <Title>{settings.contact_title || "Hãy cùng nhau hợp tác"}</Title>
            <Description>
              {settings.contact_description || 
                "Bạn có một dự án trong tâm trí? Hãy liên hệ và cùng nhau tạo ra điều gì đó phi thường. Tôi sẵn sàng cho các dự án tự do và hợp tác nghệ thuật."
              }
            </Description>
            <ContactInfo>
              <InfoLink href={`mailto:${settings.contact_email || "hello@phangiaman.com"}`}>
                <div className="icon">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <span>{settings.contact_email || "hello@phangiaman.com"}</span>
              </InfoLink>
            </ContactInfo>
            <SocialIcons>
              {settings.contact_instagram && settings.contact_instagram !== "#" && (
                <SocialIcon href={settings.contact_instagram} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.063-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </SocialIcon>
              )}
              {settings.contact_facebook && settings.contact_facebook !== "#" && (
                <SocialIcon href={settings.contact_facebook} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"></path></svg>
                </SocialIcon>
              )}
              {settings.contact_linkedin && settings.contact_linkedin !== "#" && (
                <SocialIcon href={settings.contact_linkedin} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </SocialIcon>
              )}
            </SocialIcons>
          </motion.div>
        </InfoSide>
        <FormSide>
          <Form onSubmit={handleSubmit}>
            <FormGroupGrid>
              <Field>
                <FieldLabel>Tên</FieldLabel>
                <Input 
                  placeholder="Nguyễn Văn A" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input 
                  type="email" 
                  placeholder="ten@vi-du.com" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </Field>
            </FormGroupGrid>
            <Field>
              <FieldLabel>Chủ đề</FieldLabel>
              <Select 
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              >
                <option>Yêu cầu công việc</option>
                <option>Hợp tác</option>
                <option>Khác</option>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Tin nhắn</FieldLabel>
              <TextArea 
                placeholder="Tin nhắn của bạn ở đây..." 
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                required 
              />
            </Field>
            <SubmitBtn type="submit">Gửi Tin nhắn</SubmitBtn>
          </Form>
        </FormSide>
      </Grid>
    </SectionWrapper>
  );
};

export default ContactSection;
