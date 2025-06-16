import { useEffect, useState } from 'react';

export type Animal = {
  id: number;
  name: string; 
  shortDescription: string;
  imageUrl: string;
};

export const useAnimals = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("https://animals.azurewebsites.net/api/animals")
    .then((res) => res.json())
    .then((data) => {
      setAnimals(data);
      setLoading(false);
    })
    .catch((err) => {
        console.error("Error fetching animals:", err);
        setLoading(false);
      });
  }, []);
  return { animals, loading };
};

