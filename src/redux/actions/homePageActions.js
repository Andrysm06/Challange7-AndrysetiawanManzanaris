import axios from "axios";
import { fetchDatas } from "../reducers/homePageReducers";

export const fetchData = (page) => async (dispatch) => {
  try {
    const API_KEY = "86805d3f5cae4725244fe5e0f2c0bc28";

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?&api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );

    dispatch(fetchDatas(response.data.results));
  } catch (error) {
    console.error("Error fetching data:", error);
    dispatch({
      type: "FETCH_DATA_ERROR",
      payload: error.message,
    });
  }
};
