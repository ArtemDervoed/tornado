import * as THREE from 'three';
import gsap from 'gsap'
import SimplexNoise from 'simplex-noise';

export default class Axis {
  constructor(circlesCount) {
    this.points = [];
    this.circlesCount = circlesCount || 50;
    this.generate();
    this.height = 1;
    this.simplex = new SimplexNoise();
  }

  generate() {
    const points = [];
    for (let i = 0; i < this.circlesCount; i++) {
      const x = 0;
      const z = 0;
      const y = i;
      points.push( new THREE.Vector3(x, y, z ) );
    }
    this.curve = new THREE.CatmullRomCurve3( points );
    this.steps = this.curve.getPoints( this.circlesCount - 1 );
    
    this.lineGeometry = new THREE.BufferGeometry().setFromPoints( this.steps );
    this.lineMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);
  }

  getSteps() {
    return this.steps;
  }

  getLine() {
    return this.line;
  }

  higher(){
    gsap.to(this, {
      height: 1,
      duration: 5,
    })
  }

  render(time) {
    // this.curve.points.forEach((p, i) => {
    //   const noise  = this.simplex.noise4D(i, p.z / 10, p.x / 10, time / 10);
    //   p.z = Math.sin(i / 50 + time) * 2.5 * this.height + noise;
    //   p.x = Math.cos(i / 50 + time) * 2.5 * this.height + noise;
    //   p.y = i * this.height;
    // });
    // this.steps = this.curve.getPoints( this.circlesCount - 1 );
    // this.lineGeometry.setFromPoints(this.steps);
  }
}