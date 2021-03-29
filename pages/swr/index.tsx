import React from 'react';
import { Cell, Label, Legend, Pie, PieChart } from 'recharts';
import useSWR from 'swr';

import LANGUAGE_COLORS from '../../static/colors.json';

const fetcher = (url: string): Promise<any> => {
  return fetch(`https://api.github.com/${url}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json());
}

const generateLanguageMap = (repos) => {
  let language_stats = {};
  if(repos) {repos.map((repo) => {
    if(language_stats[repo.language]){
      return language_stats[repo.language] += repo.size
    } else {
      return language_stats[repo.language] = repo.size
    }
  })}
  let language_map = [];
  Object.entries(language_stats).map((entry) => {
    language_map.push({name: entry[0], files: entry[1]});
  })
  return language_map
}

const Swr = () => {
  const { data: user, error: userError } = useSWR('users/yellow-high5', fetcher);
  const { data: repositories, error: repositoriesError } = useSWR('users/yellow-high5/repos?sort=updated', fetcher);
  const language_map  = generateLanguageMap(repositories);
  
  const renderLabel = (entry) => {
    return `${entry.value}KB`;
  }

  if (userError || repositoriesError) return <div>failed to load</div>
  if (!user || !repositories ) return <div>loading...</div>

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '30px'}}>
      <div>
        <h3>Developer Profile</h3>
        <img src={user.avatar_url} width="120" height="120" />
        <p>{user.name}</p>
        <a href={`https://github.com/${user.login}`}>{`https://github.com/${user.login}`}</a>
      </div>
      <div>
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
                {language_map.map((entry, index) => 
                    {return <Cell key={`cell-${index}`} fill={LANGUAGE_COLORS[entry.name]} />}
                )}
            </Pie>
        </PieChart>
      </div>
      {/* <pre>{JSON.stringify(user,null, "\t")}</pre>
      <pre>{JSON.stringify(repositories, null, 2)}</pre> */}
    </div>
  )
}

export default Swr;
