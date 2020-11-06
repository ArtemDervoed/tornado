import SimplexNoise from 'simplex-noise';
import * as THREE from 'three';

// import Particle from './particle';

function createArray(length) {
	var arr = new Array(length || 0),
		i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

export default class Wind {
  constructor(width, height) {
    this.width = width;
		this.height = height;
		
		this.cols = 25;
		this.rows = 25;

		this.gwidth = this.width / this.cols;
		this.gheight = this.height / this.rows;

    this.flowfield = createArray(this.cols, this.rows);
    
    console.log(this.flowfield);

		this.particles = [];

		// for (let i = 0; i < 500; i++) {
		// 	this.particles.push(new Particle(
		// 		Math.random() * width,
		// 		Math.random() * height,
		// 		)
		// 	);	
		// }

		this.opts = {
			width: this.width,
			height: this.height,
			gwidth: this.gwidth,
			gheight: this.gheight,
			rows: this.rows,
			cols: this.cols
		};

		this.simplex = new SimplexNoise(),
		this.time = 0;
	}
	
	draw(ctx) {
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				let flow = this.simplex.noise3D(i / 300, j / 300, this.time / 300);
				let alpha =  -Math.PI / 2 * flow * 0.5;
				let posx = Math.cos(alpha) * this.gwidth;
				let posy = Math.sin(alpha) * this.gheight;
	
				this.flowfield[i][j] = [posx,posy];

				// ctx.beginPath();
				// ctx.moveTo(i * this.gwidth, j * this.gheight);
				// ctx.lineTo(i * this.gwidth + posx , j * this.gheight + posy);
				// ctx.closePath();
				// ctx.stroke();
				
	
				// ctx.fillColor = '#ffffff';
				// ctx.fillText(flow,i*gwidth,j*gheight);
			}
		}
		// this.particles.forEach(p => {
		// 	p.wind(this.flowfield, this.opts);
		// 	p.move(this.opts);
		// 	p.draw(ctx);
		// })
		// this.time++;
	}
}