import { memo, useCallback } from 'react';
import type { DroneWithRandomRouteProps } from './types';
import { useMapViewport } from '@/hooks/useMapViewport';
import { useDroneWithRandomRoute } from './hooks/useDroneWithRandomRoute';
import { useDroneWithRandomRouteStore } from '@/modules/Home/store/droneWithRandomRoute';
import DroneMarker from '@/components/GoogleMap/components/DroneMarker/DroneMarker';
import { Polyline } from '@/components/GoogleMap/components/PolyLine/PolyLine';

const DroneWithRandomRoute: React.FC<DroneWithRandomRouteProps> = ({ id }) => {
    const { removeDrone } = useDroneWithRandomRouteStore();
    const mapViewport = useMapViewport();

    const { currentCoordinate, path } = useDroneWithRandomRoute(mapViewport?.center);

    const droneRemoveHandler = useCallback(() => {
        removeDrone(id);
    }, [id, removeDrone]);

    return (
        <>
            <DroneMarker position={currentCoordinate} onClick={droneRemoveHandler} />
            <Polyline
                encodedPath={path}
                strokeOpacity={0}
                icons={[
                    {
                        icon: {
                            path: 'M 0,-0.5 0,0.5',
                            strokeOpacity: 1,
                            strokeColor: 'blue',
                            scale: 4,
                        },
                        offset: '0',
                        repeat: '15px',
                    },
                ]}
            />
        </>
    );
};

export default memo(DroneWithRandomRoute);
