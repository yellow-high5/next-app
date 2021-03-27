import Head from 'next/head';

import styles from '../../styles/Home.module.css';
import Footer from './footer';


type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
