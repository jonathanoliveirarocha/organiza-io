const NotFound = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl text-red-500/70 font-bold">Erro 404</h1>
          <p className="text-lg text-gray-500">Página não encontrada!</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
