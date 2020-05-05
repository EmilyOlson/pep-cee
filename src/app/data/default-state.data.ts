import { AppState } from './state.interfaces';

export const defaultState: AppState = { 
    facts: [],
    spacePhoto: {
        title: 'Donec Arcu Sapien. uspendisse pharetra eget velit eu fermentum',
        author: 'me',
        href: 'https://apod.nasa.gov/apod/image/2004/M31Dec2019final1YuzheB2_1024.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pharetra eget velit eu fermentum. Proin molestie ante in arcu vehicula, vel gravida leo maximus. In eget dolor quis diam ornare tempus sed non metus. In a dui tortor. Curabitur bibendum, nisi a mollis tempor, elit risus sagittis velit, ut efficitur est urna et massa. Nunc orci justo, convallis vitae placerat et, lacinia ac felis. Donec arcu sapien, luctus et risus imperdiet, lobortis lacinia tellus. Maecenas id imperdiet elit. Duis molestie eleifend nulla, a pharetra lectus efficitur nec. Quisque eu pulvinar ligula. Quisque hendrerit est urna, vitae viverra eros varius in. Etiam molestie congue nulla, quis ultricies mi interdum ac. Morbi purus lectus, accumsan ut urna non, vehicula aliquet justo. Morbi auctor et orci ac maximus.',
    },
    satellite: {
        position: {
            latitude: '-28.4007',
            longitude: '-48.1709'
        },
        timestamp: 1588606678,
    }
}