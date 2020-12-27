class Platform {
    constructor(x, y, width, height) {
        var options = {
            restitution:0.3,
            friction:10,
            density:10,
            isStatic: true
        }

        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;

        World.add(world, this.body);
    }

    display(){
        rectMode(CENTER);
        push();
        fill("blue");
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
        pop();
    }
}