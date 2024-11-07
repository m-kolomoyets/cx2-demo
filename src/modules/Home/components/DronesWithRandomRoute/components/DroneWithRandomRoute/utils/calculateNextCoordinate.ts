import { NEXT_COORDINATE_STEP } from '../constants';

export const calculateNextCoordinate = (path: google.maps.LatLngLiteral) => {
    const latCoof = Math.random() > 0.5 ? 1 : -1;
    const lngCoof = Math.random() > 0.5 ? 1 : -1;

    const nextCoordinate = {
        lat: path.lat + NEXT_COORDINATE_STEP * latCoof * Math.random(),
        lng: path.lng + NEXT_COORDINATE_STEP * lngCoof * Math.random(),
    };

    return nextCoordinate;
};
