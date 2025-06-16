import { useAnimals } from "../hooks/useAnimals";
import { Link } from "react-router-dom";
import { useFeeding } from "../contexts/FeedingContext";

const AnimalsPage = () => {
  const { animals, loading } = useAnimals();
  const { state: feedingState } = useFeeding();

  const getStatus = (animalId: number) => {
    const lastFed = feedingState[animalId];
    if (!lastFed) return "Desperate for food!";

    const now = Date.now();
    const hours = (now - lastFed) / 1000 / 60 / 60;
    if (hours < 3) return "Well-fed";
    if (hours < 5) return "Hungry";
  };


  if (loading) {
    return <p>Loading animals...</p>;
  }

  return (
    <div className= "fade-in">
      <h1>Animals in the zoo</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id} className="animal-card">
            <Link to={`/animals/${animal.id}`}>
              <img
                src={animal.imageUrl}
                alt={animal.name}
                width="100"
            height="100"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/100"; 
            }}
            />
            <h2>{animal.name}</h2>
            <p>{animal.shortDescription}</p>
            <p>Status: {getStatus(animal.id)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AnimalsPage;