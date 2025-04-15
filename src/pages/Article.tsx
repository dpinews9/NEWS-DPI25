
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ta } from 'date-fns/locale';

type ArticleType = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  source_url: string | null;
  category: string;
  created_at: string;
  author_id: string;
  profiles: {
    username: string;
    full_name: string | null;
  }
};

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select(`
            *,
            profiles:author_id (
              username,
              full_name
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-news-accent" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl">
        கட்டுரை கிடைக்கவில்லை
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white py-8">
        <div className="news-container">
          <div className="mb-4">
            <span className="inline-block bg-news-accent text-white text-sm px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-news-heading mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center text-news-muted mb-6">
            <span>{article.profiles?.full_name || article.profiles?.username || 'தருமபுரி செய்திகள் நிருபர்'}</span>
            <span className="mx-2">•</span>
            <time>
              {formatDistanceToNow(new Date(article.created_at), { 
                addSuffix: true, 
                locale: ta 
              })}
            </time>
          </div>
          
          {article.image_url && (
            <div className="rounded-lg overflow-hidden mb-8">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-auto object-cover max-h-[500px]" 
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-news-text">
                {paragraph}
              </p>
            ))}
          </div>
          
          {article.source_url && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">மூலம்:</p>
              <a 
                href={article.source_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-news-accent hover:underline break-words"
              >
                {article.source_url}
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
