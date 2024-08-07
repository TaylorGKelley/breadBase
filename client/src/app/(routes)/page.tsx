import { Metadata } from 'next';
import styles from './page.module.css';
import Button from '../components/Button/Button';
import BackgroundImageContainer from '../components/BackgroundImageContainer/BackgroundImageContainer';

export const metadata: Metadata = {
  title: 'BreadBase Home',
  description: 'Home page for breadBase',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <section>
        {/* hero */}
        <BackgroundImageContainer path='/public/images/HoldingBreadLoaf.png'>
          <div></div>
        </BackgroundImageContainer>
      </section>
    </main>
  );
}
