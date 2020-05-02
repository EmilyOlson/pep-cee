import { AppState } from './state.interfaces';

export const defaultState: AppState = { 
    facts: [],
    spacePhoto: {
        title: 'huh',
        author: 'me',
        href: 'https://apod.nasa.gov/apod/image/2004/M31Dec2019final1YuzheB2_1024.jpg',
        text: 'test test test...',
    }
}