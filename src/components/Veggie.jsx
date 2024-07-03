import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      try {
        const parsedData = JSON.parse(check);
        setVeggie(parsedData);
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        localStorage.removeItem("veggie");
      }
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=9&tags=vegetarian`
      );
      // Convert API response to JSON format
      const data = await api.json();

      localStorage.setItem("veggie", JSON.stringify(data.recipes));

      // Update state with the fetched recipes
      setVeggie(data.recipes); // the API response has a 'recipes' array
      console.log(data.recipes);
    }
  };
  return (
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
        }}
      >
        {veggie.map((recipe) => (
          <SplideSlide key={recipe.id}>
            <Card>
              <Link to={"/recipe/" + recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Link>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
