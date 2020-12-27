class Wall {
    constructor() {
        var options = {
            isStatic: true,
            density:1000
        }

        this.bodytop = Bodies.rectangle(windowWidth/2, 0-10, windowWidth, 20, options);
        this.bodybottom = Bodies.rectangle(windowWidth/2, windowHeight+10, windowWidth, 20, options);
        this.bodyleft = Bodies.rectangle(windowHeight/2, 0-10, 20, windowHeight, options);
        this.bodyright = Bodies.rectangle(windowHeight/2, windowWidth+10, 20, windowHeight, options);

        //World.add(world, [this.bodytop, this.bodybottom, this.bodyleft, this.bodyright]);
        World.add(world, this.bodytop);
        World.add(world, this.bodybottom);

        World.add(world,this.bodyleft);
        World.add(world,this.bodyright);
      }
}