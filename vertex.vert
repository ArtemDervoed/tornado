precision highp float;

attribute vec3 velocity;
attribute float size;
// varying vec2 vUv;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;

void main() {
  // vUv = uv;
  vec3 newPos = position + velocity;
  vec4 mvPosition = modelViewMatrix * vec4( newPos, 1. );
  gl_PointSize = size * ( 100.0 / length( mvPosition.xyz ));;

  gl_Position = projectionMatrix * mvPosition;

}