const SPEED = .01;

export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem;
        this.reset();
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }
    rect(){
        return this.paddleElem.getBoundingClientRect();
    }
    set position(value){
        this.paddleElem.style.setProperty("--position", value);
    }

    update(delta, ballHeight){
        this.position += SPEED*delta*( ballHeight-this.position);
    }
    reset(){
        this.position = 50;
    }
}