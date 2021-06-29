import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar";

export default function RepositoriesPage() {
  const [repositories, setRepositories] = useState([]);
  const params = useParams();

  useEffect(() => {
    getUser(params.name);
  }, [params]);

  const getUser = () => {
    if (params.name) {
      axios
        .get(`https://api.github.com/users/${params.name}/repos`)
        .then((res) => {
          setRepositories(res.data);
        })
        .catch((err) => {
          alert("Erro: Usuário não encontrado");
        });
    }
  };

  return (
    <div>
      <SearchBar />
      <div className="repositories">
        <div>
          <div className="repositories__title">
            <h2> Repositórios </h2>
          </div>
          <div className="repositories__owner">
            <p>Usuário</p>
            <p>{params.name}</p>
          </div>
          <div>
          {repositories.length > 0 ? (
            repositories.map((item) => {
              return (
                <div className="repositories__items">
                  <p>{item.name}</p>
                </div>
              );
            })
          ) : (
            <div> Não há repositórios </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
