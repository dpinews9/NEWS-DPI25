
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsCategorySection from '@/components/news/NewsCategorySection';
import TrendingNews from '@/components/news/TrendingNews';
import NewsletterSignup from '@/components/news/NewsletterSignup';
import ScrollingHeadlines from '@/components/news/ScrollingHeadlines';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// In date-fns v3, locale imports have changed
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

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [categorizedArticles, setCategorizedArticles] = useState<Record<string, ArticleType[]>>({});
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);
  const [openArticle, setOpenArticle] = useState<ArticleType | null>(null);

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
          
          // Group articles by category
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

  // Function to get articles by category, ensuring it returns an array not a promise
  const getArticlesByCategory = (category: string): ArticleType[] => {
    if (loading) {
      return [];
    }
    
    // If we have real articles for this category, use them
    if (categorizedArticles[category]?.length > 0) {
      return categorizedArticles[category];
    }
    
    // Return empty array as fallback
    return [];
  };

  // Get top headlines for scrolling component
  const topHeadlines = articles.slice(0, 10).map(article => ({
    id: article.id,
    title: article.title
  }));

  // Handle opening an article
  const handleOpenArticle = (id: string) => {
    const article = articles.find(article => article.id === id);
    if (article) {
      setOpenArticleId(id);
      setOpenArticle(article);
      window.scrollTo(0, 0);
    }
  };

  // Handle closing an article
  const handleCloseArticle = () => {
    setOpenArticleId(null);
    setOpenArticle(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Add scrolling headlines at the top */}
      <ScrollingHeadlines 
        headlines={topHeadlines} 
        onOpenArticle={handleOpenArticle} 
      />
      
      <main className="flex-grow">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-news-accent" />
          </div>
        ) : openArticle ? (
          /* Full Article View */
          <div className="bg-white py-8">
            <div className="news-container">
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-block bg-news-accent text-white text-sm px-3 py-1 rounded-full">
                  {openArticle.category}
                </div>
                <button 
                  onClick={handleCloseArticle}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close article"
                >
                  <X size={24} />
                </button>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-news-heading mb-4">
                {openArticle.title}
              </h1>
              
              <div className="flex items-center text-news-muted mb-6">
                <span>{openArticle.profiles?.full_name || openArticle.profiles?.username || 'நியூஸ்மிரர் நிருபர்'}</span>
                <span className="mx-2">•</span>
                <time>
                  {formatDistanceToNow(new Date(openArticle.created_at), { 
                    addSuffix: true, 
                    locale: ta 
                  })}
                </time>
              </div>
              
              {openArticle.image_url && (
                <div className="rounded-lg overflow-hidden mb-8">
                  <img 
                    src={openArticle.image_url} 
                    alt={openArticle.title} 
                    className="w-full h-auto object-cover max-h-[500px]" 
                  />
                </div>
              )}
              
              <div className="prose prose-lg max-w-none">
                {/* Split content by paragraphs and render them */}
                {openArticle.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-news-text">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {openArticle.source_url && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">மூலம்:</p>
                  <a 
                    href={openArticle.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-news-accent hover:underline break-words"
                  >
                    {openArticle.source_url}
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <FeaturedNews articles={articles.slice(0, 3)} onOpenArticle={handleOpenArticle} />
            
            <TrendingNews className="mt-8" articles={articles.slice(0, 5)} onOpenArticle={handleOpenArticle} />
            
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
