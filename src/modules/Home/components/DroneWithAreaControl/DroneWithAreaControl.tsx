import { useReducer, useRef } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useDrawingManager } from '../../../../hooks/useDrawingManager';
import reducer, { useDrawingManagerEvents, useOverlaySnapshots } from './constants';
import { DrawingActionKind } from './types';
import s from './DroneWithAreaControl.module.css';
import '@vis.gl/react-google-maps/examples.css';
import Button from '@/components/Button';
import { Component as CheckCircleFilledIcon } from '@/icons/check-circle-filled.svg?svgUse';
import { Component as PathIcon } from '@/icons/path.svg?svgUse';
import { Component as RefreshIcon } from '@/icons/refresh.svg?svgUse';
import { useDroneWithAreaStore } from '../../store/droneWithArea';

export const DroneWithAreaControl = () => {
    const { isDrawing, path, setPath, setIsDrawing, setIsOverlayCompleted } = useDroneWithAreaStore();
    const { drawingManager, resetDrawingToolsMode, setDrawingMode } = useDrawingManager();

    const map = useMap();

    const drawing = useMapsLibrary('drawing');

    const [state, dispatch] = useReducer(reducer, {
        past: [],
        now: [],
        future: [],
    });

    const isRedoEnabled = state.future.length > 0;
    const isUndoEnabled = state.past.length > 0;

    const overlaysShouldUpdateRef = useRef<boolean>(false);

    useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef, dispatch);
    useOverlaySnapshots(map, state, overlaysShouldUpdateRef);

    const reset = () => {
        setIsDrawing(false);
        dispatch({ type: DrawingActionKind.RESET });
        resetDrawingToolsMode();
        setIsOverlayCompleted(false);
        drawingManager?.setMap(null);
    };

    if (!drawing) {
        return null;
    }

    return (
        <div className={s['drawing-history']}>
            <h2 className={s.title}>Drawing Tools</h2>
            <Button
                onClick={() => {
                    reset();
                    setPath([]);
                }}
                disabled={!path.length}
            >
                <RefreshIcon className={s.icon} />
                Reset
            </Button>

            <Button
                onClick={() => {
                    setIsDrawing(true);
                    setDrawingMode(drawing.OverlayType.POLYLINE);
                }}
                disabled={isDrawing}
            >
                <PathIcon className={s.icon} />
                Draw
            </Button>
            <Button
                onClick={() => {
                    reset();
                    setIsOverlayCompleted(true);
                }}
                disabled={!path.length || isDrawing}
            >
                <CheckCircleFilledIcon className={s.icon} />
                Confirm
            </Button>
            <div>
                <Button
                    onClick={() => {
                        return dispatch({ type: DrawingActionKind.UNDO });
                    }}
                    disabled={!isUndoEnabled}
                >
                    <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path
                            d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"
                            fill="currentColor"
                        />
                    </svg>
                    Undo
                </Button>
                <Button
                    onClick={() => {
                        return dispatch({ type: DrawingActionKind.REDO });
                    }}
                    disabled={!isRedoEnabled}
                >
                    <svg
                        className={s.icon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                    >
                        <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z" />
                    </svg>
                    Redo
                </Button>
            </div>
        </div>
    );
};
