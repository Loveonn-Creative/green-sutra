import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "The Ultimate Guide to Carbon Tracking for MSMEs",
      excerpt: "Learn how small businesses can start tracking their carbon footprint effectively with simple, actionable steps.",
      author: "Priya Sharma",
      date: "January 15, 2024",
      category: "Sustainability",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "ESG Compliance Made Simple: A Step-by-Step Approach",
      excerpt: "Demystifying ESG reporting for Indian manufacturers with practical examples and templates.",
      author: "Rajesh Kumar",
      date: "January 12, 2024", 
      category: "Compliance",
      readTime: "8 min read",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "How AI is Transforming Waste Management in India",
      excerpt: "Exploring the latest AI technologies that are helping businesses reduce waste and increase recycling rates.",
      author: "Sneha Patel",
      date: "January 10, 2024",
      category: "Technology",
      readTime: "6 min read",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Green Finance: Unlocking Sustainability Loans for MSMEs",
      excerpt: "A comprehensive guide to accessing green financing options and government schemes for sustainable business practices.",
      author: "Amit Mehta",
      date: "January 8, 2024",
      category: "Finance",
      readTime: "7 min read",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Success Story: How Mumbai Textile Mills Reduced Carbon by 40%",
      excerpt: "Real-world case study showing how a traditional textile business transformed their operations for sustainability.",
      author: "Kavya Nair",
      date: "January 5, 2024",
      category: "Case Study",
      readTime: "4 min read",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "The Business Case for Sustainability in Indian Manufacturing",
      excerpt: "Why going green isn't just good for the planet—it's good for your bottom line. Data-driven insights and ROI analysis.",
      author: "Dr. Vikram Singh",
      date: "January 3, 2024",
      category: "Business",
      readTime: "9 min read",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Sustainability", "Compliance", "Technology", "Finance", "Case Study", "Business"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Biocog Blog
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Insights, guides, and stories about sustainability in Indian business
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            {/* Featured Post */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-video lg:aspect-square bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <Badge variant="secondary">{posts[0].category}</Badge>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {posts[0].title}
                      </h3>
                      <p className="text-muted-foreground">
                        {posts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{posts[0].author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{posts[0].date}</span>
                        </div>
                        <span>{posts[0].readTime}</span>
                      </div>
                      <Button variant="hero" className="w-fit">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Posts */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">Recent Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground">
                Get the latest insights on sustainability and business growth delivered to your inbox
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button variant="hero">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Join 10,000+ MSMEs already subscribed. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;