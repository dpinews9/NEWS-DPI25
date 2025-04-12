
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { User } from '@supabase/supabase-js';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          navigate('/');
        } else {
          setUser(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast({
          title: "உள்நுழைந்தது",
          description: "வெற்றிகரமாக உள்நுழைந்தீர்கள்",
        });
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              full_name: fullName,
            },
          },
        });

        if (signUpError) throw signUpError;
        toast({
          title: "கணக்கு உருவாக்கப்பட்டது",
          description: "உங்கள் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது",
        });
      }
    } catch (error: any) {
      toast({
        title: "பிழை",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'உள்நுழைக' : 'பதிவு செய்க'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin 
                ? 'நியூஸ்மிரர் கணக்கில் உள்நுழையவும்' 
                : 'நியூஸ்மிரர் கணக்கை உருவாக்கவும்'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">பயனர்பெயர்</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">முழு பெயர்</Label>
                  <Input 
                    id="fullName" 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">மின்னஞ்சல்</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">கடவுச்சொல்</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                minLength={6} 
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'செயலாக்குகிறது...' : isLogin ? 'உள்நுழைக' : 'பதிவு செய்க'}
            </Button>
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-sm text-news-accent hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? 'கணக்கு இல்லையா? பதிவு செய்யவும்' 
                : 'ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
