window.onload = function() {

    let table = new Table();

    setInterval(function() {

        table.balls.forEach(function(ball, index, object) {
            // move all balls
            ball.move();

            table.checkIfBallInHole(ball, index, object);

            for (let i = index + 1; i < table.balls.length; i++) {
                table.checkIfBallsCollide(ball, table.balls[i]);
            }

        });


    }, interval);
}