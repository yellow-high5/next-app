import { Image } from '@chakra-ui/image';
import { Center } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';


const Footer = () => {
  return (
    <footer>
      <Center>
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        >
          <Image src="/vercel.svg" boxSize="100px" alt="Vercel Logo" />
        </Link>
      </Center>
    </footer>)
}

export default Footer;