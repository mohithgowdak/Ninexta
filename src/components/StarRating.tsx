import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = 5, 
  interactive = false,
  onChange
}) => {
  const renderStar = (position: number) => {
    const filled = position <= rating;
    
    return (
      <Star 
        key={position}
        className={`w-${size} h-${size} ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${interactive ? 'cursor-pointer transition-all hover:scale-110' : ''}`}
        onClick={() => interactive && onChange && onChange(position)}
      />
    );
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map(position => renderStar(position))}
    </div>
  );
};

export default StarRating;