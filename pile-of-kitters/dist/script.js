const catCount = (window.innerWidth * window.innerHeight) / (Math.PI * Math.pow(100, 2));
console.log(catCount);

const sprites = [
   {name: `cat0`, scale: 0.60},
   {name: `cat1`, scale: 0.35},
   {name: `cat2`, scale: 0.35},
   {name: `cat3`, scale: 0.35},
   {name: `cat4`, scale: 0.40},
   {name: `cat5`, scale: 0.45},
   {name: `cat6`, scale: 0.25},
   {name: `cat7`, scale: 0.25},
   {name: `cat8`, scale: 0.35},
];
const hostname = "https://r-mtx.net/sprites/cats";

let startScene = new Phaser.Scene('start');

startScene.preload = function() {
   this.load.setCORS();
   for(let sprite of sprites) {
      this.load.image(sprite.name, `${hostname}/${sprite.name}.png`);
   }
}

function calcPearlCount(r) {
   let area = window.innerWidth * window.innerHeight;
   let circleArea = Math.PI * r * r;
   return area / circleArea;
}

startScene.create = function() {
   this.matter.add.mouseSpring();
   this.pearls = this.add.group();
   let area = window.innerWidth * window.innerHeight;
   let pearlCount = catCount;
   for(let i = 0; i < pearlCount; i++) {
      let sprite = sprites[Math.floor(Math.random() * sprites.length)];
      let pearl = this.add.sprite(0, 0, sprite.name);
      pearl.setRandomPosition();
      // TODO - Figure out how to scale both body and sprite
      let pearlMatter = this.matter.add.gameObject(pearl, {shape: "circle"});
      
      pearlMatter.setScale(sprite.scale);
      this.pearls.add(pearl);
   }
   
}
startScene.update = function() {
}

let config = {
   width: window.innerWidth,
   height: window.innerHeight,
   scene: startScene,
   physics: {
      default: 'matter',
      matter: {
         gravity: {
            x: 0,
            y: 3,
         },
         setBounds: {
             x: 0,
             y: -1000,
             width: window.innerWidth,
             height: window.innerHeight + 1000,
             thickness: 256,
             left: true,
             right: true,
             top: true,
             bottom: true,
         },
      }
   },
   
}

let game = new Phaser.Game(config);