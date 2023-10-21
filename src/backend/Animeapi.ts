import axios from "axios";

const AnimeProviders = {
  ANIMEPAHE: "animepahe",
  GOGO: "gogoanime",
  ZORO: "zoro",
  ENIME: "enime",
};

export type AnimeProvider = keyof typeof AnimeProviders;

export class Animeapi {
  host = "https://api.consumet.org";
  provider;

  constructor(provider: AnimeProvider = "GOGO") {
    this.provider = AnimeProviders[provider];
  }

  async consumetApiGetCall(path: string = "", params = {}) {
    const url = `${this.host}${path.startsWith("/") ? path : `/${path}`}`;
    return (
      await axios.get(url, {
        params: {
          provider: this.provider,
          ...params,
        },
      })
    ).data;
  }

  async advancedSearch(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/advanced-search", params);
  }

  async getRandom(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/random-anime", params);
  }

  async getTrending(params = {}) {
    return this.consumetApiGetCall("/meta/anilist/advanced-search", params);
  }

  async getRecentEpisodes(params = {}) {
    return await axios.get(
      "https://anidote-api.vercel.app/anime/gogoanime/recent-episodes"
    );
  }

  async getPopular(params = {}) {
    return this.consumetApiGetCall("anime/gogoanime/top-airing", params);
  }

  async getUpcomingAnimes(params = {}) {
    return (
      await axios.get("https://api.jikan.moe/v4/top/anime", {
        params: {
          filter: "upcoming",
        },
      })
    ).data;
  }

  async getInfo(id) {
    return (
      await axios.get(`https://api.consumet.org/anime/gogoanime/info/${id}`)
    ).data;
  }
}

export const AnimeApi = new Animeapi();
