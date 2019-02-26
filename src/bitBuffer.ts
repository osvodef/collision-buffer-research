import { CollisionDetector, Marker } from './types';

export class BitBufferImpl implements CollisionDetector {
    private width: number;
    private height: number;
    private buffer: Uint8Array;

    constructor(width: number, height: number) {
        // Width must be a multiple of 8
        this.width = Math.ceil(width / 8) * 8;
        this.height = height;

        // TODO: check size calculation
        this.buffer = new Uint8Array(this.width * this.height / 8);
    }

    insert(marker: Marker): void {
        const { minX, minY, maxX, maxY } = marker;
        const { width, buffer } = this;

        for (let j = minY; j < maxY; j++) {
            const start = j * width + minX >> 3;
            const end = j * width + maxX >> 3;

            // Если начальный байт равен конечному, то нужно закрасить биты только в нем
            if (start === end) {
                buffer[start] = buffer[start] | (255 >> (minX & 7) & 255 << (8 - (maxX & 7)));
            } else {
                // Закрашиваем биты в начальном байте
                buffer[start] = buffer[start] | (255 >> (minX & 7));
                // Закрашиваем все промежуточные байты между начальным и конечным
                for (let i = start + 1; i < end; i++) {
                    buffer[i] = 255;
                }
                // Закрашиваем биты в коненом байте
                buffer[end] = buffer[end] | (255 << (8 - (maxX & 7)));
            }
        }
    }

    collides(marker: Marker): boolean {
        const { minX, minY, maxX, maxY } = marker;
        const { width, buffer } = this;

        for (let j = minY; j < maxY; j++) {
            const start = j * width + minX >> 3;
            const end = j * width + maxX >> 3;
            let sum = 0;

            // Если начальный байт равен конечному, то нужно проверить только его
            if (start === end) {
                sum = buffer[start] & (255 >> (minX & 7) & 255 << (8 - (maxX & 7)));
            } else {
                // Проверяем начальный байт
                sum = buffer[start] & (255 >> (minX & 7));
                // Перебираем все промежуточные между начальным и конечным
                for (let i = start + 1; i < end; i++) {
                    sum = buffer[i] | sum;
                }
                // Проверяем конечный байт
                sum = buffer[end] & (255 << (8 - (maxX & 7))) | sum;
            }

            if (sum !== 0) {
                return true;
            }
        }

        return false;
    }
}
