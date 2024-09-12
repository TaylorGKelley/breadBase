import { metamorphous } from '@/ui/fonts';
import React from 'react';
import { SelectedCheck } from '../icons';
import RatingDisplay from '../RatingDisplay';

type SearchResultItemProps = {
  info: { title: string; description: string; rating: number };
  selected: boolean;
  toggleSelected: () => void;
};

function SearchResultItem({
  info,
  selected,
  toggleSelected,
}: SearchResultItemProps) {
  return (
    <div
      className={`${metamorphous.className} ${selected ? 'border-yellow' : 'border-[#F4F4F4]'} flex w-full max-w-[350px] cursor-pointer items-center justify-between rounded-3xl border-2 px-4 py-2`}
      onClick={toggleSelected}
    >
      <div>
        <h5>{info.title}</h5>
        <div className='ml-4'>
          <p>{info.description}</p>
          <RatingDisplay
            rating={info.rating}
            color={selected ? '#eaa827' : '#f4f4f4'}
          />
        </div>
      </div>
      <div className=''>
        <SelectedCheck
          selected={selected}
          className='aspect-square h-5'
        />
      </div>
    </div>
  );
}

export default SearchResultItem;
