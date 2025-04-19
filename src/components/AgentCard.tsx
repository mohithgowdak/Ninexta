import React from 'react';
import { Star } from 'lucide-react';
import { Agent } from '../types';
import { Link } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Link to={`/agent/${agent.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          <img 
            src={agent.imageUrl} 
            alt={agent.name} 
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center text-white">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium">{agent.rating.toFixed(1)}</span>
              <span className="ml-2 text-xs opacity-80">({agent.reviews.length} reviews)</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{agent.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{agent.description}</p>
          <div className="flex flex-wrap gap-2">
            {agent.categories.slice(0, 3).map((category, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-blue-600 font-medium">
            {agent.pricing || 'Free'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AgentCard;