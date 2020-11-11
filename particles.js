import * as THREE from 'three';

console.log(THREE);

const PARTICLE_SIZE = 20;

export default class Particles {
  constructor() {
    this.vertices = [];
    this.velocites = [];
    this.frictions = [];
    this.generate();
  }

  generate() {
    const radius = 50;
    const pointPerRing = 400;
    this.sizes = new Float32Array( this.vertices.length );
    this.geometry = new THREE.Geometry();
    // this.frictions = new Float32Array( this.vertices.length );

    for ( let j = 0; j < pointPerRing; j ++ ) {
      this.sizes[j] = PARTICLE_SIZE * 0.5;
      // this.velocites.push(Math.random(), Math.random(), Math.random());
      // this.frictions[j] = Math.random();
      const x = radius * Math.sin(Math.PI * 2 * j / pointPerRing) ;
      const z = radius * Math.cos(Math.PI * 2 * j / pointPerRing) ;
      const y = 0;

      // const x = 0;
      // const y = 0;
      // const z = 0;
      this.geometry.vertices.push( new THREE.Vector3(x, y, z ));
    }
    
    // this.geometry = new THREE.BufferGeometry();
    
    // this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.vertices, 3 ) );


    this.material = new THREE.PointsMaterial( { size: 1, sizeAttenuation: true, alphaTest: 0.5, transparent: true } );
    this.material.color.setHSL( 1.0, 0.5, 1 );

    this.points = new THREE.Points( this.geometry, this.material );
  }

  render() {

  }
}