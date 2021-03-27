import React from 'react';
import { Cell, Legend, Pie, PieChart } from 'recharts';
import useSWR from 'swr';

const fetcher = (url: string): Promise<any> => {
  return fetch(`https://api.github.com/${url}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json());
}

const Swr = () => {
  const { data: user, error: userError } = useSWR('users/yellow-high5', fetcher);
  const { data: repositories, error: repositoriesError } = useSWR('users/yellow-high5/repos?sort=updated', fetcher);

  let language_stats = {};
  if(repositories) {repositories.map((repo) => {
    if(language_stats[repo.language]){
      return language_stats[repo.language] += repo.size
    } else {
      return language_stats[repo.language] = repo.size
    }
  })}
  const language_data = [];
  Object.entries(language_stats).map((entry) => {
    language_data.push({name: entry[0], files: entry[1]});
  })
  const renderLabel = (entry) => {
    return entry.name;
  }

  //const COLORS = ['#2b7489', '#375eab', '#f1e05a', '#2c3e50'];
  const LANGUAGE_COLORS = {
    TypeScript: "#2b7489", 
    JavaScript: "#f1e05a", 
    Vue: "#2c3e50", 
    Go: "#375eab",
    Java: "#b07219", 
  }

  console.log(LANGUAGE_COLORS["JavaScript"])

  if (userError || repositoriesError) return <div>failed to load</div>
  if (!user || !repositories ) return <div>loading...</div>

  return (
    <>
      <img src={user.avatar_url} width="120" height="120" />
      <p>{user.name}</p>
      <p>{user.location}</p>
      <PieChart width={400} height={400}>
          <Pie
            data={language_data}
            cx={200}
            cy={200}
            innerRadius={80}
            outerRadius={120}
            paddingAngle={10}
            dataKey="files"
            label={renderLabel}
          >
              <Legend width={100} height={100}/>
              {language_data.map((entry, index) => 
                  {return <Cell key={`cell-${index}`} fill={LANGUAGE_COLORS[entry.name]} />}
              )}
          </Pie>
      </PieChart>
      <pre>{JSON.stringify(user,null, "\t")}</pre>
      <pre>{JSON.stringify(repositories, null, 2)}</pre>
    </>
  )
}

export default Swr;
