import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(({ data }) => setRepositories(data));
  }, [])

  async function handleAddRepository() {
    try {
      const { data: repository } = await api.post('/repositories', {
        title: `New Repository ${Date.now()}`,
        url: 'https://github.com/gfpaiva/conceitos-reactjs',
        techs: ['NodeJS', 'ReactJS'],
      });
  
      setRepositories([
        ...repositories,
        repository,
      ]);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const newRepositories = repositories.filter(repository => repository.id !== id);

      setRepositories(newRepositories);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(({
          id,
          title,
        }) => (
          <li key={id}>
            {title}

            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
