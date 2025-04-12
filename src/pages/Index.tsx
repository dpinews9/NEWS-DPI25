
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsCategorySection from '@/components/news/NewsCategorySection';
import TrendingNews from '@/components/news/TrendingNews';
import NewsletterSignup from '@/components/news/NewsletterSignup';
import { businessArticles, technologyArticles, healthArticles, entertainmentArticles } from '@/data/mockNewsData';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <FeaturedNews />
        
        <TrendingNews className="mt-8" />
        
        <div className="bg-white py-8">
          <NewsCategorySection 
            category="தொழில்நுட்பம்" 
            articles={technologyArticles}
          />
        </div>
        
        <div className="bg-news-light py-8">
          <NewsCategorySection 
            category="வணிகம்" 
            articles={businessArticles}
          />
        </div>
        
        <div className="bg-white py-8">
          <NewsCategorySection 
            category="உடல்நலம்" 
            articles={healthArticles}
          />
        </div>
        
        <div className="bg-news-light py-8">
          <NewsCategorySection 
            category="பொழுதுபோக்கு" 
            articles={entertainmentArticles}
          />
        </div>
        
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
