import { middlewares } from '@/store/middleware';
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type DroneWithAreaState = {
    isDrawing: boolean;
    isOverlayCompleted: boolean;
    path: google.maps.LatLngLiteral[];
};

type DroneWithAreaActions = {
    // eslint-disable-next-line no-unused-vars
    setIsDrawing: (value?: boolean) => void;
    // eslint-disable-next-line no-unused-vars
    setIsOverlayCompleted: (value?: boolean) => void;
    // eslint-disable-next-line no-unused-vars
    setPath: (path: google.maps.LatLngLiteral[]) => void;
};

export type DroneWithAreaStore = DroneWithAreaState & DroneWithAreaActions;

const initialState: DroneWithAreaState = {
    isDrawing: false,
    isOverlayCompleted: false,
    path: [],
};

const createStore: StateCreator<DroneWithAreaStore, [['zustand/devtools', never]]> = (set) => {
    return {
        ...initialState,
        setIsDrawing(value) {
            set(
                (state) => {
                    if (value === undefined) {
                        state.isDrawing = !state.isDrawing;
                        return state;
                    }

                    state.isDrawing = value;

                    return state;
                },
                false,
                {
                    type: 'drone-with-area-store/setIsDrawing',
                    payload: {
                        value,
                    },
                }
            );
        },
        setIsOverlayCompleted(value) {
            set(
                (state) => {
                    if (value === undefined) {
                        state.isOverlayCompleted = !state.isOverlayCompleted;
                        return state;
                    }

                    state.isOverlayCompleted = value;

                    return state;
                },
                false,
                {
                    type: 'drone-with-area-store/setIsOverlayCompleted',
                    payload: {
                        value,
                    },
                }
            );
        },
        setPath(path) {
            set(
                (state) => {
                    if (!path.length) {
                        state.path = [];
                        return state;
                    }

                    const isPathClosed =
                        path[0].lat === path[path.length - 1].lat && path[0].lng === path[path.length - 1].lng;

                    state.path = isPathClosed ? path : [...path, path[0]];

                    return state;
                },
                false,
                {
                    type: 'drone-with-area-store/setPath',
                    payload: {
                        path,
                    },
                }
            );
        },
    };
};

export const useDroneWithAreaStore = create<DroneWithAreaStore>()(
    middlewares('drone-with-area-store', persist(immer(createStore), { name: 'drone-with-area-store' }))
);
