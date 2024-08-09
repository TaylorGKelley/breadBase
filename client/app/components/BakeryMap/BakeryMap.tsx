import React from 'react';
import dynamic from 'next/dynamic';
import styles from './BakeryMap.module.css';
const Map = dynamic(() => import('./Map/Map'), { ssr: false });

export default function BakeryMap() {
  return (
    <div className={styles.BakeryMap}>
      <Map />
    </div>
  );
}
