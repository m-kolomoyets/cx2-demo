import { useMemo } from 'react';
import { useIntervalEffect, useList } from '@react-hookz/web';
import { calculateNextCoordinate } from '../utils/calculateNextCoordinate';
import { KYIV_COORDINATES, ONE_SECOND } from '@/constants';

export const useDroneWithRandomRoute = (initialPosition = KYIV_COORDINATES) => {
    const [path, { push: pushToPath }] = useList<google.maps.LatLngLiteral>([initialPosition]);

    const currentCoordinate = useMemo(() => {
        return path?.[path.length - 1];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path.length]);

    useIntervalEffect(() => {
        const nextCoordinate = calculateNextCoordinate(currentCoordinate);

        pushToPath(nextCoordinate);
    }, 2 * ONE_SECOND);

    return {
        currentCoordinate,
        path,
    };
};
