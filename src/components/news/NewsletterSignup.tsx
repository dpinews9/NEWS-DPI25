
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
          <h2 className="text-3xl font-bold mb-4">சமீபத்திய செய்திகளைப் பெறுங்கள்</h2>
          <p className="text-lg text-gray-300 mb-8">
            எங்கள் நியூஸ்லெட்டரில் பதிவு செய்து மிக முக்கியமான செய்திகளை நேரடியாக உங்கள் மின்னஞ்சலில் பெறுங்கள்.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="உங்கள் மின்னஞ்சல் முகவரி" 
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-grow"
            />
            <Button type="submit" className="bg-news-accent hover:bg-news-accent/90 text-white">
              சந்தா செய்க
            </Button>
          </form>
          
          <p className="text-xs text-gray-400 mt-4">
            பதிவு செய்வதன் மூலம், எங்களின் தனியுரிமைக் கொள்கையை ஏற்றுக்கொள்கிறீர்கள் மற்றும் நியூஸ்மிரர் இருந்து புதுப்பிப்புகளைப் பெற சம்மதிக்கிறீர்கள்.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
