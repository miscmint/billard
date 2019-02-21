window.onload = function() {

    let table = new Table();

    setInterval(function() {

        table.balls.forEach(function(ball, index, object) {
            // move all balls
            ball.move();


            // macht der tisch
            // top left hole
            if (ball.position[0] < -12 && ball.position[1] < -12) {
                object.splice(index, 1);
                let ballElement = document.getElementById(ball.color);
                //ballElement.style.backgroundColor = '#ff0000';
                ballElement.classList.add('in-hole');
                //document.getElementById(ball.color).style.color = "red";

            // top right hole
            } else if (ball.position[0] > 792 && ball.position[1] < -12) {
                object.splice(index, 1);
                let ballElement = document.getElementById(ball.color);
                ballElement.classList.add('in-hole');
            
            // bottom left hole
            } else if (ball.position[0] < -12 && ball.position[1] > 392) {
                object.splice(index, 1);
                let ballElement = document.getElementById(ball.color);
                ballElement.classList.add('in-hole');
            
            // bottom right hole                
            } else if (ball.position[0] > 792 && ball.position[1] > 392) {
                object.splice(index, 1);
                let ballElement = document.getElementById(ball.color);
                ballElement.classList.add('in-hole');
            
            // top middle hole
            } else if (ball.position[0] > 390 - holeTolerance && ball.position[0] < 390 + holeTolerance && ball.position[1] < -12) {
                object.splice(index, 1);
                let ballElement = document.getElementById(ball.color);
                ballElement.classList.add('in-hole');
            
            // bottom middle hole
            } else if (ball.position[0] > 390 - holeTolerance && ball.position[0] < 390 + holeTolerance && ball.position[1] > 392) {
                object.splice(index, 1);
                let ballElement = document.getElementById(ball.color);
                ballElement.classList.add('in-hole');
            }


        });


    }, interval);
}