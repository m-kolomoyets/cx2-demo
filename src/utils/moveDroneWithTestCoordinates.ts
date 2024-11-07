import { TEST_COORDINATES_DELTA } from '@/constants';

let currentIndex = 0;

export const moveDroneWithTestCoordinates = (
    currentCoordinates: google.maps.LatLngLiteral
): google.maps.LatLngLiteral => {
    const nextCoordinates = TEST_COORDINATES_DELTA[currentIndex];

    currentIndex = (currentIndex + 1) % TEST_COORDINATES_DELTA.length;

    return {
        lat: currentCoordinates.lat + nextCoordinates.lat,
        lng: currentCoordinates.lng + nextCoordinates.lng,
    };
};
