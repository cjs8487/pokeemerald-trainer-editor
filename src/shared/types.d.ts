import { Pokemon } from 'koffing';

export interface Trainer {
    key: string;
    name: string;
    pic: string;
    class: string;
    gender: 'Male' | 'Female';
    music: string;
    items: string[];
    doubleBattle: boolean;
    ai: string[];
    mugshot?: 'Purple' | 'Green' | 'Pink' | 'Blue' | 'Yellow';
    startingStatus?: unknown;
    pokemon?: Pokemon[];
}
