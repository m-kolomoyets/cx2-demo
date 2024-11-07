import { memo } from 'react';
import clsx from 'clsx';
import { HomeProvider } from './context/HomeContext';
// import DroneMarker from '@/components/GoogleMap/components/DroneMarker/DroneMarker';
// import { Polyline } from '@/components/GoogleMap/components/PolyLine/PolyLine';
// import { useMissionDrone } from '@/hooks/api/drone';
import GoogleMap from '@/components/GoogleMap';
import DronesWithRandomRoute from './components/DronesWithRandomRoute';
import DronesWithRandomRouteControl from './components/DronesWithRandomRouteControl';
import DroneWithArea from './components/DroneWithArea/DroneWithArea';
import { DroneWithAreaControl } from './components/DroneWithAreaControl/DroneWithAreaControl';
import s from './Home.module.css';

const Home: React.FC = () => {
    return (
        <main className={clsx(s.wrap, 'full-height')}>
            <GoogleMap>
                <HomeProvider>
                    <aside className={clsx(s.aside, 'full-height')}>
                        <DroneWithAreaControl />
                        <DronesWithRandomRouteControl />
                    </aside>
                    <DroneWithArea />
                    <DronesWithRandomRoute />
                </HomeProvider>
            </GoogleMap>
        </main>
    );
};

export default memo(Home);
