import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Zap, 
  Leaf, 
  Clock,
  Star,
  MessageCircle
} from 'lucide-react';
import Header from '@/components/layout/Header';

const AIMandi = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language, setLanguage, translations } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock marketplace data
  const suppliers = [
    {
      id: 1,
      name: 'GreenTech Solutions Pvt Ltd',
      location: 'Mumbai, Maharashtra',
      category: 'Electronics Manufacturing',
      carbonScore: 95,
      solarPowered: true,
      rating: 4.8,
      reviews: 127,
      products: ['Solar Inverters', 'LED Panels', 'Battery Systems'],
      priceRange: '₹50,000 - ₹5,00,000',
      deliveryTime: '7-14 days',
      minOrder: '10 units',
      certifications: ['ISO 14001', 'Energy Star', 'BIS'],
      description: 'Leading manufacturer of renewable energy products with 100% solar-powered facilities.'
    },
    {
      id: 2,
      name: 'Eco Textiles & Co',
      location: 'Coimbatore, Tamil Nadu',
      category: 'Textile Manufacturing',
      carbonScore: 88,
      solarPowered: true,
      rating: 4.6,
      reviews: 89,
      products: ['Organic Cotton Fabrics', 'Bamboo Textiles', 'Recycled Polyester'],
      priceRange: '₹200 - ₹2,000 per meter',
      deliveryTime: '5-10 days',
      minOrder: '100 meters',
      certifications: ['GOTS', 'OEKO-TEX', 'Cradle to Cradle'],
      description: 'Sustainable textile manufacturer using organic materials and renewable energy.'
    },
    {
      id: 3,
      name: 'Clean Energy Components',
      location: 'Pune, Maharashtra',
      category: 'Automotive Parts',
      carbonScore: 92,
      solarPowered: false,
      rating: 4.7,
      reviews: 156,
      products: ['Electric Vehicle Components', 'Battery Casings', 'Charging Systems'],
      priceRange: '₹5,000 - ₹50,000',
      deliveryTime: '10-21 days',
      minOrder: '5 units',
      certifications: ['TS 16949', 'ISO 14001', 'IATF'],
      description: 'Specialized in sustainable automotive components for electric vehicles.'
    },
    {
      id: 4,
      name: 'Sustainable Packaging Solutions',
      location: 'Bangalore, Karnataka',
      category: 'Packaging',
      carbonScore: 89,
      solarPowered: true,
      rating: 4.5,
      reviews: 203,
      products: ['Biodegradable Packaging', 'Recycled Cardboard', 'Compostable Films'],
      priceRange: '₹10 - ₹500 per unit',
      deliveryTime: '3-7 days',
      minOrder: '1000 units',
      certifications: ['FSC', 'BPI Compostable', 'ISO 14001'],
      description: 'Eco-friendly packaging solutions made from renewable and recycled materials.'
    }
  ];

  const categories = [
    'Electronics Manufacturing',
    'Textile Manufacturing',
    'Automotive Parts',
    'Packaging',
    'Food Processing',
    'Chemical & Pharma'
  ];

  const locations = [
    'Mumbai, Maharashtra',
    'Bangalore, Karnataka',
    'Pune, Maharashtra',
    'Chennai, Tamil Nadu',
    'Coimbatore, Tamil Nadu',
    'Ahmedabad, Gujarat'
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || supplier.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">AI Mandi Marketplace</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with verified green manufacturers and suppliers. AI-powered matching based on 
            carbon efficiency, location, and your business requirements.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-muted-foreground">
            Found {filteredSuppliers.length} suppliers matching your criteria
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">AI Matched</Badge>
            <Badge variant="outline">Verified Green</Badge>
          </div>
        </div>

        {/* Supplier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSuppliers.map(supplier => (
            <Card key={supplier.id} className="hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {supplier.location}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={supplier.carbonScore >= 90 ? 'default' : 'secondary'}>
                      {supplier.carbonScore}% Green
                    </Badge>
                    {supplier.solarPowered && (
                      <Badge variant="outline" className="text-warning">
                        <Zap className="h-3 w-3 mr-1" />
                        Solar Powered
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{supplier.description}</p>
                
                <div>
                  <div className="text-sm font-medium mb-2">Products & Services:</div>
                  <div className="flex flex-wrap gap-1">
                    {supplier.products.map(product => (
                      <Badge key={product} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Price Range:</span>
                    <div className="font-medium">{supplier.priceRange}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Delivery:</span>
                    <div className="font-medium flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {supplier.deliveryTime}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Min Order:</span>
                    <div className="font-medium">{supplier.minOrder}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating:</span>
                    <div className="font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1 fill-warning text-warning" />
                      {supplier.rating} ({supplier.reviews})
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Certifications:</div>
                  <div className="flex flex-wrap gap-1">
                    {supplier.certifications.map(cert => (
                      <Badge key={cert} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button className="flex-1">
                    Connect & Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No suppliers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all categories
            </p>
          </div>
        )}

        {/* Call to Action for Manufacturers */}
        <Card className="mt-12 bg-gradient-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Are you a Green Manufacturer?</h3>
            <p className="mb-6 opacity-90">
              Join AI Mandi and connect with traders looking for sustainable products. 
              Showcase your carbon efficiency and grow your business.
            </p>
            <Button variant="secondary" size="lg">
              List Your Products
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIMandi;