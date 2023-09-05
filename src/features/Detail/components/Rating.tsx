import React from 'react';
import { AiFillStar } from 'react-icons/ai';
interface T {
  rating?: number | null | string;
}
export const Rating = ({ rating }: T) => {
  return (
    <div className="flex gap-1 items-center">
      <i className="text-yellow-500 text-[20px]">
        <AiFillStar />
      </i>
      <p className="text-sm font-semibold">{rating ? rating : '??'}</p>
    </div>
  );
};
