import React, { useState, useEffect } from 'react';

interface Props {
  limit: number;
  aa: string;
}

const PokeHook = ({ limit, aa }: Props) => {
  const [ pokemons, setPokemons ] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(false);
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await response.json();
      setLoading(false);
      setPokemons(data.results);
    })();
  }, [limit]);

  return (
    <>
    <ul>
      {pokemons.map((pokemon) => (
        <li key={pokemon.url}>{pokemon.name}</li>
        ))}
        {loading ? <li>Carregando...</li> : <></> }
    </ul>
    </> 
  )
}

export default PokeHook;
