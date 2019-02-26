import { Marker, CollisionDetector } from './types';

export class ByteBufferImpl implements CollisionDetector {
    private buffer: Uint8Array;
    private height: number;

    constructor(width: number, height: number) {
        this.buffer = new Uint8Array(width * height);
        this.height = height;
    }

    insert(marker: Marker): void {
        const { minX, minY, maxX, maxY } = marker;

        for (let i = minX; i < maxX; i++) {
            for (let j = minY; j < maxY; j++) {
                this.buffer[i * this.height + j] = 1;
            }
        }
    }

    collides(candidate: Marker): boolean {
        const { minX, minY, maxX, maxY } = candidate;

        for (let i = minX; i < maxX; i++) {
            for (let j = minY; j < maxY; j++) {
                if (this.buffer[i * this.height + j]) {
                    return true;
                }
            }
        }

        return false;
    }
}
