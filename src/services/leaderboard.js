import axios from "axios";
export const getLeaderBoard = async ({selected_leaderboard}) => {
  const config = {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    // console.log(user)
    const { data } = await axios.get(
    //   "http://localhost:8000/ipl2/leaderboard1/",
    "http://localhost:8000/ipl2/leaderboard3/",
      config,{selected_leaderboard}
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    console.log(error);
    throw new Error(error.message);
  }
};
export const getLeaderBoard2 = async ({selected_leaderboard}) => {
    const config = {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      // console.log(user)
      const { data } = await axios.get(
      //   "http://localhost:8000/ipl2/leaderboard1/",
      `http://localhost:8000/ipl2/leaderboard2?selected_leaderboard=${selected_leaderboard}`,
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

export const getUserSubmission = async ({username}) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.get(`http://localhost:8000/ipl2/user_submissions/${username}/`, config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };