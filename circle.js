import * as THREE from 'three';
import disc from './disc.png';

export default class Circle {
  constructor(radius, segments) {
    console.log(radius);
    this.points = [];
    this.radius = radius || 50;
    this.segments = segments || 1000;
    this.pointPerRing = 50;
    this.friction = radius / 50;
    this.generate();
  }

  generate() {
    const sprite = new THREE.TextureLoader().load(disc);
    const points = [];
    for (let i = 0; i < this.segments; i++) {
      const x = (this.radius) * Math.sin(Math.PI * 2 * i / this.pointPerRing) ;
      const z = (this.radius) * Math.cos(Math.PI * 2 * i / this.pointPerRing) ;
      const y = 0;
      points.push( new THREE.Vector3(x, y, z ) );
    }
    
    this.lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
    this.lineMaterial = new THREE.PointsMaterial( { size: 0.25, sizeAttenuation: true, map: sprite, alphaTest: 0.2, transparent: true } );
    this.line = new THREE.Points( this.lineGeometry, this.lineMaterial );
    // console.log(this.line);
  }

  render(time, pos) {
    this.line.position.set(pos.x, pos.y, pos.z);
    this.line.rotation.y = time - this.friction;
    
    // this.curve.points.forEach((p, i) => {
    //   p = pos;
    // });
    // console.log(pos);
    // this.steps = this.curve.getPoints( this.circlesCount - 1 );
    // this.line.geometry.setFromPoints(this.steps);
  }
}