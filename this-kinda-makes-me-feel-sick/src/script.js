class baseScene {
   constructor() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.anaglyph = new THREE.AnaglyphEffect(this.renderer);
      this.anaglyph.setSize(window.innerWidth, window.innerHeight);
      this.camera.position.z = 300;

      document.body.appendChild(this.renderer.domElement);
      
   }
   update() {
   }
}
class spinnyCylinders extends baseScene {
   constructor() {
      super(); 
      this.cylinderThickness = 0.05;
      this.geometry = new THREE.CylinderGeometry( this.cylinderThickness, this.cylinderThickness, 1000 );
      this.material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
      this.cylinders = [];
      this.cylinderCount = 10;
      for(let i = 0; i < this.cylinderCount; i++) {
         let cylinder = new THREE.Mesh( this.geometry, this.material );
         cylinder.rotateX(THREE.Math.degToRad(-45));
         this.cylinders.push(cylinder);
      }
      this.scene.add( ...this.cylinders );
      
   }
   update() {
      window.requestAnimationFrame( function() {this.update()}.bind(this));
      this.anaglyph.render( this.scene, this.camera );
      for(let cylinder of this.cylinders) {
         cylinder.rotation.z = Math.sin(this.offset);
         this.offset += 0.001/Math.sqrt(this.cylinderCount);

      }
   }
}

class bouncySquares extends baseScene {
   constructor() {
      super();
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.cubeWidth = 50;
      this.rows = 9*2;
      this.columns = 16*2;
      this.geometry = new THREE.CubeGeometry(this.cubeWidth, this.cubeWidth, this.cubeWidth);
      this.material = new THREE.MeshBasicMaterial({color: 0xffffff});
      this.cubes = [];
      //this.camera.rotation.x = THREE.Math.degToRad(15);
      //this.camera.rotation.y = THREE.Math.degToRad(15);
      for(let y = 0; y < this.rows; y++) {
         for(let x = 0;  x < this.columns; x++) {
            let cube = new THREE.Mesh(this.geometry, this.material);
            cube.position.x = ((x-this.columns/2)*this.cubeWidth)*2;
            cube.position.y = ((y-this.rows/2)*this.cubeWidth)*2;
            this.cubes.push(cube);
         }
      }
      this.scene.add(...this.cubes);
      this.offset = 0;
   }
   update() {
      for(let cube in this.cubes) {
         this.cubes[cube].position.z = -Math.abs(Math.sin(this.offset + cube*6)*200) - this.cubeWidth;
         this.cubes[cube].rotation.z = this.cubes[cube].position.z/100;
         this.offset += 0.0001; 
      }
      window.requestAnimationFrame( function() {this.update()}.bind(this));
      this.anaglyph.render( this.scene, this.camera );
   }
}

let scene = new bouncySquares();
scene.update();


