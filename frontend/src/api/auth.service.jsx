const BASE_URL = "https://organiza-io-api.vercel.app/api/auth";

const authService = {
  loginUser: async (user) => {
    try {
      const url = `${BASE_URL}/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      return response;
    } catch (error) {
      console.log("Erro ao buscar dados da API");
    }
  },

  signupUser: async (user) => {
    try {
      const url = `${BASE_URL}/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      return response;
    } catch (error) {
      console.log("Erro ao buscar dados da API");
    }
  },
};

export { authService };
