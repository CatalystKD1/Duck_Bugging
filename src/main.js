import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
// Get the Canvas element the 3D model will be rendered to
const canvas = document.getElementById('duckCanvas');

// Define renderer and camera
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
// Set the size of the render inside the canvas
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
// Background colour of the scene
renderer.setClearColor(0xe7ff6e);

// Camera set uo
const camera = new THREE.PerspectiveCamera(
    75, // fov
    canvas.clientWidth / canvas.clientHeight, // aspect
    0.1, // near
    1000 // far
);
// positioning the camera the way I like it
camera.position.z = 6;
camera.position.y = 1;

// Lights
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Variables for animation
let isRecording = false;
let duckModel = null;
// get the time of frames? Used for animation
let clock = new THREE.Clock();

// Load Duck model
const loader = new GLTFLoader();
loader.load('./public/Duck.glb', (gltf) => {
    duckModel = gltf.scene; // toal my model into the scene
    scene.add(duckModel);
    animate(); // start loop
});

// Animate loop
function animate() {
    requestAnimationFrame(animate);

    if (duckModel) {
        let elapsed = clock.getElapsedTime();

        // Use sine waves for smooth motion over time
        duckModel.position.y = Math.sin(elapsed * 2) * 0.5;

        // Rotate the duck when recording
        if (isRecording) {
            duckModel.rotation.y += 0.01;
        }
    }
    // render the animation
    renderer.render(scene, camera);
}

// Toggle recording/spin on click
canvas.addEventListener("click", () => {
    isRecording = !isRecording;
});
