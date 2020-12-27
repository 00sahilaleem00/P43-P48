class Box {
    constructor(x, y, width, height) {
        var options = {
            restitution:0.3,
            friction:10,
            density:0.5,
            isStatic: false
        }

        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.colour = "green";
        //this.image = loadImage('images/blade_walking.png');

        World.add(world, this.body);
    }
    display(){
        rectMode(CENTER);
        push();
        fill(this.colour);
        /*image*/rect(/*this.image,*/this.body.position.x, this.body.position.y, this.width, this.height);
        pop();
    }
}