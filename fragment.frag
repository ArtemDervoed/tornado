precision mediump float;

uniform sampler2D pointTexture;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  float disc = smoothstep(0.5, 0.4, dist);
  gl_FragColor = vec4(disc, disc, disc, disc);
  if (disc < 0.05) discard;
}