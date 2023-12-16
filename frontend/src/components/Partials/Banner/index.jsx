import BannerImg from "../../../assets/banner-img.jpg";

const Banner = () => {
  return (
    <>
      <div className="hidden relative w-3/5 h-full xl:inline-block">
        <div className="absolute w-full top-[45%] left-[10%] mt-[-25px] font-bold text-white">
          <h1 className="w-[53%] text-6xl">Organize suas ideias</h1>
          <h2 className="text-primary w-[40%] text-[45px] leading-[60px]">
            Tudo em um só lugar
          </h2>
        </div>
        <img src={BannerImg} className="h-full w-full" alt="Banner da Página" />
        {/* Used Image: https://www.pexels.com/pt-br/foto/livro-de-cor-cinza-padrao-perto-de-borracha-verde-159045/ */}
      </div>
    </>
  );
};

export default Banner;
