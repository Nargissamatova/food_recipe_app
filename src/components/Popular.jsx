import { useEffect, useState } from "react";

function Popular() {
  // State to hold the fetched popular recipes
  const [popular, setPopular] = useState([]);

  // useEffect hook to fetch popular recipes when component mounts
  useEffect(() => {
    getPopular(); // Call getPopular function when component mounts
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  // Function to fetch popular recipes from API
  const getPopular = async () => {
    try {
      // Fetch data from the API
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=9`
      );

      // Convert API response to JSON format
      const data = await api.json();

      // Log the fetched data (optional)
      console.log(data);

      // Update state with the fetched recipes
      setPopular(data.recipes); // Assuming the API response has a 'recipes' array
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
    }
  };

  return <div>popular</div>;
}

export default Popular;
