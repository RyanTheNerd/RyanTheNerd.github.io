class RoseFactory extends Phaser.GameObjects.Graphics {
   constructor(scene, r, n, d, i) {
      super(scene);
      this.r = r;
      this.n = n;
      this.d = d;
      this.index = i;
      this.defaultStrokeColor = 255;
      this.setDefaultStyles({
          lineStyle: {
              width: 0.05,
              color: 0xffffff,
              alpha: 1
          },
          fillStyle: {
              color: 0xffffff,
              alpha: 0
          }
      });
   }
   storeInKey() {
      //this.translateCanvas(this.r, this.r);
      this.beginPath();
      this.moveTo(0, 0);
      for(let i = 0; i < 361; i++) {
         let k = i * this.d;
         let r = this.r * Math.sin(Phaser.Math.DegToRad(this.n*k));
         let x = r * Math.cos(Phaser.Math.DegToRad(k));
         let y = r * Math.sin(Phaser.Math.DegToRad(k));
         this.lineTo(x+this.r, y+this.r);
      }
      this.closePath();
      this.strokePath();
      this.generateTexture(`rose${this.index}`, this.r*2, this.r*2);
   }
   
   
}
let startScene = new Phaser.Scene('start');

startScene.create = function() {
   this.matter.add.mouseSpring();
   this.roses = this.add.group();
   this.roseFactories = this.add.group();
   let area = window.innerWidth * window.innerHeight;
   let rMin = 20;
   let rMax = 100;
   let roseCount = Math.floor(Math.sqrt(area)/((rMin + rMax)/2))*3;
   console.log(roseCount);
   for(let i = 0; i < roseCount; i++) {
      let r = Phaser.Math.Between(rMin, rMax);
      let n = Phaser.Math.Between(2, 12);
      let d = Phaser.Math.Between(2, 71);
      let roseFactory = new RoseFactory(this, r, n, d, i);
      roseFactory.storeInKey();
      this.roseFactories.add(roseFactory);
      let rose = this.add.sprite(0, 0, `rose${i}`);
      rose.setRandomPosition();
      
      this.matter.add.gameObject(rose, {
         shape: 'circle',
      });
      
      this.roses.add(rose);
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