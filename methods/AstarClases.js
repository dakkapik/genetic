class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.f = Infinity;
        this.g = Infinity;
        // this.h = 0;
        this.obstacle = false;
        this.cameFrom = undefined;
        this.overlap = false;
        // OVERLAP NOT WORKING AS INTENDED
        this.name = undefined;
        // this.cameFromDirection = undefined;
        // add clean?
    }
}

class MinHeap {
    constructor () {
        this.heap = [null]
    }
    getMin () {
        return this.heap[1]
    }

    has( node ){
        for(let i = 1; i < this.heap.length; i++){
            if(node.x === this.heap[i].x && node.y === this.heap[i].y){
                return true
            }
        }
        return false
    }

    insert( node ){
        this.heap.push(node)
        if(this.heap.length > 1){
            let current = this.heap.length - 1

            while(current > 1 && this.heap[Math.floor(current/2)].f > this.heap[current].f){
                [this.heap[Math.floor(current/2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current/2)]]
                current = Math.floor(current/2)
            }
        }
    }

    removeSmallest() {
        
        let smallest = this.heap[1]

        if (this.heap.length > 2) {
            this.heap[1] = this.heap[this.heap.length-1]
            this.heap.splice(this.heap.length - 1)
    
            if (this.heap.length === 3) {
                if (this.heap[1] > this.heap[2]) {
                    [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]]
                }
                return smallest
            }
    
            let current = 1
            let leftChildIndex = current * 2
            let rightChildIndex = current * 2 + 1
    
            while (this.heap[leftChildIndex] &&
                    this.heap[rightChildIndex] &&
                    (this.heap[current].f > this.heap[leftChildIndex].f ||
                        this.heap[current].f > this.heap[rightChildIndex].f)) {
                if (this.heap[leftChildIndex].f < this.heap[rightChildIndex].f) {
                    [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]]
                    current = leftChildIndex
                } else {
                    [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]]
                    current = rightChildIndex
                }
    
                leftChildIndex = current * 2
                rightChildIndex = current * 2 + 1
            }
            if(this.heap[leftChildIndex]){
                if (this.heap[rightChildIndex] === undefined && this.heap[leftChildIndex].f < this.heap[current].f) {
                    [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]]
                }
            }
        }
        
        else if (this.heap.length === 2) {
            this.heap.splice(1, 1)
        } else {
            return null
        }
    
        return smallest
    }
     
}

module.exports.MinHeap = MinHeap;
module.exports.Point = Point;