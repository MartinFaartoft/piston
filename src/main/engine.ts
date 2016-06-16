namespace ps {
    export class Engine {
        constructor(public dimensions: number[]) {}

        sum(a: number, b: number) {
            return a + b;
        }

        subtract(a: number, b: number): number {
            return 1;
        }
    }
}