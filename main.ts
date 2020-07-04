namespace network {
    export namespace synchronize {
        export class clock {
            private clock: number;
            private delay: number;
            private nudge: number;
            private peroid: number;
            public received: () => void;
            public refresh: () => void;
            private send: () => void;
            constructor(peroid: number, nudge: number, send: () => void, getTime: () => number) {
                this.clock = 0;
                this.delay = 0;
                this.nudge = nudge;
                this.peroid = peroid;
                this.send = function() {
                    send();
                };
                this.refresh = function() {
                    this.clock = getTime() - this.delay;
                    if (this.clock > this.peroid) {
                        this.send();
                        this.delay = getTime();
                    };
                };
                this.received = function() {
                    this.delay -= this.nudge;
                };
            };
        };
    };
};