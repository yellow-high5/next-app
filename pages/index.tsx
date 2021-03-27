import Link from 'next/link';
import React from 'react';

import Layout from '../components/layout/layout';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js</a> playground
      </h1>

      <div className={styles.grid}>
        
        <Link href="/swr">
          <div className={styles.card}>
            <h3>Fetch Github API &rarr;</h3>
            <p>Display the information fetched from the API using SWR.</p>
          </div>
        </Link>

        <Link href="https://github.com/vercel/next.js/tree/master/examples">
          <div className={styles.card}>
            <h3>Official Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </div>
        </Link>

        <Link href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
          <div className={styles.card}>
            <h3>Deploy &rarr;</h3>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </div>
        </Link>

      </div>
    </Layout>
  )
}

export default Home;
