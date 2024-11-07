import { memo, useCallback } from 'react';
import Button from '@/components/Button';
import { Component as PlusIcon } from '@/icons/plus.svg?svgUse';
import { Component as TrashIcon } from '@/icons/trash.svg?svgUse';
import { useDroneWithRandomRouteStore } from '../../store/droneWithRandomRoute';
import s from './DronesWithRandomRouteControl.module.css';

const DronesWithRandomRouteControl: React.FC = () => {
    const { addDrone, clearDrones } = useDroneWithRandomRouteStore();

    const addDroneHandler = useCallback(() => {
        addDrone(Math.random().toString());
    }, [addDrone]);

    return (
        <div>
            <h2 className={s.title}>Random Drones Tools</h2>
            <Button onClick={addDroneHandler}>
                <PlusIcon className={s.icon} />
                Add drone
            </Button>
            <Button onClick={clearDrones}>
                <TrashIcon className={s.icon} />
                Clear drones
            </Button>
        </div>
    );
};

export default memo(DronesWithRandomRouteControl);
