namespace ps {
    export interface Stopwatch {
        start(): void
        stop(): number
    }

    export class DateNowStopwatch implements Stopwatch {
        private startTime: number;

        constructor() {
            this.start();
        }
        
        start(): void {
            this.startTime = Date.now();
        }

        stop(): number {
            return (Date.now() - this.startTime) / 1000.0;
        }
    }
}