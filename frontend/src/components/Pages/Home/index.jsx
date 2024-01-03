import { useState, useEffect } from "react";
import Header from "../../Partials/Header";
import Footer from "../../Partials/Footer";
import CloseIcon from "../../../assets/close-icon.svg";
import { appointmentsService } from "../../../api/appointments.service";

const Home = ({ loadedData, token }) => {
  const [controlTask, setControlTask] = useState(false);
  const [controlTaskType, setControlTaskType] = useState("create");
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const ordHour = (a, b) => {
    const ha = a[0];
    const hb = b[0];
    return ha.localeCompare(hb);
  };

  useEffect(() => {
    const loadingData = () => {
      if (loadedData.appointments && loadedData.appointments[0]) {
        setData({
          monday: loadedData.appointments[0].monday.sort(ordHour),
          tuesday: loadedData.appointments[0].tuesday.sort(ordHour),
          wednesday: loadedData.appointments[0].wednesday.sort(ordHour),
          thursday: loadedData.appointments[0].thursday.sort(ordHour),
          friday: loadedData.appointments[0].friday.sort(ordHour),
          saturday: loadedData.appointments[0].saturday.sort(ordHour),
          sunday: loadedData.appointments[0].sunday.sort(ordHour),
        });
      }
    };

    loadingData();
  }, []);

  const handleClick = (type, data, day, index) => {
    if (type == "create") {
      setControlTaskType("create");
      setSelected(null);
    } else if (type == "show") {
      setControlTaskType("show");
      data.push(day, index);
      setSelected(data);
    }
    setControlTask(!controlTask);
  };

  const addData = async (data) => {
    await appointmentsService.postData(token, data);
    location.reload();
  };

  const removeData = async (day, index) => {
    await appointmentsService.deleteData(token, { day, index });
    location.reload();
  };

  return (
    <>
      <div className="relative">
        <Header username={loadedData.username} />
        <div className="w-full min-h-screen flex items-center justify-center py-[80px]">
          <div className="space-y-8">
            <div className="shadow-sm">
              <Timeline data={data} handleClick={handleClick} />
            </div>
            <div className="w-fit mx-auto">
              <button
                onClick={() => {
                  handleClick("create");
                }}
                className="bg-green-700/80 text-white text-sm py-1 px-3 rounded-md hover:opacity-90 shadow-lg"
              >
                Adicionar
              </button>
              {controlTask ? (
                <ControlTask
                  type={controlTaskType}
                  selected={selected}
                  handleClick={handleClick}
                  removeData={removeData}
                  addData={addData}
                />
              ) : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const Timeline = ({ data, handleClick }) => {
  return (
    <>
      <div className="xl:flex">
        <DayWeek
          day="Segunda-Feira"
          handleClick={handleClick}
          tasks={data.monday}
        />
        <DayWeek
          day="Terça-Feira"
          handleClick={handleClick}
          tasks={data.tuesday}
        />
        <DayWeek
          day="Quarta-Feira"
          handleClick={handleClick}
          tasks={data.wednesday}
        />
        <DayWeek
          day="Quinta-Feira"
          handleClick={handleClick}
          tasks={data.thursday}
        />
        <DayWeek
          day="Sexta-Feira"
          handleClick={handleClick}
          tasks={data.friday}
        />
        <DayWeek day="Sábado" handleClick={handleClick} tasks={data.saturday} />
        <DayWeek day="Domingo" handleClick={handleClick} tasks={data.sunday} />
      </div>
    </>
  );
};

const DayWeek = ({ day, tasks, handleClick }) => {
  return (
    <>
      <div className="xl:w-[170px] w-64 border border-gray-200">
        <div className="bg-gray-200 py-2">
          <h2 className="text-center text-xl font-bold">{day}</h2>
        </div>
        <div className="xl:h-[500px] overflow-y-auto h-48 p-1 text-center space-y-1">
          {tasks.map((element, index) => (
            <div
              className="p-1 bg-gray-200 hover:bg-gray-300 cursor-pointer text-sm text-gray-600 relative"
              key={index}
              onClick={() => {
                handleClick("show", element, day, index);
              }}
            >
              <span className="absolute left-1">{element[0]}</span>
              <span>{element[2]}</span>
              <span className="absolute right-1">{element[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ControlTask = ({ type, handleClick, selected, removeData, addData }) => {
  return (
    <>
      <div className="w-full h-screen xl:absolute fixed top-0 left-0 flex justify-center items-center">
        <div className="w-[1000px] h-fit bg-white border border-gray-200 shadow-lg relative">
          <img
            src={CloseIcon}
            className="w-6 cursor-pointer absolute right-0"
            onClick={() => {
              handleClick("");
            }}
            alt="Botão para fechar janela"
          />
          {/* Used Image: https://www.svgrepo.com/svg/521106/close */}
          <FormTask
            type={type}
            data={selected}
            removeData={removeData}
            addData={addData}
          />
          :
        </div>
      </div>
    </>
  );
};

const FormTask = ({ type, data, removeData, addData }) => {
  const [day, setDay] = useState("monday");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");

  const removeElement = (e) => {
    e.preventDefault();
    removeData(convertPortugueseToEnglish(data[4]), data[5]);
  };

  const addElement = (e) => {
    e.preventDefault();
    addData({ day, start, end, activity, description });
  };

  const convertPortugueseToEnglish = (dayInPortuguese) => {
    switch (dayInPortuguese) {
      case "domingo":
        return "sunday";
      case "Segunda-Feira":
        return "monday";
      case "Terça-Feira":
        return "tuesday";
      case "Quarta-Feira":
        return "wednesday";
      case "Quinta-Feira":
        return "thursday";
      case "Sexta-Feira":
        return "friday";
      case "Sábado":
        return "saturday";
      default:
        return null;
    }
  };

  return (
    <>
      <form
        onSubmit={addElement}
        className="max-w-[400px] text-tertiary space-y-8 mx-auto px-2 py-10"
      >
        <h1 className="text-primary text-3xl font-bold text-center">
          {type == "create" ? "Adicionar" : "Descrição"}
        </h1>
        <div className="w-full space-y-2">
          <label htmlFor="day">Dia da Semana:</label>
          <select
            name="day"
            className="w-full h-[30px] shadow-lg text-sm rounded-md px-3 select-none"
            disabled={data ? true : false}
            value={data ? convertPortugueseToEnglish(data[4]) : null}
            onChange={(e) => {
              setDay(e.target.value);
            }}
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
            disabled={data ? true : false}
            value={data ? data[0] : null}
            onChange={(e) => {
              setStart(e.target.value);
            }}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="end">Término:</label>
          <input
            className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
            type="time"
            name="end"
            disabled={data ? true : false}
            value={data ? data[1] : null}
            onChange={(e) => {
              setEnd(e.target.value);
            }}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="activity">Atividade:</label>
          <input
            className="w-full h-[30px] shadow-lg text-sm rounded-md px-3"
            type="text"
            name="activity"
            placeholder="Digite um Rótulo para a Atividade"
            maxLength="11"
            disabled={data ? true : false}
            value={data ? data[2] : null}
            onChange={(e) => {
              setActivity(e.target.value);
            }}
            required
          />
        </div>
        <div className="w-full space-y-2">
          <label htmlFor="description">Descrição:</label>
          <textarea
            required
            rows="4"
            className="w-full shadow-lg text-sm rounded-md px-3 resize-none"
            type="text"
            name="description"
            placeholder="Digite uma Breve Descrição da Atividade"
            disabled={data ? true : false}
            value={data ? data[3] : null}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button
          type={type == "create" ? "submit" : null}
          className={`w-full h-[30px] ${
            type == "create" ? "bg-primary" : "bg-red-500/90"
          } rounded-md text-white text-sm hover:opacity-90 shadow-lg`}
          onClick={(e) => {
            type == "create" ? null : removeElement(e);
          }}
        >
          {type == "create" ? "Adicionar" : "Remover"}
        </button>
      </form>
    </>
  );
};

export default Home;
