import Banner from "../Partials/Banner";

const Login = () => {
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
  return (
    <>
      <div className="xl:w-2/5 w-full h-full flex justify-center items-center p-6">
        <form className="w-[400px] text-[#87878a] space-y-8">
          <h1 className="text-[#d75413] text-3xl font-bold text-center">
            Login
          </h1>
          <div className="w-full space-y-2">
            <label htmlFor="email">E-mail:</label>
            <input
              className="w-full h-[30px] shadow-lg text-sm rounded-md p-3"
              type="email"
              name="email"
              placeholder="Digite seu E-mail"
            />
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="password">Senha:</label>
            <input
              className="w-full h-[30px] shadow-lg text-sm rounded-md p-3"
              type="password"
              name="password"
              placeholder="Digite sua Senha"
            />
          </div>
          <button className="w-full h-[30px] bg-[#d75413] rounded-md text-[#fffafa] text-sm hover:opacity-90 shadow-lg">
            Entrar
          </button>
          <p className="text-center">
            <a href="#" className="text-[#d75413] hover:opacity-80">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
