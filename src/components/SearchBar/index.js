import React from "react";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const history = useHistory();
  const initialForm = {
    name: ""
  };

  const goToResultPage = (name) => {
    history.push(`/${name}`);
  };

  const [form, onChangeForm, resetForm] = useForm(initialForm);

  const getUser = () => {
    const userName = form.name;
    axios
      .get(`https://api.github.com/users/${userName}`)
      .then((res) => {
        goToResultPage(userName);
      })
      .catch((err) => {
        alert("Erro: Usuário não encontrado");
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    resetForm();
    getUser();
  };

  return (
    <div className="search">
      <form onSubmit={handleFormSubmit}>
        <field className="search__field">
          <input
            className="search__input"
            required
            type="text"
            title="É necessário preencher o campo"
            name="name"
            onChange={onChangeForm}
            value={form.name}
            placeholder="Nome do usuário no Github"
          />
          <button className="search__button">Buscar</button>
        </field>
      </form>
    </div>
  );
}
