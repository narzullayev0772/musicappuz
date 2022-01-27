const axios = require("axios");

export const getTracks = async (page) => {
  try {
    if (page < 25) {
      const users = await axios.get(
        `https://api-music-uz.herokuapp.com/music/api/uz/${page}`
      );

      return users.data.tracks;
    }
  } catch (error) {
    console.error(error);
  }
};
