import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'dat.gui';
// import gsap from 'gsap';
import Circle from './circle';
import Axis from './axis';

const circlesCount = 150;

function range(min, max) {
  return min + Math.random() * (max - min);
}

const generateSpring = (steps) => {

  const lines = [];

  for (let c = 0; c < steps.length; c++) {
    const level = range(10, 20);
    const zero = level / 25;
    const circle = new Circle(50 * zero * zero);
    circle.line.position.x = steps[c].x;
    circle.line.position.y = steps[c].y;
    circle.line.position.z = steps[c].z;
    lines.push(circle);
  }
  return {lines};
}


window.onload = () => {
  let time = 0;

  const scene = new THREE.Scene();
  const tornado = new THREE.Group();
  scene.add(tornado);
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  

  const renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls( camera, renderer.domElement );

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const tornadoPivot = new Axis(circlesCount);
  tornado.add(tornadoPivot.getLine())

  const { lines } = generateSpring(tornadoPivot.getSteps());
  lines.forEach((l, i) => {
    tornado.add(l.line);
  })

  camera.position.z = 235;
  tornado.position.y = -circlesCount / 2
  // camera.position.y = 55;



  const animate = function () {
    tornadoPivot.render(time);
    lines.forEach((l, i) => {
      l.render(time, tornadoPivot.getSteps()[i]);
    })
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
    time += 0.1;
    // if (time > 1) time = 0;
  };

  animate();

}