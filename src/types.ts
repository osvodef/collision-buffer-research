export interface Marker {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export interface CollisionDetector {
    insert(item: Marker): void;
    collides(item: Marker): boolean;
}
