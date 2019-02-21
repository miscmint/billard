class Ball {
    /**
     * @param {string} color 
     * @param {array} position 
     * @param {array} velocity 
     */
    constructor(color, position, velocity) {
        this.color = color;
        this.position = position;
        this.velocity = velocity;

        this.draw();
    }

    draw() {
        document.getElementById("field").innerHTML += '<div class="ball" id="' + this.color + '" '
        + 'style="background-color: #' + this.color + '; top: ' + this.position[1] + 'px; left: ' + this.position[0] + 'px;"'
        + '></div>';
    }

    redraw() {
        let currentElement = document.getElementById(this.color);
        currentElement.style.top = this.position[1] + 'px';
        currentElement.style.left = this.position[0] + 'px';
    }

    move() {
        this.velocityAmount = norm(this.velocity, 2);
        if (this.velocityAmount > 0) {
            this.changePosition();
            this.slowDownFrictionTable();
        }
    }

    changePosition() {
        this.normalizedDirection = normalizedDirection(this.velocity, this.velocityAmount);
        this.position = arrayAddition(this.position, scalarMultiplication(this.velocityAmount, this.normalizedDirection));
        //this.checkIfInHole(); <-- macht der Tisch
        this.checkCushion();
        //this.checkCollision(); <-- macht der Tisch
        this.redraw();
    }

    slowDownFrictionTable() {
        this.degreaseVelocity(frictionTable);
    }

    degreaseVelocity(slowDownCoeff) {
        this.velocityAmount = Math.max(0, this.velocityAmount - slowDownCoeff);
        this.velocity = scalarMultiplication(this.velocityAmount, this.normalizedDirection);
    }

    checkCushion() {
        // if touching the left cushion
        if (this.position[0] < 0 && this.velocity[0] < 0) {

            // if in top left hole
            if (this.position[1] < holeTolerance) {
                this.fallsIntoHole([-12, -12]);
            
            // if in bottom left hole
            } else if (this.position[1] > 780 - holeTolerance) {
                this.fallsIntoHole([-12, 392]);
            
            } else {
                this.reboundFromCushion(0);
            }


        // if touching the right cushion
        } else if (this.position[0] > 780 && this.velocity[0] > 0) {

            // if in top right hole
            if (this.position[1] < holeTolerance) {
                this.fallsIntoHole([792, -12]);

            // if in bottom right hole
            } else if (this.position[1] > 780 - holeTolerance) {
                this.fallsIntoHole([792, 392]);
                
            } else {
                this.reboundFromCushion(0);
            }

        // if touching the top cushion
        } else if (this.position[1] < 0 && this.velocity[1] < 0) {

            // if in top left hole
            if (this.position[0] < holeTolerance) {
                this.fallsIntoHole([-12, -12]);

            // if in top right hole
            } else if (this.position[0] > 780 - holeTolerance) {
                this.fallsIntoHole([792, -12]);

            // if in top middle hole
            } else if (this.position[0] > 390 - 2 * holeTolerance && this.position[0] < 390 + 2 * holeTolerance) {
                this.fallsIntoHole([390, -12]);
                
            } else {
                this.reboundFromCushion(1);
            }

        // if touching the bottom cushion
        } else if (this.position[1] > 380 && this.velocity[1] > 0) {

            // if in bottom left hole
            if (this.position[0] < holeTolerance) {
                this.fallsIntoHole([-12, 392]);

            // if in bottom right hole
            } else if (this.position[0] > 780 - holeTolerance) {
                this.fallsIntoHole([792, 392]);

            // if in bottom middle hole
            } else if (this.position[0] > 390 - 2 * holeTolerance && this.position[0] < 390 + 2 * holeTolerance) {
                this.fallsIntoHole([390, 392]);
                
            } else {
                this.reboundFromCushion(1);
            }
        }
    }

    fallsIntoHole(hole) {
        this.normalizedDirection = normalizedDirection(arraySubstraction(hole, this.position));
        this.velocityAmount = Math.max(minHoleVelocity, this.velocityAmount);
        this.velocity = scalarMultiplication(this.velocityAmount, this.normalizedDirection);
    }

    reboundFromCushion(int) {
        this.velocity[int] = -this.velocity[int];
        this.degreaseVelocity(frictionCushion);
    }
/* macht der Tisch
    checkCollision() {
        if (norm(this.velocity, 1) > 0) {

            let style; let top; let left;
            let balls = document.getElementsByClassName('ball');
            for (let ball of balls) {
                // if not the current ball
                if (ball.getAttribute('id') !== this.color) {
                    style = window.getComputedStyle(ball),
                    top = style.getPropertyValue('top');
                }
            }
        }
    }*/
}