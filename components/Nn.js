class Nn{
    constructor(neuroncount){
        this.levels=[]
        //input all the neurons in each layer [5,6,4] no. of nuons in each layer
        for(let i=0;i<neuroncount.length-1;i++){//2 pairs we want
            this.levels.push(
                new Level(neuroncount[i],neuroncount[i+1])
            )//levels=[[1,2],[2,3]]pairing the layers
        }
    }
    static feedforward(inputgiven,network){
        //input is the neuron value in each input level
        let outputs=Level.feedforward(
            inputgiven,network.levels[0]
        )
        for(let i=1;i<network.levels.length;i++){
            outputs=Level.feedforward(
                outputs,network.levels[i]
            )
        }
        return outputs
    }
    static mutate(network,amount=1){
        network.levels.forEach(level => {
            for(let i=0;i<level.baises.length;i++){
                level.baises[i]=lerp(
                    level.baises[i],
                    Math.random()*2-1,
                    amount
                )
            }
            for(let i=0;i<level.weights.length;i++){
                for(let j=0;j<level.weights[i].level;j++){
                    level.weights[i][j]=lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }    
            }
        });
    }
}
class Level{
    constructor(inputcount,outputcount){//no. of inputs and no. of outputs eg 4
        this.inputs=new Array(inputcount)
        this.outputs=new Array(outputcount)
        this.baises=new Array(outputcount)
        this.weights=[]
        for(let i=0;i<inputcount;i++){
            this.weights[i]=new Array(outputcount)//making it 2d
        }
        Level.#randomize(this)//for static method
    }
    static #randomize(level){
        //to calaulate weights n basises
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j]=Math.random()*2-1//from 0 ro 2)-1
            }
        }
        for(let i=0;i<level.baises.length;i++){
            level.baises[i]=Math.random()*2-1
        }
    }
    static feedforward(inputgiven,level){
        //to calcalte the output for each given input level
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=inputgiven[i]//transfering the given input one by ne to the inputs arr
        }
        for(let i=0;i<level.outputs.length;i++){
            let sum=0
            for(let j=0;j<level.inputs.length;j++){
                sum+=level.inputs[j]*level.weights[j][i]
            }
            if(sum>level.baises[i]){
                level.outputs[i]=1
            }else{
                level.outputs[i]=0
            }
        }
        return level.outputs
    }
}
function lerp(s,e,p){
    const x= s+(e-s)*p
    return x
}
export default Nn