const MapTypeId = {
    HYBRID: 'hybrid',
    ROADMAP: 'roadmap',
    SATELLITE: 'satellite',
    TERRAIN: 'terrain',
};
export type MapConfig = {
    id: string;
    label: string;
    mapId?: string;
    mapTypeId?: string;
    styles?: google.maps.MapTypeStyle[];
};

export const MAP_CONFIGS: MapConfig[] = [
    {
        id: 'light',
        label: 'Light',
        mapId: '49ae42fed52588c3',
        mapTypeId: MapTypeId.ROADMAP,
    },
    {
        id: 'hybrid2',
        label: 'Hybrid ("light" mapId)',
        mapId: '49ae42fed52588c3',
        mapTypeId: MapTypeId.HYBRID,
    },
];
