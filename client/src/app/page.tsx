import { Metadata } from 'next';
import styles from './page.module.css';
import Link from 'next/link';
import { metamorphous } from '../ui/fonts';
import BackgroundImageContainer from '../components/BackgroundImageContainer';
import BakeryMap from '../components/BakeryMap/BakeryMap';
import SuggestionCard from '../components/SuggestionCard';
import Image from 'next/image';
import Footer from '../components/Footer/Footer';

export const metadata: Metadata = {
  title: 'BreadBase Home',
  description: 'Home page for breadBase',
};

export default function Home() {
  return (
    <>
      <main>
        <section id={styles.Hero}>
          <BackgroundImageContainer
            src='/images/HandsHoldingBreadLoaf.jpg'
            alt='Hands Holding Bread Background Image'
            className='before:bg-[#130404] before:opacity-[0.54] before:backdrop-blur-xl'
          >
            <div className={styles.Hero_contentContainer}>
              <h1 className={metamorphous.className}>Bread Base</h1>
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
            src='/images/PileOfBread.jpg'
            alt='Pile of Bread Background Image'
            className='before:bg-gray-400 before:opacity-40 before:backdrop-blur-xl'
          >
            <div className={styles.NearbyBakeries_container}>
              <h2 className={metamorphous.className}>Bakers near you</h2>
              <div className={styles.BakeryMap_container}>
                <BakeryMap />
              </div>
            </div>
          </BackgroundImageContainer>
        </section>
        <section id={styles.About}>
          <div>
            <div>
              <h2 className={metamorphous.className}>Who are we?</h2>
              <p>
                Welcome to Bread Base! The online bakery where you can order
                fresh and delicious bread from around the world. Whether you
                crave a classic baguette, a hearty rye, or a sweet cinnamon
                roll, we have it all. You can choose from the bakers in your
                area, select items from their menu, and place your online order
                to skip the lines. Our bakers are passionate and skilled, and
                they use only the finest ingredients to make your bread. You can
                also browse their profiles and reviews, and their personal
                bakery home. Bread Base is more than just a website, its a
                community of bread lovers. Join us today and discover the joy of
                bread!
              </p>
            </div>
            <div>
              <Image
                src='/images/SlicesOfWholeWheatBread.jpg'
                width={400}
                height={400}
                alt='about'
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
