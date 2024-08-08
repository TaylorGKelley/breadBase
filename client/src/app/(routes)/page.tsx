import { Metadata } from 'next';
import styles from './page.module.css';
import BackgroundImageContainer from '../components/BackgroundImageContainer/BackgroundImageContainer';
import Link from 'next/link';
import { metamorphous } from '../ui/fonts';

export const metadata: Metadata = {
  title: 'BreadBase Home',
  description: 'Home page for breadBase',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <section style={{ height: '80vh', width: '100vw' }}>
        {/* hero */}
        <BackgroundImageContainer
          path='/images/HandsHoldingBreadLoaf.jpg'
          tintColor='#13040480'
          blurFilter='1px'
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <h1 className={metamorphous.className}>BreadBase</h1>
            <Link
              href='/Search/Product'
              className='btn'
            >
              <h5 className={metamorphous.className}>Shop for Bread</h5>
            </Link>
          </div>
        </BackgroundImageContainer>
      </section>
    </main>
  );
}
