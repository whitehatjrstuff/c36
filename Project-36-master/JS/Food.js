class Food {
    constructor(){
    this.foodStock=0;
    this.image=loadImage('images/Milk.png');
    }
  
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
  
   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }
  
    getFoodStock(){
      return this.foodStock;
    }
  washRoom(){
   background(washRoom,550,500)
    
  }
 bedRoom(){
    background(bedRoom,1000,500)
  }
 garden()
  { 
     background(garden,550,500)
  }


    display(){
      var x=80,y=100;
      
      imageMode(CENTER);
   
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
  }