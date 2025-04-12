
// Mock data for news articles
// In a real application, this would come from an API

export interface NewsArticle {
  id: number;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  image: string;
  publishedAt: string;
  authorName: string;
  authorImage: string;
  views?: string;
  comments?: number;
}

export const technologyArticles: NewsArticle[] = [
  {
    id: 201,
    title: "New Smartphone Models Feature Advanced AI Capabilities",
    excerpt: "Latest flagship devices include on-device machine learning for enhanced photography and voice recognition.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "3 hours ago",
    authorName: "Alex Rivera",
    authorImage: "https://i.pravatar.cc/150?img=11",
    views: "12.4K",
  },
  {
    id: 202,
    title: "Quantum Computing Breakthrough Announced by Research Team",
    excerpt: "Scientists achieve stability milestone in quantum computing, bringing practical applications closer to reality.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "5 hours ago",
    authorName: "Dr. Lisa Chen",
    authorImage: "https://i.pravatar.cc/150?img=5",
    views: "9.8K",
  },
  {
    id: 203,
    title: "Electric Vehicle Startup Secures $2 Billion in New Funding",
    excerpt: "Emerging EV manufacturer announces expansion plans following successful investment round.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "7 hours ago",
    authorName: "Mark Johnson",
    authorImage: "https://i.pravatar.cc/150?img=15",
    views: "8.7K",
  },
  {
    id: 204,
    title: "Major Software Update Brings New Features to Popular Operating System",
    excerpt: "Latest release includes enhanced security measures and productivity tools for millions of users.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "9 hours ago",
    authorName: "Sophia Lee",
    authorImage: "https://i.pravatar.cc/150?img=20",
    views: "7.2K",
  }
];

export const businessArticles: NewsArticle[] = [
  {
    id: 301,
    title: "Global Markets Rally as Economic Outlook Improves",
    excerpt: "Stock indices reach record highs following positive economic indicators and central bank announcements.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "2 hours ago",
    authorName: "Robert Chen",
    authorImage: "https://i.pravatar.cc/150?img=58",
    views: "15.3K",
  },
  {
    id: 302,
    title: "Retail Giant Announces Major Expansion into International Markets",
    excerpt: "Company plans to open hundreds of new stores across Asia and Europe over the next five years.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "4 hours ago",
    authorName: "Jennifer Taylor",
    authorImage: "https://i.pravatar.cc/150?img=29",
    views: "11.7K",
  },
  {
    id: 303,
    title: "Startup Raises $150 Million in Series C Funding Round",
    excerpt: "Fast-growing tech company valued at over $1 billion following latest investment from venture capital firms.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "6 hours ago",
    authorName: "David Wong",
    authorImage: "https://i.pravatar.cc/150?img=7",
    views: "9.5K",
  },
  {
    id: 304,
    title: "Major Merger Between Telecommunications Companies Approved",
    excerpt: "Regulatory authorities give green light to industry-changing merger following concessions.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "8 hours ago",
    authorName: "Sarah Mitchell",
    authorImage: "https://i.pravatar.cc/150?img=32",
    views: "8.1K",
  }
];

export const healthArticles: NewsArticle[] = [
  {
    id: 401,
    title: "New Study Links Healthy Sleep Patterns to Improved Cognitive Function",
    excerpt: "Research finds strong correlation between consistent sleep schedules and mental performance in adults.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1579165466991-467135ad3110?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    publishedAt: "4 hours ago",
    authorName: "Dr. James Wilson",
    authorImage: "https://i.pravatar.cc/150?img=41",
    views: "13.9K",
  },
  {
    id: 402,
    title: "Breakthrough Treatment for Chronic Pain Receives FDA Approval",
    excerpt: "Non-opioid medication shows promising results for patients suffering from long-term pain conditions.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "6 hours ago",
    authorName: "Dr. Anna Martinez",
    authorImage: "https://i.pravatar.cc/150?img=23",
    views: "11.2K",
  },
  {
    id: 403,
    title: "Global Health Organization Launches Initiative to Combat Rising Mental Health Crisis",
    excerpt: "Multi-billion dollar program aims to improve access to mental health services worldwide.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1582560475093-ba66accbc7f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "9 hours ago",
    authorName: "Michael Thomas",
    authorImage: "https://i.pravatar.cc/150?img=3",
    views: "10.5K",
  },
  {
    id: 404,
    title: "Research Shows Benefits of Mediterranean Diet for Heart Health",
    excerpt: "Long-term study confirms reduced risk of cardiovascular disease among adherents to traditional Mediterranean eating patterns.",
    category: "Health",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "12 hours ago",
    authorName: "Dr. Elena Rodriguez",
    authorImage: "https://i.pravatar.cc/150?img=25",
    views: "8.7K",
  }
];

export const entertainmentArticles: NewsArticle[] = [
  {
    id: 501,
    title: "Highly Anticipated Film Sequel Breaks Opening Weekend Records",
    excerpt: "Action blockbuster exceeds box office expectations with massive global debut.",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "3 hours ago",
    authorName: "Jason Miller",
    authorImage: "https://i.pravatar.cc/150?img=53",
    views: "18.7K",
  },
  {
    id: 502,
    title: "Popular Streaming Series Announces Final Season Release Date",
    excerpt: "Fans prepare for conclusion of award-winning drama as creators promise satisfying finale.",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "5 hours ago",
    authorName: "Emily Parker",
    authorImage: "https://i.pravatar.cc/150?img=10",
    views: "15.3K",
  },
  {
    id: 503,
    title: "Music Festival Lineup Revealed with Headlining Performances",
    excerpt: "Annual event returns with star-studded roster featuring top artists across multiple genres.",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "7 hours ago",
    authorName: "Tyler Johnson",
    authorImage: "https://i.pravatar.cc/150?img=17",
    views: "12.9K",
  },
  {
    id: 504,
    title: "Celebrity Couple Announces Engagement on Social Media",
    excerpt: "Stars share news with fans following years of relationship speculation.",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    publishedAt: "10 hours ago",
    authorName: "Rebecca White",
    authorImage: "https://i.pravatar.cc/150?img=44",
    views: "10.1K",
  }
];
