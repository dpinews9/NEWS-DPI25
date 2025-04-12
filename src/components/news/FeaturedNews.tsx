
import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeaturedNewsProps {
  className?: string;
}

const FeaturedNews = ({ className }: FeaturedNewsProps) => {
  // This would normally come from an API
  const mainArticle = {
    id: 1,
    title: "Global Climate Summit Reaches Historic Agreement on Emissions",
    excerpt: "World leaders have reached a groundbreaking consensus on carbon emissions, setting ambitious targets for the next decade.",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1623091410901-00e2d268ee3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    publishedAt: "2 hours ago",
    authorName: "Sarah Johnson",
    authorImage: "https://i.pravatar.cc/150?img=37"
  };

  const secondaryArticles = [
    {
      id: 2,
      title: "Tech Giants Unveil New AI Research Collaboration",
      excerpt: "Leading technology companies announce joint initiative to advance artificial intelligence research and standards.",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      publishedAt: "4 hours ago",
      authorName: "Michael Chen",
      authorImage: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      title: "Medical Breakthrough in Cancer Treatment Shows Promise",
      excerpt: "Researchers announce promising results from clinical trials of new immunotherapy approach to treating aggressive cancers.",
      category: "Health",
      image: "https://images.unsplash.com/photo-1579165466991-467135ad3110?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      publishedAt: "6 hours ago",
      authorName: "Dr. Emily Roberts",
      authorImage: "https://i.pravatar.cc/150?img=25"
    }
  ];

  return (
    <section className={cn("py-8", className)}>
      <div className="news-container">
        <h2 className="text-2xl font-bold mb-6">Featured News</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Article */}
          <div className="lg:col-span-2 article-card overflow-hidden">
            <Link to={`/article/${mainArticle.id}`} className="block group">
              <div className="relative h-64 md:h-96 overflow-hidden">
                <img 
                  src={mainArticle.image} 
                  alt={mainArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <span className="category-badge bg-news-accent text-white mb-2">
                    {mainArticle.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-3">
                    {mainArticle.title}
                  </h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <img 
                      src={mainArticle.authorImage} 
                      alt={mainArticle.authorName} 
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{mainArticle.authorName}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{mainArticle.publishedAt}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Articles */}
          <div className="lg:col-span-1 space-y-6">
            {secondaryArticles.map((article) => (
              <div key={article.id} className="article-card overflow-hidden">
                <Link to={`/article/${article.id}`} className="block group">
                  <div className="grid grid-cols-3 h-full">
                    <div className="h-full col-span-1 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="col-span-2 p-4">
                      <span className="category-badge mb-2">
                        {article.category}
                      </span>
                      <h3 className="text-base font-bold mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center text-news-muted text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
