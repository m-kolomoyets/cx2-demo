import { memo } from 'react';
import { useDroneWithArea } from './hooks/useDroneWithArea';
import DroneMarker from '@/components/GoogleMap/components/DroneMarker/DroneMarker';
import { Polyline } from '@/components/GoogleMap/components/PolyLine/PolyLine';
import { useDroneWithAreaStore } from '../../store/droneWithArea';

const DroneWithArea: React.FC = () => {
    const { path, isOverlayCompleted, isDrawing } = useDroneWithAreaStore();

    const isTrajectoryEnabled = false;

    const { trajectory, currentPosition, followedPath } = useDroneWithArea();

    if (!path.length || !isOverlayCompleted || isDrawing) {
        return null;
    }

    return (
        <>
            <DroneMarker position={currentPosition} />
            <Polyline
                encodedPath={followedPath}
                strokeOpacity={0}
                icons={[
                    {
                        icon: {
                            path: 'M 0,1 0,0.5',
                            strokeOpacity: 1,
                            strokeColor: 'blue',
                            scale: 4,
                        },
                        offset: '0',
                        repeat: '15px',
                    },
                ]}
            />
            {isTrajectoryEnabled ? (
                <Polyline
                    encodedPath={trajectory}
                    strokeOpacity={0}
                    icons={[
                        {
                            icon: {
                                path: 'M 0,-0.5 0,0',
                                strokeOpacity: 1,
                                strokeColor: 'red',
                                scale: 2.5,
                            },
                            offset: '0',
                            repeat: '10px',
                        },
                    ]}
                />
            ) : null}
            <Polyline
                encodedPath={path}
                strokeOpacity={0}
                icons={[
                    {
                        icon: {
                            path: 'M 0,-1 0,1',
                            strokeOpacity: 1,
                            scale: 3,
                        },
                        offset: '0',
                        repeat: '20px',
                    },
                ]}
            />
        </>
    );
};

export default memo(DroneWithArea);
