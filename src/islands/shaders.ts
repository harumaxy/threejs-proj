export const vertexShaderDefine = `
uniform float u_time;
uniform float u_radius;
varying vec2 v_uv;
`;

export const beginnormal_vertex = `
float delta = (sin(u_time) + 1.0) / 2.0;
vec3 objectNormal = delta * normal + (1.0 - delta) * normalize(position);
`;

export const begin_vertex = `
v_uv = uv;
vec3 v = normalize(position) * u_radius;
vec3 transformed = delta * position + (1.0 - delta) * v;
`;

export const fragmentShaderDefine = `
uniform float u_time;
varying vec2 v_uv;
`;

export const color_fragment = `
float rnd = fract(sin(dot(v_uv.xy, vec2(12.9898, 78.233)) + u_time) * 43758.5453123);
float r = (sin(u_time) + 1.0) / 2.0;
float g = (sin(PI * 2.0 / 3.0 + u_time) + 1.0) / 2.0;
float b = (sin(PI * 4.0 / 3.0 + u_time) + 1.0) / 2.0;
vec3 color = vec3(r, g, b) * rnd;
diffuseColor = vec4(color, 1.0);
`;
