import { forwardRef, Ref, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { GoogleMapsContext, useMapsLibrary } from '@vis.gl/react-google-maps';

type PolylineEventProps = {
    // eslint-disable-next-line no-unused-vars, react/no-unused-prop-types
    onClick?: (e: google.maps.MapMouseEvent) => void;
    // eslint-disable-next-line no-unused-vars, react/no-unused-prop-types
    onDrag?: (e: google.maps.MapMouseEvent) => void;
    // eslint-disable-next-line no-unused-vars, react/no-unused-prop-types
    onDragStart?: (e: google.maps.MapMouseEvent) => void;
    // eslint-disable-next-line no-unused-vars, react/no-unused-prop-types
    onDragEnd?: (e: google.maps.MapMouseEvent) => void;
    // eslint-disable-next-line no-unused-vars, react/no-unused-prop-types
    onMouseOver?: (e: google.maps.MapMouseEvent) => void;
    // eslint-disable-next-line no-unused-vars, react/no-unused-prop-types
    onMouseOut?: (e: google.maps.MapMouseEvent) => void;
};

type PolylineCustomProps = {
    /**
     * this is an encoded string for the path, will be decoded and used as a path
     */
    // eslint-disable-next-line react/no-unused-prop-types
    encodedPath?: google.maps.LatLngLiteral[];
};

export type PolylineRef = Ref<google.maps.Polyline | null>;

export type PolylineProps = google.maps.PolylineOptions & PolylineEventProps & PolylineCustomProps;

export const usePolyline = (props: PolylineProps) => {
    const { onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut, encodedPath, ...polylineOptions } = props;
    // This is here to avoid triggering the useEffect below when
    // the callbacks change (which happen if the user didn't memoize them)
    // eslint-disable-next-line no-unused-vars
    const callbacks = useRef<Record<string, (e: unknown) => void>>({});
    Object.assign(callbacks.current, {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onMouseOver,
        onMouseOut,
    });

    const geometryLibrary = useMapsLibrary('geometry');

    const polyline = useRef(new google.maps.Polyline()).current;
    // update PolylineOptions (note the dependencies aren't properly checked
    // here, we just assume that setOptions is smart enough to not waste a
    // lot of time updating values that didn't change)
    useMemo(() => {
        polyline.setOptions(polylineOptions);
    }, [polyline, polylineOptions]);

    const map = useContext(GoogleMapsContext)?.map;

    // update the path with the encodedPath
    useMemo(() => {
        if (!encodedPath || !geometryLibrary) {
            return;
        }
        polyline.setPath(encodedPath);
    }, [polyline, encodedPath, geometryLibrary]);

    // create polyline instance and add to the map once the map is available
    useEffect(() => {
        if (!map) {
            if (map === undefined) {
                console.error('<Polyline> has to be inside a Map component.');
            }

            return;
        }

        polyline.setMap(map);

        return () => {
            polyline.setMap(null);
        };
    }, [map, polyline]);

    // attach and re-attach event-handlers when any of the properties change
    useEffect(() => {
        if (!polyline) return;

        // Add event listeners
        const gme = google.maps.event;
        [
            ['click', 'onClick'],
            ['drag', 'onDrag'],
            ['dragstart', 'onDragStart'],
            ['dragend', 'onDragEnd'],
            ['mouseover', 'onMouseOver'],
            ['mouseout', 'onMouseOut'],
        ].forEach(([eventName, eventCallback]) => {
            gme.addListener(polyline, eventName, (e: google.maps.MapMouseEvent) => {
                const callback = callbacks.current[eventCallback];
                if (callback) callback(e);
            });
        });

        return () => {
            gme.clearInstanceListeners(polyline);
        };
    }, [polyline]);

    return polyline;
};

export const Polyline = forwardRef((props: PolylineProps, ref: PolylineRef) => {
    const polyline = usePolyline(props);

    useImperativeHandle(ref, () => {
        return polyline;
    }, [polyline]);

    return null;
});

Polyline.displayName = 'Polyline';
