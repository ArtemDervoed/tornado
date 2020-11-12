import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// import * as dat from 'dat.gui';
// import gsap from 'gsap';
import Circle from './circle';
import Axis from './axis';

const params = {
  exposure: 1,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 1
};


const circlesCount = 150;

const generateSpring = (steps) => {

  const lines = [];

  for (let c = 0; c < steps.length; c++) {
    // const level = THREE.MathUtils.randFloat(-10, 10)
    // console.log(level);
    const rad = THREE.MathUtils.randFloat(10, 20)
    const circle = new Circle(rad);
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
  // scene.add( new THREE.AmbientLight( 0x404040 ) );

  // const pointLight = new THREE.PointLight( 0xff00ff, 10 );
  // camera.add( pointLight );

  // const renderer = new THREE.WebGLRenderer();
  const renderer = new THREE.WebGLRenderer( { antialias: false } );
				renderer.setPixelRatio( window.devicePixelRatio );
  const composer = new EffectComposer( renderer );
  const renderPass = new RenderPass( scene, camera );
  composer.addPass( renderPass );
  const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;
  // composer.addPass( bloomPass );
  
  const controls = new OrbitControls( camera, renderer.domElement );

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const tornadoPivot = new Axis(circlesCount);
  tornado.add(tornadoPivot.getLine())

  const { lines } = generateSpring(tornadoPivot.getSteps());
  lines.forEach((l, i) => {
    tornado.add(l.line);
  })

  camera.position.z = 135;
  tornado.position.y = -circlesCount / 2

  // tornado.rotation.x = Math.PI;
  // tornado.position.y = 100
  // tornadoPivot.higher();
  // camera.position.y = 55;



  const animate = function () {
    tornadoPivot.render(time);
    // lines.forEach((l, i) => {
    //   l.render(time, tornadoPivot.getSteps()[i]);
    // })
    requestAnimationFrame( animate );
    controls.update();
    // renderer.render( scene, camera );
    composer.render();
    time += 0.1;
    // if (time > 1) time = 0;
  };

  animate();

}