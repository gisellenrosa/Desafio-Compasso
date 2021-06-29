import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar";

export default function RepositoriesPage() {
  const [starred, setStarred] = useState([]);
  const params = useParams();

  useEffect(() => {
    getUser(params.name);
  }, [params]);

  const getUser = () => {
    if (params.name) {
      axios
        .get(`https://api.github.com/users/${params.name}/starred`)
        .then((res) => {
          setStarred(res.data);
        })
        .catch((err) => {
          alert("Erro: Usuário não encontrado");
        });
    }
  };

  return (
    <div>
      <SearchBar />
      <div className="starred">
        <div className="starred__title">
          <h2> Favoritos </h2>
        </div>
        <div className="repositories__owner">
          <p>Usuário</p>
          <p>{params.name}</p>
        </div>
        {starred.length > 0 ? (
          starred.map((item) => {
            return <div className="starred__items">{item.full_name}</div>;
          })
        ) : (
          <div> Não há favoritos</div>
        )}
      </div>
    </div>
  );
}
