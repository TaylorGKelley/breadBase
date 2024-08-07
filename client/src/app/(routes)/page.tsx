import { Metadata } from 'next';
import styles from './page.module.css';
import Button from '../components/Button/Button';

export const metadata: Metadata = {
  title: 'BreadBase Home',
  description: 'Home page for breadBase',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Button>Populate</Button>
      <Button Type={2}>Clear</Button>
    </main>
  );
}
