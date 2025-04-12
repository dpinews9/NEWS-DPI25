
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, LogOut, PenSquare, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { name: 'வணிகம்', href: '#business' },
  { name: 'தொழில்நுட்பம்', href: '#technology' },
  { name: 'அரசியல்', href: '#politics' },
  { name: 'அறிவியல்', href: '#science' },
  { name: 'உடல்நலம்', href: '#health' },
  { name: 'பொழுதுபோக்கு', href: '#entertainment' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "வெளியேறியது",
      description: "வெற்றிகரமாக வெளியேறினீர்கள்",
    });
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-news-border">
      <div className="news-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-news-primary">நியூஸ்மிரர்</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-sm font-medium text-news-text hover:text-news-accent transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Auth and Search Actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex text-news-text hover:text-news-accent"
                  onClick={() => navigate('/create-article')}
                >
                  <PenSquare className="mr-2 h-4 w-4" />
                  புதிய கட்டுரை
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex text-news-text hover:text-news-accent"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  வெளியேறு
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex text-news-text hover:text-news-accent"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                உள்நுழைக / பதிவு செய்க
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="text-news-muted hover:text-news-primary"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-news-muted hover:text-news-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={cn(
          "mt-4 transition-all duration-300 ease-in-out",
          isSearchOpen ? "h-12" : "h-0 overflow-hidden"
        )}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-news-muted" />
            <input
              type="text"
              placeholder="செய்திகளைத் தேடு..."
              className="w-full h-12 pl-10 pr-4 rounded-md border border-news-border focus:outline-none focus:ring-2 focus:ring-news-accent/20 focus:border-news-accent"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-[500px]" : "max-h-0"
        )}>
          <nav className="flex flex-col space-y-4 py-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-base font-medium text-news-text hover:text-news-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link
                  to="/create-article"
                  className="flex items-center text-base font-medium text-news-text hover:text-news-accent transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PenSquare className="mr-2 h-4 w-4" />
                  புதிய கட்டுரை
                </Link>
                
                <button
                  className="flex items-center text-base font-medium text-news-text hover:text-news-accent transition-colors py-2"
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  வெளியேறு
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center text-base font-medium text-news-text hover:text-news-accent transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="mr-2 h-4 w-4" />
                உள்நுழைக / பதிவு செய்க
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
