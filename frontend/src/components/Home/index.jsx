import { useState } from "react";
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
import CloseIcon from "../../assets/close-icon.svg";

const Home = () => {
  const [newTask, SetNewTask] = useState(false);

  return (
    <>
      <div className="relative">
        <Header />
        <div className="w-full min-h-screen flex items-center justify-center py-[80px]">
          <div className="space-y-8">
            <div className="shadow-sm">
              <Timeline />
            </div>
            <div className="w-fit mx-auto">
              <button
                onClick={() => SetNewTask(true)}
                className="bg-green-700/80 text-white text-sm py-1 px-3 rounded-md hover:opacity-90 shadow-lg"
              >
                Adicionar
              </button>
              {newTask ? <AddNewTask SetNewTask={SetNewTask} /> : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
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

const AddNewTask = ({ SetNewTask }) => {
  return (
    <>
      <div className="w-full h-screen xl:absolute fixed top-0 left-0 flex justify-center items-center">
        <div className="w-[1000px] h-fit bg-white border border-gray-200 shadow-lg relative">
          <img
            src={CloseIcon}
            className="w-6 cursor-pointer absolute right-0"
            onClick={() => {
              SetNewTask(false);
            }}
            alt="Botão para fechar janela"
          />
          {/* Used Image: https://www.svgrepo.com/svg/521106/close */}

          <form className="max-w-[400px] text-tertiary space-y-8 mx-auto px-2 py-10">
            <h1 className="text-primary text-3xl font-bold text-center">
              Adicionar
            </h1>
            <div className="w-full space-y-2">
              <label htmlFor="day">Dia da Semana:</label>
              <select
                name="day"
                className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
              >
                <option value="monday">Segunda-Feira</option>
                <option value="tuesday">Terça-Feira</option>
                <option value="wednesday">Quarta-Feira</option>
                <option value="thursday">Quinta-Feira</option>
                <option value="friday">Sexta-Feira</option>
                <option value="saturday">Sábado</option>
                <option value="sunday">Domingo</option>
              </select>
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="start">Início:</label>
              <input
                className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
                type="time"
                name="start"
              />
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="end">Término:</label>
              <input
                className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
                type="time"
                name="end"
              />
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="activity">Atividade:</label>
              <input
                className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
                type="text"
                name="activity"
                placeholder="Digite um Rótulo para a Atividade"
              />
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="activity">Atividade:</label>
              <textarea
                rows="4"
                className="w-full shadow-lg text-sm rounded-md px-3 resize-none"
                type="text"
                name="activity"
                placeholder="Digite um Rótulo para a Atividade"
              />
            </div>
            <button className="w-full h-[30px] bg-primary rounded-md text-white text-sm hover:opacity-90 shadow-lg">
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
