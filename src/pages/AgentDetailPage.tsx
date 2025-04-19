import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, CheckCircle, AlertCircle, Heart, Share2 } from 'lucide-react';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import { Agent, Review } from '../types';
import { agents as mockAgents } from '../utils/mockData';

const AgentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  
  useEffect(() => {
    // Simulate API call to fetch agent details
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const foundAgent = mockAgents.find(a => a.id === id) || null;
      setAgent(foundAgent);
      setIsLoading(false);
    };

    fetchData();
    // Scroll to top when navigating to a different agent
    window.scrollTo(0, 0);
  }, [id]);

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!agent) return;
    
    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: 'current-user', // In a real app, this would be the authenticated user's ID
      userName: 'Current User', // In a real app, this would be the authenticated user's name
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedReviews = [...agent.reviews, newReview];
    const updatedRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length;
    
    setAgent({
      ...agent,
      reviews: updatedReviews,
      rating: updatedRating
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Agent Not Found</h2>
          <p className="text-gray-600 mb-6">The agent you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/" className="inline-flex items-center text-white hover:text-blue-100 mb-6 transition-colors duration-300">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All Agents
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="md:flex-1">
              <h1 className="text-4xl font-bold mb-3">{agent.name}</h1>
              <p className="text-xl text-blue-100 mb-4">{agent.description}</p>
              <div className="flex items-center mb-4">
                <StarRating rating={agent.rating} size={5} />
                <span className="ml-2 font-medium">{agent.rating.toFixed(1)}</span>
                <span className="ml-2 text-sm opacity-80">({agent.reviews.length} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {agent.categories.map((category, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm font-medium rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white bg-opacity-20 text-white'} hover:bg-opacity-30 transition-colors duration-300`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                className="p-3 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-colors duration-300"
                aria-label="Share agent"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'about'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-300`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('capabilities')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'capabilities'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-300`}
              >
                Capabilities
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors duration-300`}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="animate-fade-in">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{agent.longDescription}</p>
                </div>
                
                {agent.pricing && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Pricing</h3>
                    <p className="text-blue-800 font-medium">{agent.pricing}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Access to all features with a monthly subscription
                    </p>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use</h3>
                  <p className="text-gray-600 mb-4">{agent.instructions}</p>
                  
                  <h4 className="font-medium text-gray-700 mb-2">Examples:</h4>
                  <ul className="space-y-2">
                    {agent.examples.map((example, index) => (
                      <li key={index} className="p-3 bg-gray-50 rounded-md text-gray-700">
                        "{example}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'capabilities' && (
              <div className="animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agent.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-800">{capability}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {/* In a real app, we would have more detailed descriptions for each capability */}
                          Leveraging advanced AI to deliver exceptional results in this area.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Reviews ({agent.reviews.length})
                  </h3>
                  <div className="flex items-center">
                    <StarRating rating={agent.rating} size={5} />
                    <span className="ml-2 text-gray-700">{agent.rating.toFixed(1)} overall</span>
                  </div>
                </div>
                
                {agent.reviews.length === 0 ? (
                  <p className="text-gray-600">No reviews yet. Be the first to review this agent!</p>
                ) : (
                  <div className="space-y-6">
                    {agent.reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-gray-800">{review.userName}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                          <StarRating rating={review.rating} size={4} />
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Examples & Use Cases</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-blue-500">
                  <h4 className="font-medium text-gray-800 mb-2">Real-World Application</h4>
                  <p className="text-gray-600">
                    {agent.name} is ideal for {agent.categories[0].toLowerCase()} tasks and can significantly improve your workflow.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-md border-l-4 border-green-500">
                  <h4 className="font-medium text-gray-800 mb-2">Success Story</h4>
                  <p className="text-gray-600">
                    "We implemented {agent.name} and saw a 40% increase in efficiency for our team's {agent.categories[0].toLowerCase()} processes."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 ml-3">Get Started Today</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Start using {agent.name} now and experience the benefits of AI-powered {agent.categories[0].toLowerCase()}.
              </p>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                Try {agent.name} Now
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <ReviewForm onSubmit={handleReviewSubmit} />
            
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Similar Agents</h3>
              
              <div className="space-y-4">
                {mockAgents
                  .filter(a => a.id !== agent.id && a.categories.some(c => agent.categories.includes(c)))
                  .slice(0, 3)
                  .map(similarAgent => (
                    <Link 
                      key={similarAgent.id} 
                      to={`/agent/${similarAgent.id}`}
                      className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-300"
                    >
                      <div className="flex items-start">
                        <img 
                          src={similarAgent.imageUrl} 
                          alt={similarAgent.name} 
                          className="w-12 h-12 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">{similarAgent.name}</h4>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">{similarAgent.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;