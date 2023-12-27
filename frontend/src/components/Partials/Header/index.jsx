const Header = ({ username }) => {
  return (
    <>
      <header className="w-full h-[50px] fixed bg-secondary z-50">
        <div className="w-full h-full relative flex items-center px-6">
          <h1 className="hidden sm:block text-white text-xl font-bold">
            Organiza<span className="text-primary">.io</span>
          </h1>
          <div className="absolute right-16 space-x-5">
            <span className="text-white hover:text-primary cursor-pointer text-sm">
              {username}
            </span>
            <button className="py-1 text-sm w-20 bg-primary text-white rounded-md hover:opacity-90">
              Sair
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
