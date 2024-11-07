import { createContext, useCallback, useContext, useState } from 'react';
import { SetToggleValue, WithChildren } from '@/types';
import { useList, useToggle } from '@react-hookz/web';
import { noop } from '@/utils/common';

type HomeContextType = {
    isDrawing: boolean;
    isOverlayCompleted: boolean;
    path: google.maps.LatLngLiteral[];
    setIsDrawing: SetToggleValue;
    setIsOverlayCompleted: SetToggleValue;
    // eslint-disable-next-line no-unused-vars
    setPath: (path: google.maps.LatLngLiteral[]) => void;
    // eslint-disable-next-line no-unused-vars
    updateExistingPath: (path: google.maps.LatLngLiteral[]) => void;
    drones: string[];
    // eslint-disable-next-line no-unused-vars
    removeDrone: (id: string) => void;
    clearDrones: () => void;
    // eslint-disable-next-line no-unused-vars
    pushDrone: (id: string) => void;
};

type HomeProviderProps = WithChildren;

const HomeContext = createContext<HomeContextType>({
    isDrawing: false,
    isOverlayCompleted: false,
    path: [],
    drones: [],
    setPath: noop,
    setIsDrawing: noop,
    setIsOverlayCompleted: noop,
    updateExistingPath: noop,
    removeDrone: noop,
    clearDrones: noop,
    pushDrone: noop,
});

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
    const [isDrawing, setIsDrawing] = useToggle();
    const [isOverlayCompleted, setIsOverlayCompleted] = useToggle();
    const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
    const [drones, { clear: clearDrones, push: pushDrone, removeAt: removeDroneAt }] = useList<string>([]);

    const updateExistingPath = useCallback((newPath: google.maps.LatLngLiteral[]) => {
        const isPathClosed =
            newPath[0].lat === newPath[newPath.length - 1].lat && newPath[0].lng === newPath[newPath.length - 1].lng;

        setPath(isPathClosed ? newPath : [...newPath, newPath[0]]);
    }, []);

    const removeDrone = useCallback(
        (id: string) => {
            const droneIndex = drones.findIndex((droneId) => {
                return droneId === id;
            });

            if (droneIndex !== -1) {
                removeDroneAt(droneIndex);
            }
        },
        [drones, removeDroneAt]
    );

    return (
        <HomeContext.Provider
            value={{
                path,
                isDrawing,
                isOverlayCompleted,
                drones,
                setPath,
                setIsDrawing,
                setIsOverlayCompleted,
                updateExistingPath,
                removeDrone,
                clearDrones,
                pushDrone,
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};

export const useHomeContext = () => {
    return useContext(HomeContext);
};
