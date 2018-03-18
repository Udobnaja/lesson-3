import * as THREE from 'three';

let camera = null;
let scene = null;
let renderer = null;
let sphere = null;
const width = 150;
const height = 150;
const texture = './images/planet.jpg';

export function initPlanetGeometry() {

    const planet = document.querySelector('.planet');
    const textureLoader = new THREE.TextureLoader().load(texture);
    const geometry = new THREE.SphereGeometry(0.55, 32, 16);
    const material = new THREE.MeshBasicMaterial({map: textureLoader});

    camera = new THREE.PerspectiveCamera(70, width/height , 0.01, 10);
    scene = new THREE.Scene();
    sphere = new THREE.Mesh(geometry, material);
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

    camera.position.z = 1;
    scene.add(sphere);
    renderer.setSize(width, height);
    planet.appendChild(renderer.domElement);

    animatePlanet();
}

export function animatePlanet() {

    requestAnimationFrame(animatePlanet);

    sphere.rotation.x += 0.02;
    sphere.rotation.y += 0.02;

    renderer.render(scene, camera);
}

