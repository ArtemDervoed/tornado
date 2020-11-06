import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Particles from './particles';
import Wind from './wind';

window.onload = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  const controls = new OrbitControls( camera, renderer.domElement );

  camera.position.z = 1;
  camera.position.y = 0;

  const ParticlesCloud = new Particles();
  const FlowField = new Wind(1000, 1000);
  FlowField.draw()


  scene.add(ParticlesCloud.points);

  const animate = () => {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
  }
  animate();
}