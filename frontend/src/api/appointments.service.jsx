const BASE_URL = "https://organiza-io-api.vercel.app/api/appointments";

const appointmentsService = {
  getData: async (token) => {
    try {
      const url = `${BASE_URL}/get_data`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      return response;
    } catch (error) {
      console.log("Erro ao buscar dados da API");
    }
  },

  postData: async (token, data) => {
    try {
      const url = `${BASE_URL}/post_data`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error) {
      console.log("Erro ao buscar dados da API");
    }
  },

  deleteData: async (token, data) => {
    try {
      const url = `${BASE_URL}/delete_data`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      return response;
    } catch (error) {
      console.log("Erro ao buscar dados da API");
    }
  },
};

export { appointmentsService };
