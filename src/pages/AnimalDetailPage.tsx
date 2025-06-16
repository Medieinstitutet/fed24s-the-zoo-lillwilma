import { useParams} from 'react-router-dom';
import { useAnimals } from '../hooks/useAnimals';
import { useFeeding } from '../contexts/FeedingContext';



const AnimalDetailPage = () => {
    const {animalId}= useParams();
    const { animals, loading } = useAnimals();
    const { state: feedingState, dispatch } = useFeeding();

    if (loading) return <p>Loading...</p>;

    const animal = animals.length > 0 ? animals.find((a) => a.id === Number(animalId)) : null;
    if (!animal) {
    return <p>Loading...</p>;
}


    const lastFed = feedingState[animal.id];
    const now = Date.now();
    const hours = lastFed ? (now - lastFed) / 1000 / 60 / 60 : null;

    const canFeed = !hours || hours >= 4;
    const warning = hours && hours >=3 && hours < 4;

    return (
        <div className="animal-detail fade-in">
            <h1>{animal.name}</h1>
            <img
                src={animal.imageUrl}
                alt={animal.name}
                width="200"
                onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/200"; 
                }}
            />
            <p>{animal.shortDescription}</p>
            {warning && <p>Animal is hungry!</p>}
            <button onClick={()=> dispatch({ type: "FEED", animalId: animal.id.toString(), time: Date.now() })} disabled={!canFeed}>
                {canFeed ? "Feed Animal" : "Cannot Feed Yet"}
            </button>
        </div>
    );
};
export default AnimalDetailPage;
