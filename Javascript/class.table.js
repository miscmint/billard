class Table {

    constructor(balls) {
        let whiteBall = new Ball('ffffff', [210, 340], [1.6, 0.35]);
        let eightBall = new Ball('000000', [0, 0], [5,1.5]);

        this.balls = [];
        this.balls.push(whiteBall);
        this.balls.push(eightBall);
    }
}