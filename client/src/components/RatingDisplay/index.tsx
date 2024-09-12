import React, { ReactElement } from 'react';
import Star from '../icons/Star';

type RatingDisplayProps = {
  rating: number;
  color?: string;
};

type Rating = {
  color: string;
  varient: 'full' | 'half' | 'outline';
};

function RatingDisplay({ rating, color = '#f4f4f4' }: RatingDisplayProps) {
  if (rating > 5) rating = 5;

  const ratings: Rating[] = [];

  // Process ratings depending on rating number
  for (let i = 0; i < Math.floor(rating); i++) {
    ratings.push({
      color,
      varient: 'full',
    });
  }

  if (rating % 1 > 0)
    ratings.push({
      color,
      varient: 'half',
    });

  for (let i = 0; i < Math.floor(5 - rating); i++) {
    ratings.push({
      color: '#F4F4F4',
      varient: 'outline',
    });
  }

  return (
    <div className='my-1 flex gap-2'>
      {ratings.map((rating, i) => (
        <Star
          key={i}
          {...rating}
        />
      ))}
    </div>
  );
}

export default RatingDisplay;
