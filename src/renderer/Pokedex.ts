import { Pokedex } from 'pokeapi-js-wrapper';

export const pokedex = new Pokedex({});

let pokemonList: string[] = [];

export const loadGlobalData = async (callback: () => void) => {
    const monList = await pokedex.getPokemonsList();
    pokemonList = monList.results.map(
        (v) => v.name.charAt(0).toUpperCase() + v.name.slice(1),
    );
    callback();
};

export const getPokemonList = () => pokemonList;
