import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter, MapPin, Star, Factory, Phone, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';
import { toast } from 'sonner';

interface MandiListing {
  id: string;
  product_name: string;
  product_category: string;
  description: string;
  price_per_unit: number;
  minimum_order_quantity: number;
  delivery_time_days: number;
  carbon_efficiency_score: number;
  location_city: string;
  location_state: string;
  solar_powered: boolean;
  certifications: string[];
  images: string[];
  manufacturer_id: string;
  is_active: boolean;
  created_at: string;
}

const AIMandi = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { language, setLanguage } = useTheme();
  const [listings, setListings] = useState<MandiListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchListings();
  }, [user, navigate]);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('mandi_listings')
        .select('*')
        .eq('is_active', true)
        .order('carbon_efficiency_score', { ascending: false });

      if (error) {
        console.error('Error fetching listings:', error);
        toast.error('Failed to load marketplace listings');
        return;
      }

      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to load marketplace listings');
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || listing.product_category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || listing.location_state === locationFilter;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const categories = [...new Set(listings.map(l => l.product_category))];
  const states = [...new Set(listings.map(l => l.location_state))];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={setLanguage} showDashboardNav={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              AI Mandi
            </h1>
            <p className="text-muted-foreground">
              Discover sustainable products from verified green manufacturers
            </p>
          </div>
          {profile?.role === 'manufacturer' && (
            <Button onClick={() => navigate('/manufacturer-dashboard')}>
              <Factory className="h-4 w-4 mr-2" />
              Manage Listings
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-muted-foreground">Loading marketplace...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <Factory className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No Products Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== 'all' || locationFilter !== 'all' 
                ? "Try adjusting your search filters"
                : "No products are currently listed in the marketplace"
              }
            </p>
            {(searchTerm || categoryFilter !== 'all' || locationFilter !== 'all') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                  setLocationFilter('all');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{listing.product_name}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{listing.product_category}</Badge>
                        {listing.solar_powered && (
                          <Badge variant="default" className="bg-yellow-500">☀️ Solar</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{listing.carbon_efficiency_score}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">₹{listing.price_per_unit.toLocaleString()}/unit</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Min Order:</span>
                      <span>{listing.minimum_order_quantity} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery:</span>
                      <span>{listing.delivery_time_days} days</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{listing.location_city}, {listing.location_state}</span>
                    </div>
                  </div>

                  {listing.certifications && listing.certifications.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {listing.certifications.slice(0, 3).map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {listing.certifications.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{listing.certifications.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Contact Supplier
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* AI Recommendations */}
        {filteredListings.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Based on your business profile and sustainability goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">🌱 Best Carbon Score</h4>
                  <p className="text-sm text-muted-foreground">
                    Products with highest carbon efficiency ratings
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">📍 Local Suppliers</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduce transportation emissions with nearby suppliers
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">⚡ Solar Powered</h4>
                  <p className="text-sm text-muted-foreground">
                    Products from renewable energy facilities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIMandi;