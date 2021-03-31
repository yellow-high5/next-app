import { Center, ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

import Footer from './footer';

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <ChakraProvider>
      <Head>
        <title>Next.js Playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Center>
          {children}
        </Center>
      </main>
      <Footer />
    </ChakraProvider>
  )
}

export default Layout
