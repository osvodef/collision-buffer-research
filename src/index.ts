import { Marker, CollisionDetector } from './types';
import { ByteBufferImpl } from './byteBuffer';
import { NaiveImpl } from './naive';
import { RTreeImpl } from './rtree';
import { BitBufferImpl } from './bitBuffer';

const screenWidth = 1920;
const screenHeight = 1080;
const markerWidth = 30;
const markerHeight = 50;
const markerCount = 100000;

const markers: Marker[] = [];
for (let i = 0; i < markerCount; i++) {
    const x = Math.floor(Math.random() * (screenWidth - markerWidth));
    const y = Math.floor(Math.random() * (screenHeight - markerHeight));

    markers.push({
        minX: x,
        minY: y,
        maxX: x + markerWidth,
        maxY: y + markerHeight,
    });
}

function generalize(impl: CollisionDetector, markers: Marker[]) {
    for (const marker of markers) {
        if (!impl.collides(marker)) {
            impl.insert(marker);
        }
    }
}

const naiveImpl = new NaiveImpl();
const rtreeImpl = new RTreeImpl();
const byteBufferImpl = new ByteBufferImpl(screenWidth, screenHeight);
const bitBufferImpl = new BitBufferImpl(screenWidth, screenHeight);

console.time('Naive implementation');
generalize(naiveImpl, markers);
console.timeEnd('Naive implementation');

console.time('R-tree implementation');
generalize(rtreeImpl, markers);
console.timeEnd('R-tree implementation');

console.time('Byte buffer implementation');
generalize(byteBufferImpl, markers);
console.timeEnd('Byte buffer implementation');

console.time('Bit buffer implementation');
generalize(bitBufferImpl, markers);
console.timeEnd('Bit buffer implementation');
