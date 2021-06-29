import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/SearchBar";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const [user, setUser] = useState({});
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    getUser(params.name);
  }, [params]);

  const getUser = () => {
    if (params.name) {
      axios
        .get(`https://api.github.com/users/${params.name}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          alert("Erro: Usuário não encontrado");
        });
    }
  };
  const goToStarredPage = () => {
    history.push(`/${params.name}/starred`);
  };
  const goToRepositoriesPage = () => {
    history.push(`/${params.name}/repos`);
  };
  return (
    <div>
      <SearchBar />
      <div className="user">
        {user.login !== undefined ? (
          <div>
            <div className="user__infos">
              <p>Usuário </p>
              <p>{user.login}</p>
              <p>Nome</p>
              <p>{user.name}</p>
              <p>Biografia </p>
              <p>{user.bio}</p>
              <p>Seguidores </p>
              <p>{user.followers}</p>
              <p>Seguindo </p>
              <p>{user.following}</p>
            </div>
            <div className="user__buttons">
              <button
                className="button__repos"
                onClick={() => {
                  goToRepositoriesPage(history);
                }}
              >
                Repositório
              </button>
              <button
                className="button__starred"
                onClick={() => {
                  goToStarredPage(history);
                }}
              >
                Favoritos
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
