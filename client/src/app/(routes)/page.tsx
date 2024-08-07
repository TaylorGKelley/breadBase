import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'BreadBase Home',
  description: 'Home page for breadBase',
};

export default function Home() {
  return <main className={styles.main}></main>;
}
