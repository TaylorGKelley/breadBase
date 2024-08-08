import React from 'react';
import styles from './SuggestionCard.module.css';
import BackgroundImageContainer from '@/app/components/BackgroundImageContainer/BackgroundImageContainer';

type SuggestionCardProps = {
  title: string;
  imagePath: string;
};

export default function SuggestionCard({
  title,
  imagePath,
}: SuggestionCardProps) {
  return (
    <div className={styles.Card}>
      <BackgroundImageContainer
        path={imagePath}
        tintColor='#17181ABB'
      >
        <div className={styles.CardDetails}>
          <h5>Recipes</h5>
          <p>French Baguette</p>
          <p>Un Cornetto Recipe</p>
        </div>
      </BackgroundImageContainer>
    </div>
  );
}
