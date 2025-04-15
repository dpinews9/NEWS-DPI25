
import React from 'react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ta } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

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

interface TrendingNewsProps {
  className?: string;
  articles?: Article[];
  onOpenArticle: (id: string, newTab?: boolean) => void;
}

const TrendingNews = ({ className, articles = [], onOpenArticle }: TrendingNewsProps) => {
  // Use provided articles or fallback to placeholders
  const trendingArticles = articles.length > 0 ? articles : [
    {
      id: "trending-1",
      title: "உங்கள் ஆரோக்கியத்தை மேம்படுத்தும் 5 எளிய உணவுகள்",
      content: "உங்கள் உடல் ஆரோக்கியத்தை உயர்த்தும் சூப்பர்ஃபூட்கள்...",
      image_url: "https://via.placeholder.com/120x80",
      created_at: new Date().toISOString(),
      category: "உடல்நலம்"
    },
    {
      id: "trending-2",
      title: "அடுத்த ஆண்டின் தொழில்நுட்ப போக்குகள்",
      content: "வரவிருக்கும் ஆண்டில் எதிர்பார்க்கப்படும் புதிய தொழில்நுட்பங்கள்...",
      image_url: "https://via.placeholder.com/120x80",
      created_at: new Date().toISOString(),
      category: "தொழில்நுட்பம்"
    },
    {
      id: "trending-3",
      title: "உலகளாவிய பொருளாதார வளர்ச்சி எதிர்பார்ப்புகள்",
      content: "2023-ல் உலகளாவிய பொருளாதாரம் எப்படி இருக்கும்?",
      image_url: "https://via.placeholder.com/120x80",
      created_at: new Date().toISOString(),
      category: "வணிகம்"
    },
    {
      id: "trending-4",
      title: "சமீபத்திய திரைப்பட வெளியீடுகள் மதிப்பாய்வு",
      content: "இந்த வாரம் வெளியான புதிய திரைப்படங்கள் குறித்த விமர்சனம்",
      image_url: "https://via.placeholder.com/120x80", 
      created_at: new Date().toISOString(),
      category: "பொழுதுபோக்கு"
    },
    {
      id: "trending-5", 
      title: "அரசியல் மாற்றங்களும் பொருளாதார தாக்கங்களும்",
      content: "அரசியல் மாற்றங்கள் எவ்வாறு பொருளாதாரத்தைப் பாதிக்கின்றன",
      image_url: "https://via.placeholder.com/120x80",
      created_at: new Date().toISOString(),
      category: "அரசியல்"
    }
  ];

  return (
    <section className={cn("py-8", className)}>
      <div className="news-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-news-heading">பிரபலமான செய்திகள்</h2>
          <button className="text-news-accent hover:text-news-accent/80 text-sm font-semibold transition-colors">
            அனைத்தையும் பார்க்க
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {trendingArticles.map((article, index) => (
            <ContextMenu key={article.id || `trending-${index}`}>
              <ContextMenuTrigger asChild>
                <div 
                  className="group cursor-pointer relative"
                  onClick={() => onOpenArticle(article.id, false)}
                >
                  <div className="relative mb-3 aspect-[4/3] rounded-md overflow-hidden">
                    <span className="absolute top-2 left-2 z-10 bg-news-accent text-white text-xs px-2 py-0.5 rounded-full">
                      {index + 1}
                    </span>
                    <div 
                      className="absolute inset-0 bg-center bg-cover transition-transform duration-300 group-hover:scale-105" 
                      style={{ backgroundImage: `url(${article.image_url || 'https://via.placeholder.com/300x200'})` }} 
                    />
                  </div>
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-news-text group-hover:text-news-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <ExternalLink 
                        className="text-news-muted hover:text-news-accent ml-2 mt-1 flex-shrink-0" 
                        size={16} 
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenArticle(article.id, true);
                        }} 
                      />
                    </div>
                    <div className="flex items-center mt-2 text-news-muted text-xs">
                      <span className="bg-gray-200 text-gray-700 rounded px-2 py-0.5">
                        {article.category}
                      </span>
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
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem onClick={() => onOpenArticle(article.id, false)}>
                  இப்பக்கத்தில் திற (Open in this page)
                </ContextMenuItem>
                <ContextMenuItem onClick={() => onOpenArticle(article.id, true)}>
                  புதிய தாவலில் திற (Open in new tab)
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNews;
