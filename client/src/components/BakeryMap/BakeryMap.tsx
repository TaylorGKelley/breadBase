import React from 'react';
import Map from './Map';
import type { MapProps } from './Map/Map';

export default function BakeryMap(props: MapProps) {
  return (
    <>
      <div className='relative h-full w-full overflow-hidden rounded-3xl bg-black'>
        <Map {...props} />
      </div>
    </>
  );
}
