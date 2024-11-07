import { memo } from 'react';
import DroneWithRandomRoute from './components/DroneWithRandomRoute/DroneWithRandomRoute';
import { useDroneWithRandomRouteStore } from '../../store/droneWithRandomRoute';

const DronesWithRandomRoute: React.FC = () => {
    const { drones } = useDroneWithRandomRouteStore();

    if (!drones.length) {
        return null;
    }

    return (
        <>
            {drones.map((drone) => {
                return <DroneWithRandomRoute key={drone} id={drone} />;
            })}
        </>
    );
};

export default memo(DronesWithRandomRoute);
