class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = {x: this.left, y: this.top};
        const topRight = {x: this.right, y: this.top};
        const bottomLeft = {x: this.left, y: this.bottom};
        const bottomRight = {x: this.right, y: this.bottom};
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ]
    }

    getLaneCenter(laneIndex) {
        const lineWidth = this.width / this.laneCount;
        return this.left + lineWidth / 2 + 
            Math.min(laneIndex, this.laneCount - 1) * lineWidth;
    }

    draw(mainCtx) {
        mainCtx.lineWidth = 5;
        mainCtx.strokeStyle = 'white';

        for (let i = 0; i <= this.laneCount - 1; i++) {
            const x = lerp(
                this.left, 
                this.right,
                i / this.laneCount
            );

            mainCtx.setLineDash([20, 20]);

            mainCtx.beginPath();
            mainCtx.moveTo(x, this.top);
            mainCtx.lineTo(x, this.bottom);
            mainCtx.stroke();
        }

        mainCtx.setLineDash([]);
        this.borders.forEach(border => {
            mainCtx.beginPath();
            mainCtx.moveTo(border[0].x, border[0].y);
            mainCtx.lineTo(border[1].x, border[1].y);
            mainCtx.stroke();
        })
    }
}