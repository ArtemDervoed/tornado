import * as THREE from 'three';

export default class Axis {
  constructor(circlesCount) {
    this.points = [];
    this.circlesCount = circlesCount || 50;
    this.generate();
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

    console.log(this.curve, this.line);
  }

  getSteps() {
    return this.steps;
  }



  getLine() {
    return this.line;
  }

  render(time) {
    this.curve.points.forEach((p, i) => {
      p.z = Math.sin(i / 10 + time) * 2.5;
      p.x = Math.cos(i / 10 + time) * 2.5;
    });
    this.steps = this.curve.getPoints( this.circlesCount - 1 );
    this.lineGeometry.setFromPoints(this.steps);
  }
}