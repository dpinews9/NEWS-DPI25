
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsCategorySectionProps {
  category: string;
  articles: {
    id: number;
    title: string;
    excerpt?: string;
    image: string;
    publishedAt: string;
    authorName?: string;
    authorImage?: string;
  }[];
  className?: string;
}

const NewsCategorySection = ({ category, articles, className }: NewsCategorySectionProps) => {
  return (
    <section className={cn("py-8", className)}>
      <div className="news-container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{category}</h2>
          <Link 
            to={`/category/${category.toLowerCase()}`}
            className="text-news-accent hover:text-news-primary text-sm font-medium"
          >
            அனைத்தையும் காண்க
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="article-card overflow-hidden flex flex-col h-full">
              <Link to={`/article/${article.id}`} className="block group h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-base font-bold mb-2 line-clamp-2 group-hover:text-news-accent transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-news-muted text-sm line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center text-news-muted text-xs">
                    {article.authorImage && (
                      <img 
                        src={article.authorImage} 
                        alt={article.authorName} 
                        className="w-5 h-5 rounded-full mr-2"
                      />
                    )}
                    {article.authorName && (
                      <>
                        <span>{article.authorName}</span>
                        <span className="mx-1">•</span>
                      </>
                    )}
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{article.publishedAt}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsCategorySection;
