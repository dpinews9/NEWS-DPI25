
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollingHeadlinesProps {
  headlines: {
    id: string;
    title: string;
  }[];
}

const ScrollingHeadlines = ({ headlines }: ScrollingHeadlinesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (headlines.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 5000); // Change headline every 5 seconds
    
    return () => clearInterval(interval);
  }, [headlines.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? headlines.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % headlines.length
    );
  };

  if (headlines.length === 0) return null;

  return (
    <div className="bg-news-primary text-white py-2">
      <div className="news-container flex items-center justify-between">
        <button 
          className="p-1 hover:bg-news-accent/20 rounded-full" 
          onClick={handlePrev} 
          aria-label="Previous headline"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex-1 mx-4 overflow-hidden">
          <div className="whitespace-nowrap overflow-hidden text-ellipsis text-center animate-pulse">
            {headlines[currentIndex]?.title || ''}
          </div>
        </div>
        
        <button 
          className="p-1 hover:bg-news-accent/20 rounded-full" 
          onClick={handleNext}
          aria-label="Next headline"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ScrollingHeadlines;
