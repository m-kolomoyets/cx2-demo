export const generateSnakePathByPolygon = (path: google.maps.LatLngLiteral[], step: number) => {
    if (!path.length) return [];
    const pointsInside = [];

    // Find min/max coordinates from polygon points
    const [startLat, endLat, startLng, endLng] = path.reduce(
        (acc, curr) => {
            const newStartLat = Math.min(acc[0], curr.lat);
            const newEndLat = Math.max(acc[1], curr.lat);
            const newStartLng = Math.min(acc[2], curr.lng);
            const newEndLng = Math.max(acc[3], curr.lng);

            return [newStartLat, newEndLat, newStartLng, newEndLng];
        },
        [path[0].lat, path[0].lat, path[0].lng, path[0].lng]
    );

    // Flag to track row direction
    let reverseRow = false;

    // Iterate over grid points
    for (let lat = startLat; lat <= endLat; lat += step) {
        const rowPoints = [];
        for (let lng = startLng; lng <= endLng; lng += step) {
            const point = {
                lat,
                lng,
            } as google.maps.LatLngLiteral;

            let isInside = false;

            for (let i = 0, j = path.length - 1; i < path.length; j = i++) {
                const { lng: xi, lat: yi } = path[i];
                const { lng: xj, lat: yj } = path[j];

                const isYiAbovePoint = yi > point.lat;
                const isYjAbovePoint = yj > point.lat;
                const hasVerticalIntersection = isYiAbovePoint !== isYjAbovePoint;

                const slope = (xj - xi) / (yj - yi);
                const xIntersection = slope * (point.lat - yi) + xi;
                const isPointLeftOfIntersection = point.lng < xIntersection;

                const isIntersecting = hasVerticalIntersection && isPointLeftOfIntersection;

                if (isIntersecting) {
                    isInside = !isInside;
                }
            }

            if (isInside) {
                rowPoints.push(point);
            }
        }
        if (reverseRow) {
            rowPoints.reverse();
        }

        pointsInside.push(...rowPoints);

        reverseRow = !reverseRow;
    }

    return pointsInside;
};
