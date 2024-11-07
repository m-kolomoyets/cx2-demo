import { memo } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Component as DroneIcon } from '@/icons/drone.svg?svgUse';
import s from './DroneMarker.module.css';

type DroneMarkerProps = {
    position: google.maps.LatLngLiteral;
    onClick?: () => void;
};

const DroneMarker: React.FC<DroneMarkerProps> = ({ position, onClick }) => {
    return (
        <AdvancedMarker position={position} className={s.marker} onClick={onClick}>
            <DroneIcon className={s.icon} />
        </AdvancedMarker>
    );
};

export default memo(DroneMarker);
