class Road{
    constructor(x,width,laneno=3){
        this.x=x
        this.width=width
        this.laneno=laneno
        this.left=this.x-this.width/2
        this.right=this.x+this.width/2
        const infinity=1000000
        this.top=-infinity
        this.bottom=+infinity
        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }
    //which lane
    whichlane(laneindex){
        const lanewidth=this.width/this.laneno
        return this.left+lanewidth/2+Math.min(laneindex,this.laneno-1)*lanewidth
    }
    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";
        //for inner lane
        for(let i=1;i<=this.laneno-1;i++){
            const x=lerp(
                this.left,this.right,i/this.laneno
            )//for x co of lane
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}
function lerp(a,b,p){
    const x=a+(b-a)*p
    return x
}
export default Road