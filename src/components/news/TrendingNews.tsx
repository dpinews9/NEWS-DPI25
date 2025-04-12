
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
      title: "Stock Markets Hit Record High As Tech Sector Surges",
      publishedAt: "1 hour ago",
      views: "24.5K"
    },
    {
      id: 102,
      title: "New Vaccine Shows 95% Efficacy in Phase 3 Trials",
      publishedAt: "3 hours ago",
      views: "19.2K"
    },
    {
      id: 103,
      title: "Major Film Studio Announces New Streaming Platform",
      publishedAt: "5 hours ago",
      views: "15.7K"
    },
    {
      id: 104,
      title: "Global Supply Chain Issues Lead to Product Shortages",
      publishedAt: "7 hours ago",
      views: "12.9K"
    },
    {
      id: 105,
      title: "Scientists Discover New Species in Amazon Rainforest",
      publishedAt: "9 hours ago",
      views: "10.3K"
    }
  ];

  return (
    <section className={cn("py-8 bg-news-light", className)}>
      <div className="news-container">
        <div className="flex items-center mb-6">
          <TrendingUp className="text-news-accent w-5 h-5 mr-2" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
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
                      <span>{article.views} views</span>
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
