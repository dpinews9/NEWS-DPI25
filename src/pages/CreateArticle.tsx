
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Image, Loader2 } from 'lucide-react';

type FormValues = {
  title: string;
  content: string;
  category: string;
  sourceUrl?: string;
};

const categories = [
  'வணிகம்', 
  'தொழில்நுட்பம்', 
  'அரசியல்', 
  'அறிவியல்', 
  'உடல்நலம்', 
  'பொழுதுபோக்கு'
];

const CreateArticle = () => {
  const { user, loading: userLoading } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      content: '',
      category: categories[0],
      sourceUrl: '',
    },
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!userLoading && !user) {
      toast({
        title: "அணுகல் மறுக்கப்பட்டது",
        description: "கட்டுரைகளை உருவாக்க உள்நுழைய வேண்டும்",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, userLoading, navigate, toast]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "படம் மிகப் பெரியது",
        description: "படம் 5MB க்கும் குறைவாக இருக்க வேண்டும்",
        variant: "destructive",
      });
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: FormValues) => {
    if (!user) return;
    
    try {
      setSubmitting(true);
      
      let imageUrl = null;
      
      // Upload image if exists
      if (imageFile) {
        setIsUploading(true);
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('article_images')
          .upload(filePath, imageFile);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL
        const { data } = supabase.storage
          .from('article_images')
          .getPublicUrl(filePath);
        
        imageUrl = data.publicUrl;
        setIsUploading(false);
      }
      
      // Enforce content length limit
      if (values.content.length > 1500) {
        toast({
          title: "உள்ளடக்கம் மிக நீளமானது",
          description: "உங்கள் கட்டுரை 1500 சொற்களுக்கு மேல் இருக்கக்கூடாது",
          variant: "destructive",
        });
        return;
      }
      
      // Insert article
      const { error: insertError } = await supabase
        .from('articles')
        .insert({
          title: values.title,
          content: values.content,
          category: values.category,
          source_url: values.sourceUrl || null,
          image_url: imageUrl,
          author_id: user.id,
        });
      
      if (insertError) {
        throw insertError;
      }
      
      toast({
        title: "கட்டுரை வெளியிடப்பட்டது",
        description: "உங்கள் கட்டுரை வெற்றிகரமாக வெளியிடப்பட்டது",
      });
      
      // Redirect to home
      navigate('/');
      
    } catch (error: any) {
      toast({
        title: "பிழை",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      setIsUploading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-news-accent" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="news-container max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">புதிய கட்டுரை உருவாக்கவும்</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>தலைப்பு</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="உங்கள் கட்டுரை தலைப்பை உள்ளிடவும்..." 
                        {...field} 
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>வகை</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <Label htmlFor="image">கட்டுரை படம் (விருப்பத்தேர்வு)</Label>
                <div className="flex items-center space-x-4">
                  <label 
                    htmlFor="image"
                    className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded cursor-pointer hover:bg-secondary/80 transition-colors"
                  >
                    <Image className="mr-2 h-5 w-5" />
                    படத்தைத் தேர்ந்தெடுக்கவும்
                  </label>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {isUploading && <Loader2 className="h-5 w-5 animate-spin text-news-accent" />}
                </div>
                
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">படம் முன்னோட்டம்:</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-64 rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>உள்ளடக்கம் (அதிகபட்சம் 1500 சொற்கள்)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="உங்கள் கட்டுரை உள்ளடக்கத்தை உள்ளிடவும்..." 
                        className="min-h-[200px]" 
                        {...field} 
                        required
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      {field.value.length}/1500 எழுத்துக்கள்
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sourceUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>மூல URL (விருப்பத்தேர்வு)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="மூல இணையதளத்தை உள்ளிடவும்..." 
                        type="url"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={submitting || isUploading}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    சமர்ப்பிக்கிறது...
                  </>
                ) : "கட்டுரையை வெளியிடவும்"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateArticle;
