import { Marker, CollisionDetector } from './types';
import * as rbush from 'rbush';

export class RTreeImpl implements CollisionDetector {
    private tree: rbush.RBush<Marker>;

    constructor() {
        this.tree = rbush();
    }

    insert(marker: Marker): void {
        this.tree.insert(marker);
    }

    collides(candidate: Marker): boolean {
        return this.tree.collides(candidate);
    }
}
