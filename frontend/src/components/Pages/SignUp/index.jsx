import { useState } from "react";
import Banner from "../../Partials/Banner";

const SignUp = () => {
  return (
    <>
      <div className="w-full h-screen flex">
        <Banner />
        <Form />
      </div>
    </>
  );
};

const Form = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, passwordRepeat }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("tokenStorage", JSON.stringify(data.token));
        window.location.href = "/"
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Erro ao fazer requisição ao servidor!");
    }
  };

  return (
    <>
      <div className="xl:w-2/5 w-full h-full flex justify-center items-center p-6">
        <form
          onSubmit={handleClick}
          className="w-[400px] text-tertiary space-y-8"
        >
          <h1 className="text-primary text-3xl font-bold text-center">
            Cadastro
          </h1>
          <div className="w-full space-y-2">
            <label htmlFor="username">Usuário:</label>
            <input
              className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Digite seu Usuário"
              required
            />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="email">E-mail:</label>
            <input
              className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Digite seu E-mail"
              required
            />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="password">Senha:</label>
            <input
              className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Digite sua Senha"
              required
            />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="passwordRepeat">Confirme sua Senha:</label>
            <input
              className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
              type="password"
              name="passwordRepeat"
              onChange={(e) => {
                setPasswordRepeat(e.target.value);
              }}
              placeholder="Confirme sua Senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-[30px] bg-primary rounded-md text-white text-sm hover:opacity-90 shadow-lg"
          >
            Cadastrar
          </button>
          <p className="text-center">
            <a href="/" className="text-primary hover:opacity-80">
              Já Possui uma conta? Entrar.
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
