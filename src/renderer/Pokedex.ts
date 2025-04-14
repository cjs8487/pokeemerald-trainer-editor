import { Ability, Item, Nature, Pokedex } from 'pokeapi-js-wrapper';

export const pokedex = new Pokedex({});

let pokemonList: string[] = [];
let heldItemList: Item[] = [];
let natureList: Nature[] = [];
const abilityList: Map<string, Ability> = new Map();

export const loadGlobalData = async (callback: () => void) => {
    const monList = await pokedex.getPokemonsList();
    pokemonList = monList.results.map(
        (v) => v.name.charAt(0).toUpperCase() + v.name.slice(1),
    );

    const holdableAttribute = await pokedex.getItemAttributeByName('holdable');
    heldItemList = await Promise.all(
        holdableAttribute.items.map(async (i) => pokedex.getItemByName(i.name)),
    );

    const natures = await pokedex.getNaturesList();
    natureList = await Promise.all(
        natures.results.map((n) => pokedex.getNatureByName(n.name)),
    );

    const abilities = await pokedex.getAbilitiesList();
    await Promise.all(
        abilities.results.map(async (a) => {
            const ability = await pokedex.getAbilityByName(a.name);
            abilityList.set(a.name, ability);
        }),
    );

    callback();
};

export const getPokemonList = () => pokemonList;

export const getHeldItemList = () => heldItemList;

export const getNatureList = () => natureList;

export const getAbilityList = () => abilityList;

export const getAbility = (name: string) => abilityList.get(name);
