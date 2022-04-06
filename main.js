import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

const controls = new OrbitControls( camera, renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const MAX_POINTS = 500;

const curve = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3( -10, 0, 0 ),
  new THREE.Vector3( 20, 15, 0 ),
  new THREE.Vector3( 10, 0, 0 )
);

const curve_points = curve.getPoints( MAX_POINTS );
console.log(curve_points)

// console.log(points)
const curve_geometry = new THREE.BufferGeometry()

// attributes
const curve_positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
curve_geometry.setAttribute( 'position', new THREE.BufferAttribute( curve_positions, 3 ) );

const curve_material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// draw range
const drawCount = 2; // draw the first 2 points, only
curve_geometry.setDrawRange( 0, drawCount );

// Create the final object to add to the scene
const curveObject = new THREE.Line( curve_geometry, curve_material );

scene.add(curveObject)

const line_positions = curveObject.geometry.attributes.position.array;
console.log(line_positions)

let index = 0;

for ( let i = 0, l = MAX_POINTS; i < l; i ++ ) {

    line_positions[ index ++ ] = curve_points[i].x;
    line_positions[ index ++ ] = curve_points[i].y;
    line_positions[ index ++ ] = curve_points[i].z;

}

let counter = 0;

function animate() {

  requestAnimationFrame( animate );

  if (counter < MAX_POINTS) {
    counter += 1
    curveObject.geometry.setDrawRange( 0, 2+counter );
  }

  renderer.render( scene, camera );

}

animate();
