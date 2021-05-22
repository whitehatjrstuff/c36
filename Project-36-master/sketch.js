var database ;
var foodS=20,foodStock;
var dog,dog1,dog2
var position
//var form
var feed,add,last 
var foodobject
var Feedtime
var Lastfeed
var name = "Dog"
var gameState;
var bedRoom,garden,washRoom,back
function preload()
{
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  MilkImage=loadImage('images/Milk.png');
  bedRoom = loadImage("images/Bed Room.png")
  garden = loadImage("images/Garden.png")
  washRoom = loadImage("images/Wash Room.png")
  empty = loadImage("images/Empty.png")
   //sadDog = loadImage("images/")
	//load images here
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
  foodobject=new Food()

  gameStateref = database.ref('gameState')
  gameStateref.on("value",(data)=>{
    gameState = data.val();
  }); back = createSprite(550,250,10,10)

  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2

  foodStock = database.ref('Food')
  foodStock.on("value",(data)=>{
    foodS = data.val();
   
   });

  Lastfeed = database.ref('FeedTime')
  Lastfeed.on("value",(time)=>{Feedtime=time.val()})

  var dogo = database.ref('Food');
  dogo.on("value",(data)=>{
    position = data.val();
    foodobject.updateFoodStock(position)
  }, showError);
  feed = createButton("FEED "+name)
  feed.position(700,115)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(600,115)
  add.mousePressed(AddFood)
 
}


function writeStocks(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

var pasttime,delay = 15,state = "idle";
function draw() {  

  background(46,139,87);
 
  drawSprites();
   
  fill(255,255,254);
  textSize(15);
  //console.log(Feedtime)
  text("Last Feed: "+pasttime, 600, 115)
 drawSprites();
 //foodobject.washRoom();
 setToHour()
 
    if(gameState!= "Hungry"){
      feed.hide()
      add.hide()
      dog.addImage(empty)
    }else{
      feed.show();
      add.show();
      dog.addImage(dogimg1)
    }


 var currentTime = hour()
    if(currentTime ==(Feedtime+1)){
      update("Playing");
      foodobject.garden();
    }
    else if(currentTime ==(Feedtime+2)){
      update("Sleeping");
      foodobject.bedRoom();
    }
    else if(currentTime >(Feedtime+2)&& currentTime <=(Feedtime +4)){
      update("Bathing");
      foodobject.washRoom();
    }
    else{
      update("Hungry")
      foodobject.display()
    }
}

function setToHour(){ 
  pasttime = "Undifined"
  if(Feedtime){
    if(Feedtime >=12)
    pasttime = Feedtime- 12 +"PM"
   }
   else {
     pasttime = Feedtime +"AM"
   }
}

function update(state){
  database.ref('/').update({
    gameState :state
  })
}

function showError(){
  console.log("Error in writing to the database");
}
function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
var pt;
function FeedDog(){

  if(foodS>0){
    pt = frameCount;
    
    dog.addImage(dogimg2) 
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
    database.ref('/').update({
      Food:foodobject.getFoodStock(),
      FeedTime:hour()
    });
  }
}

  function AddFood(){
    position++
    database.ref('/').update({
      Food:position})
    }
    
