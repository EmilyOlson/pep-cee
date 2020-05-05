
export interface AppState {
    facts: Fact[],
    spacePhoto: Photo,
    satellite: Satellite,
}

export interface Fact {
    img: string,
    title: string,
    text: string,
}

export interface Photo {
    title: string,
    author: string,
    href: string,
    text: string,
}

export interface Satellite {
    position: Position,
    timestamp: number,        
}

export interface Position {
    latitude: string,
    longitude: string,
}