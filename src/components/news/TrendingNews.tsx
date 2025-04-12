
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendingNewsProps {
  className?: string;
}

const TrendingNews = ({ className }: TrendingNewsProps) => {
  // This would normally come from an API
  const trendingArticles = [
    {
      id: 101,
      title: "டெக் துறை உயர்வால் பங்குச் சந்தை சாதனை உயரத்தை தொட்டது",
      publishedAt: "1 மணி நேரத்திற்கு முன்",
      views: "24.5K"
    },
    {
      id: 102,
      title: "புதிய தடுப்பூசி மூன்றாம் கட்ட சோதனையில் 95% திறன் காட்டியது",
      publishedAt: "3 மணி நேரத்திற்கு முன்",
      views: "19.2K"
    },
    {
      id: 103,
      title: "பிரபல திரைப்பட நிறுவனம் புதிய ஸ்ட்ரீமிங் தளத்தை அறிவித்தது",
      publishedAt: "5 மணி நேரத்திற்கு முன்",
      views: "15.7K"
    },
    {
      id: 104,
      title: "உலகளாவிய விநியோக சங்கிலி பிரச்சனைகள் பொருள் பற்றாக்குறையை ஏற்படுத்துகின்றன",
      publishedAt: "7 மணி நேரத்திற்கு முன்",
      views: "12.9K"
    },
    {
      id: 105,
      title: "விஞ்ஞானிகள் அமேசான் காடுகளில் புதிய உயிரினங்களை கண்டுபிடித்தனர்",
      publishedAt: "9 மணி நேரத்திற்கு முன்",
      views: "10.3K"
    }
  ];

  return (
    <section className={cn("py-8 bg-news-light", className)}>
      <div className="news-container">
        <div className="flex items-center mb-6">
          <TrendingUp className="text-news-accent w-5 h-5 mr-2" />
          <h2 className="text-2xl font-bold">டிரெண்டிங் செய்திகள்</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          {trendingArticles.map((article, index) => (
            <React.Fragment key={article.id}>
              <Link to={`/article/${article.id}`} className="block group">
                <div className="flex items-center p-4 hover:bg-news-hover transition-colors">
                  <div className="text-xl font-bold text-news-accent w-8">
                    {index + 1}
                  </div>
                  <div className="flex-grow pr-4">
                    <h3 className="font-medium group-hover:text-news-accent transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-news-muted text-xs mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{article.publishedAt}</span>
                      <span className="mx-1">•</span>
                      <span>{article.views} பார்வைகள்</span>
                    </div>
                  </div>
                </div>
              </Link>
              {index < trendingArticles.length - 1 && (
                <div className="border-b border-news-border mx-4"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNews;
