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

export const predictMatch = async ({ match_id, formData }) => {
  const body = JSON.stringify({ match_id, formData });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "http://localhost:8000/ipl2/predict1/1/",
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

export const getMatchDetails = async ({ match_id }) => {
    
    try {
      const { data } = await axios.get(
        "http://localhost:8000/ipl2/predict1/1/",

      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      console.log(error);
      throw new Error(error.message);
    }
  };