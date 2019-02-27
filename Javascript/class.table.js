class Table {

    constructor(balls) {
        //let whiteBall = new Ball('ffffff', [60, 100], [0, 0]);
        //let eightBall = new Ball('000000', [30, 300], [0.45, -2.03]);
        
        let whiteBall = new Ball('ffffff', [650, 190], [-8, 0.04]);
        let eightBall = new Ball('000000', [30, 300], [0.45, -2.03]);
        let redBall = new Ball('ff0000', [100, 80], [2, 1]);
        
        this.balls = [];
        this.balls.push(whiteBall);
        this.balls.push(eightBall);
        this.balls.push(redBall);
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

    checkIfBallsCollide(currentBall, otherBall) {
        // velocity direction of other ball after collision relative to table velocity
        let vectorThroughBallCentres = arraySubstraction(currentBall.position, otherBall.position);
        if (norm(vectorThroughBallCentres, 2) <= 20) {
            let tableVelocity = otherBall.velocity;
            let currentBallRelativeVelocity = arraySubstraction(currentBall.velocity, tableVelocity);

            // velocity direction of current ball after collision relative to table velocity
            let normalToVectorThroughBallCentres = normalVector(vectorThroughBallCentres, currentBallRelativeVelocity);

            // normalize
            vectorThroughBallCentres = normalizedDirection(vectorThroughBallCentres);
            normalToVectorThroughBallCentres = normalizedDirection(normalToVectorThroughBallCentres);

            // absolute velocity of other ball after collision relative to table velocity
            // |v_2'| = |v_1| * cos(alpha)
            let absVelocityOtherBall = norm(currentBallRelativeVelocity, 2) * Math.cos(angleBetweenArrays(currentBallRelativeVelocity, vectorThroughBallCentres));

            // absolute velocity of current ball after collision relative to table velocity
            // |v_1'| = sqrt(|v_1|² - |v_2'|²)
            let absVelocityCurrentBall = Math.sqrt(Math.pow(norm(currentBallRelativeVelocity, 2), 2) - Math.pow(absVelocityOtherBall, 2))
            
            // v_i' = |v_i'| * normalizedDirection(v_i')
            otherBall.velocity = scalarMultiplication(absVelocityOtherBall, vectorThroughBallCentres);
            currentBall.velocity = scalarMultiplication(absVelocityCurrentBall, normalToVectorThroughBallCentres);

            // add table velocity to ball velocities
            otherBall.velocity = arrayAddition(otherBall.velocity, tableVelocity);
            currentBall.velocity = arrayAddition(currentBall.velocity, tableVelocity);
        }
    }
}