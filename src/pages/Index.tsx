
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsCategorySection from '@/components/news/NewsCategorySection';
import TrendingNews from '@/components/news/TrendingNews';
import NewsletterSignup from '@/components/news/NewsletterSignup';
import ScrollingHeadlines from '@/components/news/ScrollingHeadlines';
import ImportantNews from '@/components/news/ImportantNews';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

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

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [categorizedArticles, setCategorizedArticles] = useState<Record<string, ArticleType[]>>({});

  useEffect(() => {
    const fetchArticles = async () => {
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
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setArticles(data as ArticleType[]);
          
          const groupedArticles = data.reduce((acc: Record<string, ArticleType[]>, article: ArticleType) => {
            const category = article.category;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(article);
            return acc;
          }, {});
          
          setCategorizedArticles(groupedArticles);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const getArticlesByCategory = (category: string): ArticleType[] => {
    if (loading) {
      return [];
    }
    
    if (categorizedArticles[category]?.length > 0) {
      return categorizedArticles[category];
    }
    
    return [];
  };

  const topHeadlines = articles.slice(0, 10).map(article => ({
    id: article.id,
    title: article.title
  }));

  const handleOpenArticle = (id: string, newTab: boolean = false) => {
    if (newTab) {
      window.open(`/article/${id}`, '_blank');
    } else {
      navigate(`/article/${id}`);
    }
  };

  const importantArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <ScrollingHeadlines 
        headlines={topHeadlines} 
        onOpenArticle={(id) => handleOpenArticle(id, false)} 
      />
      
      <main className="flex-grow">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-news-accent" />
          </div>
        ) : (
          <>
            <FeaturedNews 
              articles={articles.slice(0, 3)} 
              onOpenArticle={handleOpenArticle} 
            />
            
            <ImportantNews 
              articles={importantArticles} 
              onOpenArticle={(id) => handleOpenArticle(id, false)} 
              className="mt-8" 
            />
            
            <TrendingNews 
              className="mt-8" 
              articles={articles.slice(0, 5)} 
              onOpenArticle={handleOpenArticle} 
            />
            
            <div className="bg-white py-8" id="technology">
              <NewsCategorySection 
                category="தொழில்நுட்பம்" 
                articles={getArticlesByCategory('தொழில்நுட்பம்')}
                onOpenArticle={handleOpenArticle}
              />
            </div>
            
            <div className="bg-news-light py-8" id="business">
              <NewsCategorySection 
                category="வணிகம்" 
                articles={getArticlesByCategory('வணிகம்')}
                onOpenArticle={handleOpenArticle}
              />
            </div>
            
            <div className="bg-white py-8" id="health">
              <NewsCategorySection 
                category="உடல்நலம்" 
                articles={getArticlesByCategory('உடல்நலம்')}
                onOpenArticle={handleOpenArticle}
              />
            </div>
            
            <div className="bg-news-light py-8" id="entertainment">
              <NewsCategorySection 
                category="பொழுதுபோக்கு" 
                articles={getArticlesByCategory('பொழுதுபோக்கு')}
                onOpenArticle={handleOpenArticle}
              />
            </div>
            
            <NewsletterSignup />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
