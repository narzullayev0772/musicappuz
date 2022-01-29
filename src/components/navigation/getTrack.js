const axios = require("axios");

export const getTracks = async (page) => {
  try {
    // const liked = await axios.get(`${process.env.REACT_APP_URL}music/like`);

    if (page < 25) {
      const users = await axios.get(
        `https://api-music-uz.herokuapp.com/music/api/${page}`
      );

      return users.data.tracks;
    }
  } catch (error) {
    console.error(error);
  }
};
