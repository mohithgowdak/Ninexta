import React, { useState } from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      setError('Please provide a comment');
      return;
    }
    
    onSubmit(rating, comment);
    setSubmitted(true);
    setTimeout(() => {
      setRating(0);
      setComment('');
      setError('');
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Thanks for your review!</h3>
        <p className="text-gray-600">Your feedback helps others make better decisions.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Your Rating</label>
        <div className="transition-all duration-300 hover:scale-105">
          <StarRating 
            rating={rating} 
            size={6} 
            interactive={true}
            onChange={setRating}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 mb-2">Your Review</label>
        <textarea
          id="comment"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this AI agent..."
        />
      </div>
      
      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;