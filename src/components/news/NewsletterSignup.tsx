
import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  className?: string;
}

const NewsletterSignup = ({ className }: NewsletterSignupProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the newsletter signup logic here
    console.log('Newsletter signup submitted');
  };

  return (
    <section className={cn("py-12 bg-news-primary", className)}>
      <div className="news-container">
        <div className="max-w-3xl mx-auto text-center text-white">
          <Mail className="w-12 h-12 mb-4 mx-auto text-news-accent" />
          <h2 className="text-3xl font-bold mb-4">Stay updated with the latest news</h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter and receive the most important news directly to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-grow"
            />
            <Button type="submit" className="bg-news-accent hover:bg-news-accent/90 text-white">
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-gray-400 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from NewsMirror.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
