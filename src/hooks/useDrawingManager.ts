import { useCallback, useEffect, useState } from 'react';
import { useRerender, useUpdateEffect } from '@react-hookz/web';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useDroneWithAreaStore } from '@/modules/Home/store/droneWithArea';

export const useDrawingManager = () => {
    const { isDrawing, setPath, setIsDrawing, setIsOverlayCompleted } = useDroneWithAreaStore();

    const map = useMap();
    const drawingLibrary = useMapsLibrary('drawing');

    const rerender = useRerender();

    const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(null);

    const resetDrawingToolsMode = useCallback(() => {
        drawingManager?.setDrawingMode(null);

        rerender();
    }, [drawingManager, rerender]);

    const setDrawingMode = useCallback(
        (mode: google.maps.drawing.OverlayType) => {
            drawingManager?.setDrawingMode(mode);
            rerender();
        },
        [drawingManager, rerender]
    );

    useUpdateEffect(() => {
        if (!isDrawing) {
            if (drawingManager) {
                drawingManager.setMap(null);
            }
            setDrawingManager(null);
            return;
        }
    }, [isDrawing]);

    useEffect(() => {
        if (!drawingLibrary || !map || !isDrawing) {
            return;
        }

        const manager = new drawingLibrary.DrawingManager({
            map,
            drawingMode: drawingLibrary.OverlayType.POLYGON,
            drawingControlOptions: {
                drawingModes: [drawingLibrary.OverlayType.POLYGON],
            },
            polygonOptions: {
                editable: false,
                draggable: true,
                fillColor: '#000000',
                fillOpacity: 0.2,
                strokeColor: '#000000',
                strokeWeight: 2,
                strokeOpacity: 1,
            },
        });

        manager.addListener('polygoncomplete', (polygon: google.maps.Polygon) => {
            const getPolygonPath = () => {
                return polygon
                    .getPath()
                    .getArray()
                    .map((item) => {
                        return {
                            lat: item.lat(),
                            lng: item.lng(),
                        };
                    });
            };

            setIsDrawing(false);

            polygon.addListener('dragend', () => {
                setPath(getPolygonPath());
            });

            setPath(getPolygonPath());

            manager.setDrawingMode(null);
        });

        setDrawingManager(manager);

        return () => {
            manager.setMap(null);
        };
    }, [drawingLibrary, isDrawing, map, setIsDrawing, setIsOverlayCompleted, setPath]);

    return { resetDrawingToolsMode, drawingManager, setDrawingMode };
};
