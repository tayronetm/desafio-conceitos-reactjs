import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Vindo do front",
      url: "url",
      techs: ["Node.js", "Angular"],
      likes: 0,
    });
    const repository = response.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
		await api.delete(`/repositories/${id}`);
		const repos = repositories.filter(repo => {
			return repo.id !== id
		});
		setRepository(repos);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
						{item.title}
						<button onClick={() => handleRemoveRepository(item.id)}>Remover</button>
					</li>
					))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
