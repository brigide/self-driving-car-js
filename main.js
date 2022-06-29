const canvas = document.getElementById('canvas');
canvas.width = 200;

const ctx = canvas.getContext('2d');

const car = new Car(100, 100, 30, 50);

animate();

function animate() {
    car.update(); // update car every frame

    canvas.height = window.innerHeight; //resizes vertically every frame

    car.draw(ctx); // draws the car

    requestAnimationFrame(animate); // makes animation
}