import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Popular() {
  // State to hold the fetched popular recipes
  const [popular, setPopular] = useState([]);

  // useEffect hook to fetch popular recipes when component mounts
  useEffect(() => {
    getPopular();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=9`
    );

    // Convert API response to JSON format
    const data = await api.json();
    console.log(data);
    // Update state with the fetched recipes
    setPopular(data.recipes); // the API response has a 'recipes' array
  };
  return (
    <div>
      {popular.map((recipe) => {
        return (
          <Wrapper>
            <h3>Popular Picks</h3>
            {popular.map((recipe) => {
              return (
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Card>
              );
            })}
          </Wrapper>
        );
      })}
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;

  img {
    border-radius: 2rem;
  }
`;

export default Popular;
