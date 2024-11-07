/**
 * Environment variables
 */
export const IS_DEV = import.meta.env.DEV;
export const API_URL = import.meta.env.VITE_API_URL;
export const BASE_PUBLIC_PATH = import.meta.env.VITE_BASE_PUBLIC_PATH;
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * Common constants
 */
export const DEFAULT_TRANSITION = { type: 'linear', duration: 0.15 };

/**
 * Routing constants
 */
export const ROUTES = {
    notFound: '/404',
} as const;

export const ONE_SECOND = 1_000;

export const KYIV_COORDINATES = { lat: 50.450001, lng: 30.523333 } as google.maps.LatLngLiteral;

export const TEST_COORDINATES_DELTA = [
    { lat: 0, lng: 0 },
    { lat: 0.03, lng: 0.03 },
    { lat: 0.03, lng: -0.03 },
    { lat: -0.03, lng: -0.03 },
    { lat: -0.03, lng: 0.03 },
    { lat: 0, lng: 0 },
];
