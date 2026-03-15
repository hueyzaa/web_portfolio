import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import apiClient, { API_URL } from '../../api/apiClient';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const PostDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/posts/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post detail');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-32 text-center text-slate-900 dark:text-white">
          <h1 className="text-4xl font-bold mb-4">Không tìm thấy bài viết</h1>
          <Link to="/blog" className="text-primary-600 hover:underline">Quay lại Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Helmet>
        <title>{post.meta_title || post.title}</title>
        <meta name="description" content={post.meta_description || post.summary || post.content.substring(0, 160)} />
      </Helmet>
      
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <Link to="/blog" className="text-primary-600 mb-8 inline-block hover:underline">← Quay lại Blog</Link>
        
        <header className="mb-8">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span>{new Date(post.published_at).toLocaleDateString('vi-VN')}</span>
            {post.source && <><span className="mx-2">•</span><span>{post.source}</span></>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>
          {post.summary && (
            <p className="text-xl text-slate-600 dark:text-slate-400 italic mb-8">
              {post.summary}
            </p>
          )}
        </header>

        {post.image && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={post.image.startsWith('http') ? post.image : `${API_URL}${post.image}`} 
              alt={post.title} 
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-300">
          {post.content.split('\n').map((line: string, i: number) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default PostDetailPage;
