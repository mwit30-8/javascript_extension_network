// tests go here; this will not be compiled when this package is used as an extension.
const peroid = 500;
const nudge = 10;

let t = 0;
let value: boolean[][] = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];
let internalClocking: network.synchronize.clock[][] = [
    [new network.synchronize.clock(peroid, nudge, function() {
        value[0][0] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[0][1] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[0][2] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[0][3] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[0][4] = true;
    }, function() {
        return t;
    })],
    [new network.synchronize.clock(peroid, nudge, function() {
        value[1][0] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[1][1] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[1][2] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[1][3] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[1][4] = true;
    }, function() {
        return t;
    })],
    [new network.synchronize.clock(peroid, nudge, function() {
        value[2][0] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[2][1] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[2][2] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[2][3] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[2][4] = true;
    }, function() {
        return t;
    })],
    [new network.synchronize.clock(peroid, nudge, function() {
        value[3][0] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[3][1] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[3][2] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[3][3] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[3][4] = true;
    }, function() {
        return t;
    })],
    [new network.synchronize.clock(peroid, nudge, function() {
        value[4][0] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[4][1] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[4][2] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[4][3] = true;
    }, function() {
        return t;
    }), new network.synchronize.clock(peroid, nudge, function() {
        value[4][4] = true;
    }, function() {
        return t;
    })]
];
let pointer = [0, 0];
input.onButtonPressed(Button.A, function() {
    pointer[0] = (pointer[0] + 1) % 5;
    led.plot(pointer[0], pointer[1]);
});
input.onButtonPressed(Button.B, function() {
    pointer[1] = (pointer[1] + 1) % 5;
    led.plot(pointer[0], pointer[1]);
});
input.onButtonPressed(Button.AB, function() {
    internalClocking[pointer[0]][pointer[1]].received();
});
basic.forever(function() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 5; k++) {
                for (let l = 0; l < 5; l++) {
                    if (value[k][l] && Math.pow(Math.pow((k - i), 2) + Math.pow((l - j), 2), 0.5) < 2) {
                        internalClocking[i][j].received();
                    };
                };
            };
        };
    };
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            internalClocking[i][j].refresh();
            if (value[i][j]) {
                led.plot(i, j);
            } else {
                led.unplot(i, j);
            };
        };
    };
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            value[i][j] = false;
        };
    };
    t = control.millis();
});