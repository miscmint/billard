class Table {

    constructor(balls) {
        let whiteBall = new Ball('ffffff', [210, 340], [1.6, 0.35]);
        let eightBall = new Ball('000000', [0, 0], [5,1.5]);

        this.balls = [];
        this.balls.push(whiteBall);
        this.balls.push(eightBall);
    }


    checkIfBallInHole(ball, index, object) {
        // top left hole
        if (ball.position[0] < -12 && ball.position[1] < -12) {
            this.removeBall(ball, object, index);

        // top right hole
        } else if (ball.position[0] > 792 && ball.position[1] < -12) {
            this.removeBall(ball, object, index);
        
        // bottom left hole
        } else if (ball.position[0] < -12 && ball.position[1] > 392) {
            this.removeBall(ball, object, index);
        
        // bottom right hole                
        } else if (ball.position[0] > 792 && ball.position[1] > 392) {
            this.removeBall(ball, object, index);
        
        // top middle hole
        } else if (ball.position[0] > 390 - holeTolerance && ball.position[0] < 390 + holeTolerance && ball.position[1] < -12) {
            this.removeBall(ball, object, index);
        
        // bottom middle hole
        } else if (ball.position[0] > 390 - holeTolerance && ball.position[0] < 390 + holeTolerance && ball.position[1] > 392) {
            this.removeBall(ball, object, index);
        }
    }

    removeBall(ball, object, index) {
        object.splice(index, 1);
        let ballElement = document.getElementById(ball.color);
        ballElement.classList.add('in-hole');
    }
}