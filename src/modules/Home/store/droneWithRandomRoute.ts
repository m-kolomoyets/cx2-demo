import { middlewares } from '@/store/middleware';
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type DroneWithAreaState = {
    drones: string[];
};

type DroneWithAreaActions = {
    clearDrones: () => void;
    // eslint-disable-next-line no-unused-vars
    addDrone: (droneId: string) => void;
    // eslint-disable-next-line no-unused-vars
    removeDrone: (droneId: string) => void;
};

export type DroneWithAreaStore = DroneWithAreaState & DroneWithAreaActions;

const initialState: DroneWithAreaState = {
    drones: [],
};

const createStore: StateCreator<DroneWithAreaStore, [['zustand/devtools', never]]> = (set) => {
    return {
        ...initialState,
        clearDrones() {
            set(
                (state) => {
                    state.drones = [];

                    return state;
                },
                false,
                {
                    type: 'drone-with-random-route-store/clearDrones',
                }
            );
        },
        addDrone(droneId) {
            set(
                (state) => {
                    state.drones.push(droneId);

                    return state;
                },
                false,
                {
                    type: 'drone-with-random-route-store/addDrone',
                    payload: {
                        droneId,
                    },
                }
            );
        },
        removeDrone(droneId) {
            set(
                (state) => {
                    state.drones = state.drones.filter((id) => {
                        return id !== droneId;
                    });

                    return state;
                },
                false,
                {
                    type: 'drone-with-random-route-store/removeDrone',
                    payload: {
                        droneId,
                    },
                }
            );
        },
    };
};

export const useDroneWithRandomRouteStore = create<DroneWithAreaStore>()(
    middlewares('drone-with-random-route-store', persist(immer(createStore), { name: 'drone-with-random-route-store' }))
);
