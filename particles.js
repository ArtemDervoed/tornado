import * as THREE from 'three';

import vertexShader from './vertex.vert';
import fragmentShader from './fragment.frag';

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
    const pointPerRing = 100;
    this.sizes = new Float32Array( this.vertices.length );
    this.frictions = new Float32Array( this.vertices.length );

    for ( let j = 0; j < pointPerRing; j ++ ) {
      this.sizes[j] = PARTICLE_SIZE * 0.5;
      this.velocites.push(Math.random(), Math.random(), Math.random());
      this.frictions[j] = Math.random();
      // const x = radius * Math.sin(Math.PI * 2 * j / pointPerRing) ;
      // const z = radius * Math.cos(Math.PI * 2 * j / pointPerRing) ;
      // const y = 0;

      const x = 1000 * Math.random() - 500;
      const y =  0;
      const z = 1000 * Math.random() - 500;
      this.vertices.push( x, y, z );
    }

    for ( let j = 0; j < pointPerRing; j++ ) {

    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( this.vertices, 3 ) );
    this.geometry.setAttribute( 'velocity', new THREE.Float32BufferAttribute( this.velocites, 3 ) );
    this.geometry.setAttribute( 'friction', new THREE.BufferAttribute( this.frictions, 1 ) );
    this.geometry.setAttribute( 'size', new THREE.BufferAttribute( this.sizes, 1 ) );


    this.material = new THREE.ShaderMaterial( {

      uniforms: {
        uTime: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      depthTest: true,
      depthWrite: true

    });

    this.points = new THREE.Points( this.geometry, this.material );

    console.log(this.points);
  }

  render() {

  }
}