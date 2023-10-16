import { Animeapi } from "./Animeapi";

const getTrending = async () => {
    try {
      const data = await Animeapi.getTrending();
      console.log((data.results));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
