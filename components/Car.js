
import Controlo from "./Contolo";
import Nn from "./Nn";
import Sensors from "./Sensors"
class Car{
    constructor(x,y,width,height,controltype,maxspeed=3){
        this.x=x
        this.y=y
        this.width=width
        this.height=height
        this.controltype=controltype
        this.control=new Controlo(this.controltype)
        this.speed=0
        this.maxspeed=maxspeed
        this.accn=0.1
        this.damage=false
        this.friction=0.05
        this.angle=0
        this.braintype=controltype=="nn"
        if(controltype!="dummy"){
            this.sensors=new Sensors(this)
            this.brain=new Nn([this.sensors.rayno,6,4])//neuroncount
        }
    }
    update(roadborders,traffic){
        if(!this.damage){
            this.#move()
            this.poly=this.#polygon()
            this.damage=this.#damaged(roadborders,traffic)
        }
        if(this.sensors){
            this.sensors.update(roadborders,traffic)
            const offsets=this.sensors.reading.map(
                e=>e==null?0:1-e.offset
            )
            const output=Nn.feedforward(offsets,this.brain)
            if(this.braintype){
                this.control.forward=output[0]
                this.control.left=output[1]
                this.control.right=output[2]
                this.control.reverse=output[3]
            }
        }
    }
    #move(){
        if(this.control.forward){
            this.speed+=this.accn
        }
        if(this.control.reverse){
            this.speed-=this.accn
        }
        if(this.speed>this.maxspeed){
            this.speed=this.maxspeed
        }
        if(this.speed<-this.maxspeed/2){
            this.speed=-this.maxspeed/2
        }
        if(this.speed>0){
            this.speed-=this.friction
        }
        if(this.speed<0){
            this.speed+=this.friction
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0
        }
        if(this.speed!=0){
            const flip=this.speed>0?1:-1
            if(this.control.left){
                this.angle+=0.03*flip
            }
            if(this.control.right){
                this.angle-=0.03*flip
            }
        }
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }
    #damaged(roadborders,traffic){
        for(let i=0;i<roadborders.length;i++){
            if(polyintersection(this.poly,roadborders[i])){
                return true
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polyintersection(this.poly,traffic[i].poly)){
                return true
            }
        }
        return false
    }
    #polygon(){
        const polyarr=[]
        const rad=Math.hypot(this.width,this.height)/2
        const alpha=Math.atan2(this.width,this.height)
        polyarr.push({x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad})
        polyarr.push({x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad})
        polyarr.push({x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad})
        polyarr.push({x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad})
        return polyarr            
    }
    draw(ctx,color){
        if(this.damage){
            ctx.fillStyle="gray"
        }
        else{
            ctx.fillStyle=color
        }
        ctx.beginPath()
        ctx.moveTo(this.poly[0].x,this.poly[0].y)
        for(let i=1;i<this.poly.length;i++){
            ctx.lineTo(this.poly[i].x,this.poly[i].y)
        }
        ctx.fill()
        if(this.sensors){
            this.sensors.draw(ctx)
        }
    }
}
function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}
function lerp(s,e,p){
    const x= s+(e-s)*p
    return x
}
function polyintersection(p1,p2){
    for(let i=0;i<p1.length;i++){
        for(let j=0;j<p2.length;j++){
            const t=getIntersection(
                p1[i],
                p1[(i+1)%p1.length],
                p2[j],
                p2[(j+1)%p2.length]
            )
            if(t){
                return true
            }
        }
    }
    return false
}
export default Car