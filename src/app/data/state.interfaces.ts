
export interface AppState {
    facts: Fact[],
    spacePhoto: Photo,
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