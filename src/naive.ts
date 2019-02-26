import { Marker, CollisionDetector } from './types';

export class NaiveImpl implements CollisionDetector {
    private markers: Marker[];

    constructor() {
        this.markers = [];
    }

    insert(marker: Marker): void {
        this.markers.push(marker);
    }

    collides(candidate: Marker): boolean {
        for (const marker of this.markers) {
            if (
                candidate.minX <= marker.maxX &&
                candidate.minY <= marker.maxY &&
                candidate.maxX >= marker.minX &&
                candidate.maxY >= marker.minY
            ) {
                return true;
            }
        }

        return false;
    }
}
