const FURTHEST = 100;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
   120,   // Field of view
   window.innerWidth/window.innerHeight,  // Aspect Ratio
   0.1,  // Nearest
   FURTHEST,   // Furthest
);

camera.position.z = 0;
camera.position.y = 5;
camera.position.x = 0;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

class MatrixLine {
   constructor(scene, direction, position) {
      let thickness = 0.1;
      this.material = new THREE.MeshBasicMaterial({color: 0xaa00aa});
      
      // If line is horizontal, then position is the z
      if(direction == "H") {
      this.geometry = new THREE.CylinderBufferGeometry(thickness, thickness, FURTHEST*2, 32);
         this.mesh = new THREE.Mesh(this.geometry, this.material);
         this.mesh.position.set(0, 0, position);
         this.mesh.rotation.z = Math.PI/2;
      }
      else if(direction == "V") {
      this.geometry = new THREE.CylinderBufferGeometry(thickness, thickness, FURTHEST, 32);
         this.mesh = new THREE.Mesh(this.geometry, this.material);
         this.mesh.position.set(position, 0, 0);
      }
      this.mesh.rotation.x = Math.PI/2;
      scene.add(this.mesh);
   } 
}
class Matrix {
   constructor(scene) {
      this.speed = 0.1;
      this.HorizontalLines = [];
      for(let x = -FURTHEST; x <= FURTHEST; x += 5) {
         new MatrixLine(scene, 'V', x);   
      }
      for(let z = 0; z >= -FURTHEST/2; z -= 5) {
         this.HorizontalLines.push(new MatrixLine(scene, 'H', z));
      }
   }
   updateHorizontalLines() {
      for(let line of this.HorizontalLines) {
         line.mesh.position.z += this.speed;
         if(line.mesh.position.z >= 0) {
            line.mesh.position.z = -FURTHEST/2 - line.mesh.position.z;
         }
      }
   }
}

class Sun {
   constructor(scene) {
      this.geometry = new THREE.SphereGeometry(50, 32, 32);
      this.material = new THREE.MeshPhysicalMaterial({color: 0xffffff});
      this.material.roughness = 0.50;
      this.material.metalness = 0.5;
      this.material.reflectivity = 0.25;
      this.material.flatShading = 1;
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.position.set(0, 10, -FURTHEST);
      this.lightHeight = 100;
      this.lightBrightness = 1;
      this.topLight = new THREE.DirectionalLight(0xffaa00, this.lightBrightness);
      this.topLight.position.set(0, this.lightHeight, 0);
      this.topLight.target = this.mesh;
      this.bottomLight = new THREE.DirectionalLight(0xff0000, this.lightBrightness);
      this.bottomLight.position.set(0, -this.lightHeight, 0);
      this.bottomLight.target = this.mesh;
      scene.add(this.bottomLight, this.topLight);
      scene.add(this.mesh);
   }
}

const matrix = new Matrix(scene);
const sun = new Sun(scene);

function update() {
   renderer.render(scene, camera);
   sun.mesh.rotation.y += 0.005;
   matrix.updateHorizontalLines();
   window.requestAnimationFrame(update);
}
renderer.render(scene, camera);
window.requestAnimationFrame(update);



   