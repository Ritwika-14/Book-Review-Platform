import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex justify-center text-yellow-500">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <span key={i}>★</span>;
        if (i === fullStars && hasHalfStar) return <span key={i}>☆</span>;
        return <span key={i}>☆</span>;
      })}
    </div>
  );
};

export default StarRating;
