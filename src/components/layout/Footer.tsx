
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-news-primary text-white">
      <div className="news-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4 text-white">NewsMirror</h3>
            <p className="text-sm text-gray-300 mb-4">
              Delivering reliable and insightful news coverage from around the world. Stay informed with NewsMirror.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Categories</h3>
            <ul className="space-y-2 text-sm">
              {['Business', 'Technology', 'Politics', 'Science', 'Health', 'Entertainment'].map((category) => (
                <li key={category}>
                  <Link to={`#${category.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Contact', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Get the latest news and updates delivered to your inbox.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-white text-news-primary hover:bg-gray-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 NewsMirror. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white">Privacy Policy</Link>
              <Link to="#" className="hover:text-white">Terms of Service</Link>
              <Link to="#" className="hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
