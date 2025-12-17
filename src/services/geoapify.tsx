import axios from "axios";

const geopify = async (location: string) => {
  try {
    const response = await axios.get("https://api.geoapify.com/v1/geocode/autocomplete", {
      params: {
        text: location,
        apiKey: "1c3c2a3a2ebd462eabdf40e04cca6308",
      },
    });

      
    return response.data ; 
  } catch (error) {
    
    throw error ; 
  }
};



export { 
    geopify
}