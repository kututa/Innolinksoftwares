import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Globe, 
  Code2, 
  Smartphone, 
  Palette, 
  Megaphone, 
  Headphones,
  ArrowRight,
  Star
} from 'lucide-react';

interface ServiceCatalogProps {
  onOrderService: (service: any) => void;
}

const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onOrderService }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  // Mock data for services
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom, responsive websites that engage visitors and drive conversions. From corporate sites to e-commerce platforms, we build it all.",
      category: "web",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      icon: "Globe",
      rating: 4.8,
      reviewCount: 124,
      features: [
        "Responsive design for all devices",
        "SEO optimization",
        "Content management system",
        "Contact forms and lead capture",
        "Analytics integration",
        "Social media integration"
      ]
    },
    {
      id: 2,
      title: "Software Development",
      description: "Scalable, secure, and efficient software solutions tailored to your business needs. From enterprise applications to cloud solutions.",
      category: "software",
      price: 2499.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
      icon: "Code2",
      rating: 4.9,
      reviewCount: 87,
      features: [
        "Custom software architecture",
        "Database design and optimization",
        "API development and integration",
        "Cloud deployment",
        "Automated testing",
        "Ongoing maintenance and support"
      ]
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that provide seamless user experiences across all devices.",
      category: "mobile",
      price: 1899.99,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
      icon: "Smartphone",
      rating: 4.7,
      reviewCount: 93,
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "UI/UX design",
        "Push notifications",
        "In-app purchases",
        "Analytics and crash reporting"
      ]
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "User-centered design that combines aesthetics with functionality to create intuitive and engaging digital experiences.",
      category: "design",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
      icon: "Palette",
      rating: 4.9,
      reviewCount: 76,
      features: [
        "User research and personas",
        "Wireframing and prototyping",
        "Visual design",
        "Interaction design",
        "Usability testing",
        "Design system creation"
      ]
    },
    {
      id: 5,
      title: "Digital Marketing",
      description: "Strategic digital marketing solutions that boost your online presence and drive sustainable business growth.",
      category: "marketing",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=1000",
      icon: "Megaphone",
      rating: 4.6,
      reviewCount: 108,
      features: [
        "SEO and content marketing",
        "Social media management",
        "PPC advertising",
        "Email marketing campaigns",
        "Analytics and reporting",
        "Conversion rate optimization"
      ]
    },
    {
      id: 6,
      title: "IT Consultancy",
      description: "Expert guidance and strategic planning to help you leverage technology for maximum business impact.",
      category: "consulting",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1000",
      icon: "Headphones",
      rating: 4.8,
      reviewCount: 65,
      features: [
        "Technology assessment",
        "IT strategy development",
        "System architecture planning",
        "Vendor selection assistance",
        "Implementation oversight",
        "Training and knowledge transfer"
      ]
    }
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="h-6 w-6 text-[#106EBE]" />;
      case 'Code2':
        return <Code2 className="h-6 w-6 text-[#106EBE]" />;
      case 'Smartphone':
        return <Smartphone className="h-6 w-6 text-[#106EBE]" />;
      case 'Palette':
        return <Palette className="h-6 w-6 text-[#106EBE]" />;
      case 'Megaphone':
        return <Megaphone className="h-6 w-6 text-[#106EBE]" />;
      case 'Headphones':
        return <Headphones className="h-6 w-6 text-[#106EBE]" />;
      default:
        return <Globe className="h-6 w-6 text-[#106EBE]" />;
    }
  };

  const handleViewService = (service: any) => {
    setSelectedService(service);
    setShowServiceDetails(true);
  };

  const handleCloseDetails = () => {
    setShowServiceDetails(false);
    setSelectedService(null);
  };

  const handleOrderNow = (service: any) => {
    onOrderService(service);
    setShowServiceDetails(false);
  };

  const filteredServices = services.filter(service => {
    // Filter by search term
    const matchesSearch = 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'web', name: 'Web Development' },
    { id: 'software', name: 'Software Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'design', name: 'UI/UX Design' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'consulting', name: 'IT Consultancy' }
  ];

  // Render stars for ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <Star className="absolute top-0 left-0 h-4 w-4 fill-yellow-400 text-yellow-400 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </span>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Browse Services</h2>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#106EBE] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div 
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Service Image */}
            <div className="h-48 overflow-hidden">
              <img 
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Service Content */}
            <div className="p-6">
              <div className="flex items-center mb-2">
                {getIconComponent(service.icon)}
                <h3 className="text-xl font-bold text-gray-900 ml-3">
                  {service.title}
                </h3>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(service.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({service.rating}) {service.reviewCount} reviews
                </span>
              </div>
              
              <p className="text-gray-600 mb-6 line-clamp-3">
                {service.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-[#106EBE] font-bold text-xl">
                  ${service.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleViewService(service)}
                  className="px-4 py-2 bg-[#106EBE] text-white rounded-lg hover:bg-[#0FFCBE] hover:text-gray-900 transition-colors flex items-center"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {showServiceDetails && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Service Image */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Service Content */}
            <div className="p-8">
              <div className="flex items-center mb-4">
                {getIconComponent(selectedService.icon)}
                <h2 className="text-2xl font-bold text-gray-900 ml-3">
                  {selectedService.title}
                </h2>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex">
                  {renderStars(selectedService.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({selectedService.rating}) {selectedService.reviewCount} reviews
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">
                  {selectedService.description}
                </p>
              </div>
              
              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedService.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Price and Order Button */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg">
                <div className="mb-4 sm:mb-0">
                  <span className="text-gray-600 block mb-1">Price</span>
                  <span className="text-3xl font-bold text-[#106EBE]">${selectedService.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleOrderNow(selectedService)}
                  className="w-full sm:w-auto px-8 py-3 bg-[#106EBE] text-white rounded-lg hover:bg-[#0FFCBE] hover:text-gray-900 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCatalog;