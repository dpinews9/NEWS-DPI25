
import React from 'react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ta } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

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

interface ImportantNewsProps {
  className?: string;
  articles?: Article[];
  onOpenArticle: (id: string) => void;
}

const ImportantNews = ({ className, articles = [], onOpenArticle }: ImportantNewsProps) => {
  // Use provided articles or fallback to placeholders
  const importantArticles = articles.length > 0 ? articles : [
    {
      id: "important-1",
      title: "தமிழகத்தில் புதிய தொழில் கொள்கை அறிவிப்பு: 10 லட்சம் புதிய வேலைவாய்ப்புகள்",
      content: "தமிழக அரசு புதிய தொழில் கொள்கையை அறிவித்துள்ளது. இந்த கொள்கையின் மூலம் அடுத்த ஐந்து ஆண்டுகளில் 10 லட்சம் புதிய வேலைவாய்ப்புகள் உருவாக்கப்படும் என்று தெரிவிக்கப்பட்டுள்ளது.",
      image_url: "https://via.placeholder.com/800x400",
      created_at: new Date().toISOString(),
      category: "அரசியல்"
    },
    {
      id: "important-2",
      title: "கல்வித்துறையில் புதிய மாற்றங்கள்: டிஜிட்டல் கல்வி திட்டம் அறிமுகம்",
      content: "தமிழக அரசு மாணவர்களுக்கான டிஜிட்டல் கல்வித் திட்டத்தை அறிமுகப்படுத்தியுள்ளது. இந்த திட்டத்தின் மூலம் அனைத்து பள்ளி மாணவர்களும் டிஜிட்டல் முறையில் கல்வி கற்க முடியும்.",
      image_url: "https://via.placeholder.com/800x400",
      created_at: new Date().toISOString(),
      category: "கல்வி"
    },
    {
      id: "important-3",
      title: "சென்னையில் புதிய மெட்ரோ ரயில் திட்டம்: 118 கிலோமீட்டர் நீளம்",
      content: "சென்னையில் மூன்றாம் கட்ட மெட்ரோ ரயில் திட்டத்திற்கு மத்திய அரசு ஒப்புதல் அளித்துள்ளது. இத்திட்டத்தின் மூலம் சென்னை நகரின் போக்குவரத்து நெரிசல் குறையும் என எதிர்பார்க்கப்படுகிறது.",
      image_url: "https://via.placeholder.com/800x400",
      created_at: new Date().toISOString(),
      category: "போக்குவரத்து"
    }
  ];

  return (
    <section className={cn("py-8 bg-white", className)}>
      <div className="news-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-news-heading flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-news-accent" />
            முக்கிய செய்திகள்
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {importantArticles.map((article, index) => (
            <Card 
              key={article.id || `important-${index}`} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border-news-accent/20"
              onClick={() => onOpenArticle(article.id)}
            >
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-center bg-cover transition-transform duration-300 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${article.image_url || 'https://via.placeholder.com/400x300'})` }} 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-news-accent text-white mb-2">
                    {article.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-news-heading group-hover:text-news-accent transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {article.content}
                </p>
                <div className="flex items-center text-news-muted text-xs">
                  <span>{article.profiles?.full_name || article.profiles?.username || 'தருமபுரி செய்திகள் நிருபர்'}</span>
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportantNews;
