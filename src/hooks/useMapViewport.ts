import { useMemo } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

export const useMapViewport = () => {
    const map = useMap();

    const viewport = useMemo(() => {
        if (!map) {
            return null;
        }

        const bounds = map.getBounds();

        if (!bounds) {
            return null;
        }

        const { lat: northEastLat, lng: northEastLng } = bounds.getNorthEast();
        const { lat: southWestLat, lng: southWestLng } = bounds.getSouthWest();
        const { lat: centerLat, lng: centerLng } = bounds.getCenter();

        return {
            northEast: { lat: northEastLat(), lng: northEastLng() },
            southWest: { lat: southWestLat(), lng: southWestLng() },
            center: { lat: centerLat(), lng: centerLng() },
        };
    }, [map]);

    return viewport;
};
