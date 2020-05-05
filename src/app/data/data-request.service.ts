
import { Photo, Satellite } from './state.interfaces';
import { defaultState } from './default-state.data';

export class DataRequestService {
    private readonly pictureOfTheDayRoute: string = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
    private readonly issLocation: string = 'http://api.open-notify.org/iss-now.json';

    async getPictureOfTheDay(): Promise<Photo> {
        const response = await fetch(this.pictureOfTheDayRoute);
        const data = await response.json();
        if (data.media_type && data.media_type === 'image') {
            return {
                title: data.title,
                author: data.copyright,
                href: data.url,
                text: data.explanation,
            }
        } else {
            return defaultState.spacePhoto;
        }
    }

    async getIssCoordinates(): Promise<Satellite> {
        const response = await fetch(this.issLocation)
        const data = await response.json();
        console.log(data);
        if(data.message && data.message === 'success' && data.iss_position) {
            return {
                position: {
                    latitude: data.iss_position.latitude,
                    longitude: data.iss_position.longitude
                },
                timestamp: data.timestamp
            }
        } else {
            return defaultState.satellite;
        }
    }
}