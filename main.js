const canvas = document.getElementById('canvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');

const road = new Road(canvas.width / 2, canvas.width * 0.9)
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

animate();

function animate() {
    car.update(road.borders); // update car every frame

    canvas.height = window.innerHeight; //resizes vertically every frame

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.8);

    road.draw(ctx);
    car.draw(ctx); // draws the car

    ctx.restore();

    requestAnimationFrame(animate); // makes animation
}