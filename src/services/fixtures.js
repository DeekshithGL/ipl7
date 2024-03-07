import axios from "axios";
export const getFixtures = async ({}) => {
  const config = {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const { data } = await axios.get(
      "http://localhost:8000/ipl2/fixtures/",
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    console.log(error);
    throw new Error(error.message);
  }
};

export const predictMatch = async ({
  predicted_winner_team,
  predicted_player_of_the_match,
  predicted_most_runs_scorer,
  predicted_most_wicket_taker,
  username,
  match_id
}) => {
  const body = JSON.stringify({
    predicted_winner_team,
    predicted_player_of_the_match,
    predicted_most_runs_scorer,
    predicted_most_wicket_taker,
    username,
    match_id
  });
  console.log(body)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      `http://localhost:8000/ipl2/predict1/${match_id}/`,
      body
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    console.log(error);
    throw new Error(error.message);
  }
};

export const getMatchDetails = async (parsedMatchId) => {
    console.log(parsedMatchId)
    try {
      const { data } = await axios.get(
        `http://localhost:8000/ipl2/predict1/${parsedMatchId}/`,

      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };

  export const getMatchDetailss = async (parsedMatchId) => {
    console.log(parsedMatchId)
    try {
      const { data } = await axios.get(
        `http://localhost:8000/ipl2/getmatchdetails/${parsedMatchId}/`,

      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };
  export const getTodayMatch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/ipl2/home/`,

      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };