import Header from "../Partials/Header";
import Footer from "../Partials/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex items-center justify-center py-[80px]">
        <div className="space-y-8">
          <div className="shadow-sm">
            <Timeline />
          </div>
          <div className="w-fit mx-auto">
            <button className="bg-green-700/80 text-white text-sm py-1 px-3 rounded-md hover:opacity-90 shadow-lg">
              Adicionar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const Timeline = () => {
  return (
    <>
      <div className="xl:flex">
        <DayWeek day="Segunda-Feira" />
        <DayWeek day="Terça-Feira" />
        <DayWeek day="Quarta-Feira" />
        <DayWeek day="Quinta-Feira" />
        <DayWeek day="Sexta-Feira" />
        <DayWeek day="Sábado" />
        <DayWeek day="Domingo" />
      </div>
    </>
  );
};

const DayWeek = ({ day }) => {
  return (
    <>
      <div className="xl:w-[170px] w-64 border border-gray-200">
        <div className="bg-gray-200 py-2">
          <h2 className="text-center text-xl font-bold">{day}</h2>
        </div>
        <div className="xl:h-[500px] h-48"></div>
      </div>
    </>
  );
};

export default Home;
