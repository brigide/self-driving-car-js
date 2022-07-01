const mainCanvas = document.getElementById('mainCanvas');
mainCanvas.width = 200;

const nnCanvas = document.getElementById('nnCanvas');
nnCanvas.width = 300;

const mainCtx = mainCanvas.getContext('2d');
const nnCtx = nnCanvas.getContext('2d');

const road = new Road(mainCanvas.width / 2, mainCanvas.width * 0.9)
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "NN");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
]

animate();

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders);
    }
    car.update(road.borders, traffic); // update car every frame

    mainCanvas.height = window.innerHeight; //resizes vertically every frame
    nnCanvas.height = window.innerHeight;

    mainCtx.save();
    mainCtx.translate(0, -car.y + mainCanvas.height * 0.8);

    road.draw(mainCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(mainCtx, 'red');
    }
    car.draw(mainCtx, 'blue'); // draws the car

    mainCtx.restore();

    nnCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(nnCtx, car.brain);
    requestAnimationFrame(animate); // makes animation
}