import { Box, Grid, Heading, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';

import Layout from '../components/layout/layout';

const App = () => {
  return (
    <Layout>
      <Box p={3}>
        <Heading mb={3}>
          Welcome to <a href="https://nextjs.org">Next.js</a> playground
        </Heading>

        <Grid templateColumns="repeat(3, 1fr)" gap={6} m="9">
          <Link href="/swr">
            <Box>
              <Text fontSize="3xl">Fetch Github API &rarr;</Text>
              <Text fontSize="md">Display the information fetched from the API using SWR.</Text>
            </Box>
          </Link>

          <Link href="https://github.com/vercel/next.js/tree/master/examples">
            <Box>
              <Text fontSize="3xl">Official Examples &rarr;</Text>
              <Text fontSize="md">Discover and deploy boilerplate example Next.js projects.</Text>
            </Box>
          </Link>

          <Link href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
            <Box>
              <Text fontSize="3xl">Deploy &rarr;</Text>
              <Text fontSize="md">Instantly deploy your Next.js site to a public URL with Vercel.</Text>
            </Box>
          </Link>
        </Grid>
      </Box>
    </Layout>
  )
}

export default App;
