import { Metadata } from 'next';
import styles from './page.module.css';
import BackgroundImageContainer from '../components/BackgroundImageContainer/BackgroundImageContainer';
import Link from 'next/link';
import { metamorphous } from '../ui/fonts';
import SuggestionCard from './components/SuggestionCard/SuggestionCard';
import BakeryMap from '../components/BakeryMap/BakeryMap';

export const metadata: Metadata = {
  title: 'BreadBase Home',
  description: 'Home page for breadBase',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <section id={styles.Hero}>
        {/* hero */}
        <BackgroundImageContainer
          path='/images/HandsHoldingBreadLoaf.jpg'
          tintColor='#13040480'
          blurFilter='1px'
        >
          <div className={styles.Hero_contentContainer}>
            <h1 className={metamorphous.className}>BreadBase</h1>
            <div className={styles.Hero_buttonContainer}>
              <Link
                href='/Search/Product'
                className='btn'
              >
                <h5 className={metamorphous.className}>Shop for Bread</h5>
              </Link>
              <Link
                href='/Search/Product'
                className='btn btn-secondary'
              >
                <h5 className={metamorphous.className}>Shop for Bread</h5>
              </Link>
            </div>
          </div>
        </BackgroundImageContainer>
      </section>
      <section id={styles.Suggestions}>
        <SuggestionCard
          title='Recipes'
          imagePath='/images/HandsHoldingFlour.jpg'
        />
        <SuggestionCard
          title='Bakeries'
          imagePath='/images/BreadTopDown.jpg'
        />
        <SuggestionCard
          title='Products'
          imagePath='/images/StackofBaguettes.jpg'
        />
      </section>
      <section id={styles.NearbyBakeries}>
        <BackgroundImageContainer
          path='/images/PileOfBread.jpg'
          tintColor='#03030690'
          blurFilter='27px'
        >
          <div className={styles.NearbyBakeries_container}>
            <h2>Bakers near you</h2>
            <div className={styles.BakeryMap_container}>
              <BakeryMap />
            </div>
          </div>
        </BackgroundImageContainer>
      </section>
    </main>
  );
}
