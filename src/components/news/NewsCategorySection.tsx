
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ta } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';
import ArticleContextMenu from './ArticleContextMenu';

type Article = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  profiles?: {
    username: string;
    full_name: string | null;
  }
};

interface NewsCategorySectionProps {
  category: string;
  articles: Article[];
  onOpenArticle: (id: string, newTab?: boolean) => void;
}

const NewsCategorySection = ({ category, articles = [], onOpenArticle }: NewsCategorySectionProps) => {
  // Ensure we have at least some articles to display
  const displayArticles = articles.length > 0 ? articles : [
    {
      id: "mock-1",
      title: "இந்தப் பிரிவில் முக்கிய செய்தி தலைப்பு",
      content: "இந்த செய்தி பற்றிய விரிவான விளக்கம் இங்கே இருக்கும்...",
      image_url: "https://via.placeholder.com/600x400",
      created_at: new Date().toISOString()
    },
    {
      id: "mock-2",
      title: "மற்றொரு முக்கிய செய்தி தலைப்பு",
      content: "இந்த செய்தி பற்றிய விரிவான விளக்கம் இங்கே இருக்கும்...",
      image_url: "https://via.placeholder.com/600x400",
      created_at: new Date().toISOString()
    },
    {
      id: "mock-3",
      title: "மூன்றாவது முக்கிய செய்தி",
      content: "இந்த செய்தி பற்றிய விரிவான விளக்கம் இங்கே இருக்கும்...",
      image_url: "https://via.placeholder.com/600x400",
      created_at: new Date().toISOString()
    },
    {
      id: "mock-4",
      title: "நான்காவது முக்கிய செய்தி",
      content: "இந்த செய்தி பற்றிய விரிவான விளக்கம் இங்கே இருக்கும்...", 
      image_url: "https://via.placeholder.com/600x400",
      created_at: new Date().toISOString()
    }
  ];

  // Extract main article and remaining articles
  const mainArticle = displayArticles[0];
  const remainingArticles = displayArticles.slice(1, 4);

  return (
    <div className="news-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-news-heading">{category}</h2>
        <button className="text-news-accent hover:text-news-accent/80 text-sm font-semibold transition-colors">
          அனைத்தையும் பார்க்க
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Article */}
        <div className="lg:col-span-2">
          <ArticleContextMenu id={mainArticle.id} onOpenArticle={onOpenArticle}>
            <div className="group block relative">
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${mainArticle.image_url || 'https://via.placeholder.com/800x600'})` }} 
                />
              </div>
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-news-heading group-hover:text-news-accent transition-colors mb-2">
                  {mainArticle.title}
                </h3>
                <ExternalLink 
                  className="text-news-muted hover:text-news-accent ml-2 mt-1 flex-shrink-0" 
                  size={18} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenArticle(mainArticle.id, true);
                  }} 
                />
              </div>
              <p className="text-news-text line-clamp-3 mb-3">
                {mainArticle.content}
              </p>
              <div className="flex items-center text-news-muted text-sm">
                <span>{mainArticle.profiles?.full_name || mainArticle.profiles?.username || 'தருமபுரி செய்திகள் நிருபர்'}</span>
                <span className="mx-2">•</span>
                <time>
                  {mainArticle.created_at 
                    ? formatDistanceToNow(new Date(mainArticle.created_at), { 
                        addSuffix: true, 
                        locale: ta 
                      })
                    : ''}
                </time>
              </div>
            </div>
          </ArticleContextMenu>
        </div>
        
        {/* Secondary Articles */}
        <div className="space-y-6">
          {remainingArticles.map((article) => (
            <ArticleContextMenu 
              key={article.id} 
              id={article.id}
              onOpenArticle={onOpenArticle}
            >
              <div className="flex items-start gap-4 group relative">
                <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
                    style={{ backgroundImage: `url(${article.image_url || 'https://via.placeholder.com/300x300'})` }} 
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-news-heading group-hover:text-news-accent transition-colors line-clamp-2 mb-1">
                      {article.title}
                    </h3>
                    <ExternalLink 
                      className="text-news-muted hover:text-news-accent ml-2 flex-shrink-0" 
                      size={14} 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenArticle(article.id, true);
                      }} 
                    />
                  </div>
                  <time className="text-news-muted text-xs">
                    {article.created_at 
                      ? formatDistanceToNow(new Date(article.created_at), { 
                          addSuffix: true, 
                          locale: ta 
                        })
                      : ''}
                  </time>
                </div>
              </div>
            </ArticleContextMenu>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCategorySection;
