import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import React from 'react';
import { Cell, Label, Legend, Pie, PieChart } from 'recharts';
import useSWR from 'swr';

import Layout from '../../components/layout/layout';
import colors from '../../static/colors.json';

const LAGUAGE_COLORS: { [key: string]: string } = colors;

const fetcher = (url: string): Promise<any> => {
  return fetch(`https://api.github.com/${url}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  }).then((response) => response.json());
};

type LanuageStats = { [key: string]: number };

const generateLanguageMap = (repos: any) => {
  let language_stats: LanuageStats = {};
  if (repos) {
    repos.map((repo: any) => {
      if (language_stats[repo.language]) {
        return (language_stats[repo.language] += repo.size);
      } else {
        return (language_stats[repo.language] = repo.size);
      }
    });
  }

  let language_map: { name: string; files: number }[] = [];
  Object.entries(language_stats).map((entry) => {
    language_map.push({ name: entry[0], files: entry[1] });
  });
  return language_map;
};

const Swr = () => {
  const { data: user, error: userError } = useSWR('users/yellow-high5', fetcher);
  const { data: repositories, error: repositoriesError } = useSWR(
    'users/yellow-high5/repos?sort=updated',
    fetcher,
  );
  const language_map = generateLanguageMap(repositories);

  const renderLabel = (entry: any) => {
    return `${entry.value}KB`;
  };

  if (userError || repositoriesError) return <div>failed to load</div>;
  if (!user || !repositories) return <div>loading...</div>;

  return (
    <Layout>
      <Flex>
        <Box>
          <Text fontSize="xl">Developer Profile</Text>
          <Image boxSize="150px" alt="github avatar" src={user.avatar_url} />
          <Text fontSize="xl">{user.name}</Text>
          <Link href={`https://github.com/${user.login}`} isExternal>
            {`https://github.com/${user.login}`}
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
        <Box>
          <PieChart width={600} height={300}>
            <Legend layout="vertical" align="right" verticalAlign="bottom" />
            <Pie
              data={language_map}
              cx={250}
              cy={150}
              innerRadius={90}
              outerRadius={120}
              startAngle={90}
              endAngle={450}
              dataKey="files"
              label={renderLabel}
            >
              <Label value="GitHub Repository" offset={0} position="center" />
              {language_map.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={LAGUAGE_COLORS[entry.name]} />;
              })}
            </Pie>
          </PieChart>
        </Box>
        {/* <pre>{JSON.stringify(user,null, "\t")}</pre>
        <pre>{JSON.stringify(repositories, null, 2)}</pre> */}
      </Flex>
    </Layout>
  );
};

export default Swr;
