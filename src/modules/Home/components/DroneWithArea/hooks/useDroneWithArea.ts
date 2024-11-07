import { useMemo } from 'react';
import { useCounter, useIntervalEffect, useList, useToggle, useUpdateEffect } from '@react-hookz/web';
import { useDroneWithAreaStore } from '@/modules/Home/store/droneWithArea';
import { generateSnakePathByPolygon } from '@/utils/generateSnakePathByPolygon';
import { ONE_SECOND } from '@/constants';
import { MAP_TRAJECTORY_STEP } from '../constants';

export const useDroneWithArea = () => {
    const { path, isDrawing } = useDroneWithAreaStore();

    const trajectory = useMemo(() => {
        return generateSnakePathByPolygon(path, MAP_TRAJECTORY_STEP);
    }, [path]);

    const [isForwards, toggleIsForwards] = useToggle(true);
    const [currentIndex, { inc: incrementCurrentIndex, dec: decrementCurrentIndex }] = useCounter(0);
    const [followedPath, { push: pushToFollowedPath }] = useList<google.maps.LatLngLiteral>([]);

    console.log(followedPath);

    const currentPosition = useMemo(() => {
        return trajectory[currentIndex];
    }, [currentIndex, trajectory]);

    useUpdateEffect(() => {
        if (currentIndex === 0) {
            toggleIsForwards(true);
            return;
        }

        if (currentIndex === trajectory.length - 1) {
            toggleIsForwards(false);
        }
    }, [isForwards, currentIndex]);

    useIntervalEffect(
        () => {
            if (isForwards) {
                incrementCurrentIndex();
                return;
            }

            decrementCurrentIndex();
        },
        isDrawing ? undefined : 3 * ONE_SECOND
    );

    useUpdateEffect(() => {
        pushToFollowedPath(trajectory[currentIndex]);
    }, [currentPosition]);

    return {
        trajectory,
        currentPosition,
        followedPath,
    };
};
