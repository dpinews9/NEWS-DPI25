
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
            <h3 className="text-xl font-bold mb-4 text-white">நியூஸ்மிரர்</h3>
            <p className="text-sm text-gray-300 mb-4">
              உலகெங்கிலும் இருந்து நம்பகமான மற்றும் உள்ளார்ந்த செய்தி கவரேஜ் வழங்குகிறது. நியூஸ்மிரர் மூலம் நீங்கள் விழிப்புடன் இருங்கள்.
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
            <h3 className="text-lg font-bold mb-4 text-white">பிரிவுகள்</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'வணிகம்', href: '#business' },
                { name: 'தொழில்நுட்பம்', href: '#technology' },
                { name: 'அரசியல்', href: '#politics' },
                { name: 'அறிவியல்', href: '#science' },
                { name: 'உடல்நலம்', href: '#health' },
                { name: 'பொழுதுபோக்கு', href: '#entertainment' }
              ].map((category) => (
                <li key={category.name}>
                  <Link to={category.href} className="text-gray-300 hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">நிறுவனம்</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'எங்களைப் பற்றி', href: '#' },
                { name: 'தொடர்பு கொள்ள', href: '#' },
                { name: 'வேலைவாய்ப்புகள்', href: '#' },
                { name: 'தனியுரிமைக் கொள்கை', href: '#' },
                { name: 'சேவை விதிமுறைகள்', href: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">எங்கள் நியூஸ்லெட்டரில் சந்தா செய்யுங்கள்</h3>
            <p className="text-sm text-gray-300 mb-4">
              சமீபத்திய செய்திகள் மற்றும் புதுப்பிப்புகளை உங்கள் இன்பாக்ஸில் பெறுங்கள்.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="உங்கள் மின்னஞ்சல் முகவரி" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-white text-news-primary hover:bg-gray-200">
                சந்தா செய்க
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 நியூஸ்மிரர். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white">தனியுரிமைக் கொள்கை</Link>
              <Link to="#" className="hover:text-white">சேவை விதிமுறைகள்</Link>
              <Link to="#" className="hover:text-white">குக்கீ கொள்கை</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
