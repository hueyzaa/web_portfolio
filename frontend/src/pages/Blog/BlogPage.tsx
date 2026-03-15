import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient, { API_URL } from '../../api/apiClient';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import NewsGrid from '../../components/news/NewsGrid';
import NewsFilterTabs from '../../components/news/NewsFilterTabs';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #0f172a;
  color: white;
  overflow-x: hidden;
`;

const BackgroundAura = styled.div`
  position: fixed;
  top: -10%;
  right: -10%;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%);
  z-index: 0;
  pointer-events: none;
`;

const HeroSection = styled.section`
  position: relative;
  padding-top: 8rem;
  padding-bottom: 4rem;
  z-index: 1;
`;

const HeroGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const MainFeatured = styled(motion.div)`
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  aspect-ratio: 16/9;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent 60%);
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const BlogPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [featuredNews, setFeaturedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Design', 'Branding'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, newsRes, featuredNewsRes] = await Promise.all([
          apiClient.get('/posts'),
          apiClient.get(`/news?category=${activeCategory}`),
          apiClient.get('/news/featured')
        ]);
        setPosts(postsRes.data);
        setNews(newsRes.data);
        setFeaturedNews(featuredNewsRes.data);
      } catch (error) {
        console.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCategory]);

  const blogFeatured = posts.filter(p => p.is_featured);
  const primaryFeatured = blogFeatured[0] || featuredNews[0];

  return (
    <PageWrapper>
      <Helmet>
        <title>Blog & Tin tức | Phan Gia Mẫn</title>
        <meta name="description" content="Khám phá xu hướng thiết kế đồ họa và công nghệ mới nhất." />
      </Helmet>
      <BackgroundAura />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <HeroSection>
          <header className="mb-12">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
            >
              Cảm hứng & <br/><span className="text-primary-500">Tin tức thiết kế</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-xl max-w-2xl leading-relaxed"
            >
              Tổng hợp những xu hướng, kiến thức và câu chuyện truyền cảm hứng từ thế giới đồ họa & công nghệ.
            </motion.p>
          </header>

          {loading ? (
            <div className="flex justify-center items-center h-64">
               <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            primaryFeatured && (
              <HeroGrid>
                <MainFeatured
                  whileHover={{ scale: 0.99 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={primaryFeatured.image ? (primaryFeatured.image.startsWith('http') ? primaryFeatured.image : `${API_URL}${primaryFeatured.image}`) : primaryFeatured.thumbnail || 'https://via.placeholder.com/1200x675'} 
                    alt={primaryFeatured.title} 
                  />
                  <div className="overlay">
                    <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">NỔI BẬT</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 line-clamp-2 leading-tight">
                      {primaryFeatured.title}
                    </h2>
                    <p className="text-slate-200 text-lg line-clamp-2 max-w-3xl mb-8">
                      {primaryFeatured.summary || primaryFeatured.description}
                    </p>
                    {primaryFeatured.slug ? (
                      <Link to={`/blog/${primaryFeatured.slug}`} className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold w-fit hover:bg-primary-500 hover:text-white transition-all shadow-xl shadow-white/5">Đọc bài viết</Link>
                    ) : (
                      <a href={primaryFeatured.url} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold w-fit hover:bg-primary-500 hover:text-white transition-all shadow-xl shadow-white/5">Xem nguồn tin</a>
                    )}
                  </div>
                </MainFeatured>
              </HeroGrid>
            )
          )}
        </HeroSection>

        {!loading && (
          <section className="py-20 border-t border-white/5">
            <SectionHeader>
              <div>
                <h2 className="text-3xl font-bold mb-2">Dòng sự kiện</h2>
                <p className="text-slate-500">Khám phá nội dung theo chủ đề bạn quan tâm</p>
              </div>
              <NewsFilterTabs 
                categories={categories} 
                activeCategory={activeCategory} 
                onCategoryChange={(cat) => {
                  setLoading(true);
                  setActiveCategory(cat);
                }} 
              />
            </SectionHeader>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NewsGrid newsList={news} />
              </motion.div>
            </AnimatePresence>
          </section>
        )}
      </main>

      <Footer />
    </PageWrapper>
  );
};

export default BlogPage;
