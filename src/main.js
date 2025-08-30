import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const canvas = document.getElementById('duckCanvas');

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setClearColor(0xe7ff6e);

const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
);
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
let clock = new THREE.Clock();

// Load Duck model using imported URL
const loader = new GLTFLoader();
loader.load(`${import.meta.env.BASE_URL}Duck.glb`, (gltf) => {
    duckModel = gltf.scene;
    scene.add(duckModel);
    animate();
});

// Animate loop
function animate() {
    requestAnimationFrame(animate);

    if (duckModel) {
        let elapsed = clock.getElapsedTime();
        duckModel.position.y = Math.sin(elapsed * 2) * 0.5;

        if (isRecording) {
            duckModel.rotation.y += 0.01;
        }
    }

    renderer.render(scene, camera);
}

// Toggle recording/spin on click
canvas.addEventListener("click", () => {
    isRecording = !isRecording;
});
