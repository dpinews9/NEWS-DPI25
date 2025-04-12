
import React from 'react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ta } from 'date-fns/locale';

type Article = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  category: string;
  profiles?: {
    username: string;
    full_name: string | null;
  }
};

interface FeaturedNewsProps {
  className?: string;
  articles?: Article[];
}

const FeaturedNews = ({ className, articles = [] }: FeaturedNewsProps) => {
  // Use first 3 articles or fallback to placeholder if not enough articles
  const featuredArticles = articles.length >= 3 ? articles.slice(0, 3) : [
    {
      id: 'placeholder-1',
      title: 'தொழில்நுட்ப துறையில் புதிய முன்னேற்றங்கள்',
      content: 'தொழில்நுட்ப உலகில் சமீபத்திய வளர்ச்சிகள் பற்றி முக்கிய புதுப்பிப்புகள்.',
      image_url: 'https://via.placeholder.com/1200x800',
      created_at: new Date().toISOString(),
      category: 'தொழில்நுட்பம்'
    },
    {
      id: 'placeholder-2',
      title: 'உலகளாவிய பொருளாதார மாற்றங்கள்',
      content: 'உலகளாவிய பொருளாதாரத்தில் சமீபத்திய போக்குகள் மற்றும் நிதி சந்தை அறிக்கைகள்.',
      image_url: 'https://via.placeholder.com/1200x800',
      created_at: new Date().toISOString(),
      category: 'வணிகம்'
    },
    {
      id: 'placeholder-3',
      title: 'நலம் மற்றும் ஆரோக்கியம் குறித்த அறிவுரைகள்',
      content: 'ஆரோக்கியத்தை மேம்படுத்துவதற்கான தேர்ந்தெடுக்கப்பட்ட குறிப்புகள் மற்றும் ஆலோசனைகள்.',
      image_url: 'https://via.placeholder.com/1200x800',
      created_at: new Date().toISOString(),
      category: 'உடல்நலம்'
    }
  ];

  return (
    <section className={cn("bg-news-primary py-12", className)}>
      <div className="news-container">
        <h2 className="text-3xl font-bold text-white mb-8">முக்கிய செய்திகள்</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Featured Article */}
          <div className="col-span-1 md:col-span-2 relative rounded-lg overflow-hidden h-96 group">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${featuredArticles[0]?.image_url || 'https://via.placeholder.com/1200x800'})`,
                backgroundSize: 'cover'
              }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="bg-news-accent text-white text-xs px-3 py-1 rounded-full mb-3 inline-block">
                {featuredArticles[0]?.category || 'முக்கிய செய்தி'}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-news-accent transition-colors">{featuredArticles[0]?.title}</h3>
              <p className="text-gray-200 mb-2 line-clamp-2">
                {featuredArticles[0]?.content}
              </p>
              <div className="flex items-center text-gray-300 text-sm">
                <span>{featuredArticles[0]?.profiles?.full_name || featuredArticles[0]?.profiles?.username || 'நியூஸ்மிரர் நிருபர்'}</span>
                <span className="mx-2">•</span>
                <time>
                  {featuredArticles[0]?.created_at 
                    ? formatDistanceToNow(new Date(featuredArticles[0].created_at), { 
                        addSuffix: true, 
                        locale: ta 
                      })
                    : ''}
                </time>
              </div>
            </div>
            <a href={`#article/${featuredArticles[0]?.id}`} className="absolute inset-0" aria-label={featuredArticles[0]?.title} />
          </div>
          
          {/* Secondary Featured Articles */}
          <div className="col-span-1 space-y-6">
            {featuredArticles.slice(1, 3).map((article, index) => (
              <div key={article.id || `secondary-${index}`} className="relative rounded-lg overflow-hidden h-[calc(192px-0.75rem)] group">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: `url(${article.image_url || 'https://via.placeholder.com/600x400'})`,
                    backgroundSize: 'cover'
                  }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="bg-news-accent text-white text-xs px-2 py-0.5 rounded-full mb-2 inline-block">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-news-accent transition-colors">{article.title}</h3>
                  <div className="flex items-center text-gray-300 text-xs mt-2">
                    <span>{article.profiles?.full_name || article.profiles?.username || 'நியூஸ்மிரர் நிருபர்'}</span>
                    <span className="mx-2">•</span>
                    <time>
                      {article.created_at 
                        ? formatDistanceToNow(new Date(article.created_at), { 
                            addSuffix: true, 
                            locale: ta 
                          })
                        : ''}
                    </time>
                  </div>
                </div>
                <a href={`#article/${article.id}`} className="absolute inset-0" aria-label={article.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
