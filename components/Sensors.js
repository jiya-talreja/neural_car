class Sensors{
    constructor(car){
        this.raylength=150
        this.rayno=5// ray lines
        this.rayspread=Math.PI/2//spread over 180 deg
        this.car=car
        this.rays=[]
        this.reading=[]
    }
    update(roadborders,traffic){
        this.#rayarr()
        this.reading=[]
        for(let i=0;i<this.rays.length;i++){
            this.reading.push(this.#getreading(this.rays[i],roadborders,traffic))
        }
    }
    #getreading(rays,roadborder,traffic){
        const arrtouch=[]
        for(let i=0;i<traffic.length;i++){
            const tpoly=traffic[i].poly
            for(let j=0;j<tpoly.length;j++){
                const value=getIntersection(
                rays[0],//start
                rays[1],
                tpoly[j],
                tpoly[(j+1)%tpoly.length]
            )
            if(value){
                arrtouch.push(value)
            }   
            }
        }
        for(let i=0;i<roadborder.length;i++){
        const touch=getIntersection(
            rays[0],//start
            rays[1],
            roadborder[i][0],
            roadborder[i][1]
        )
        
        if(touch){
            arrtouch.push(touch)
        }    
        }
        if(arrtouch.length==0){
            return null
        }
        else{
            const offsets=arrtouch.map(e=>e.offset)
            const minoffset=Math.min(...offsets)
            return arrtouch.find(e=>e.offset==minoffset)
        }
    }
    #rayarr(){
        this.rays = [];
        for(let i=0;i<this.rayno;i++){
            const angle=lerp(
                this.rayspread/2,-this.rayspread/2,this.rayno==1?0.5:i/(this.rayno-1)
            )+this.car.angle
            const start={x:this.car.x,y:this.car.y}
            const end={
                x:this.car.x-Math.sin(angle)*this.raylength,
                y:this.car.y-Math.cos(angle)*this.raylength
            }
            this.rays.push([start,end])
        }
    }   
    draw(ctx){
        for(let i=0;i<this.rayno;i++){
            let end=this.rays[i][1]
            if(this.reading[i]){
                end=this.reading[i]
            }
            ctx.beginPath()
            ctx.lineWidth=2
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath()
            ctx.lineWidth=2
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        } 
    } 
}
function lerp(s,e,p){
    const x= s+(e-s)*p
    return x
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
export default Sensors