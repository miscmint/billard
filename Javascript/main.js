window.onload = function() {

    let table = new Table();

    setInterval(function() {

        table.balls.forEach(function(ball, index, object) {
            // move all balls
            ball.move();

            table.checkIfBallInHole(ball, index, object);

        });


    }, interval);
}