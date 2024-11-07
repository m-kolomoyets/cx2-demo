import { memo, useState } from 'react';
import { WithChildren } from '@/types';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_API_KEY, KYIV_COORDINATES } from '@/constants';
import { MAP_CONFIGS, MapConfig } from './constants';

const GoogleMap: React.FC<WithChildren> = ({ children }) => {
    const [mapConfig] = useState<MapConfig>(MAP_CONFIGS[0]);

    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
                style={{ width: '100vw', height: '100vh' }}
                defaultCenter={KYIV_COORDINATES}
                defaultZoom={12}
                minZoom={10}
                maxZoom={15}
                gestureHandling="greedy"
                disableDefaultUI
                mapId={mapConfig.mapId || null}
                mapTypeId={mapConfig.mapTypeId}
                styles={mapConfig.styles}
            >
                {children}
            </Map>
        </APIProvider>
    );
};

export default memo(GoogleMap);
