import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

function startLoader() {
    let counterElement = document.querySelector(".counter");
    let currentValue=0;
    
    function updateCounter() {
        if (currentValue ===100) {
            return;
        }

        currentValue += Math.floor(Math.random() *10) +1;

        if(currentValue>100){
            currentValue=100;
        }
        counterElement.textContent = currentValue;
        let delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateCounter, delay);
    }
    
    updateCounter();
}

startLoader();

gsap.to(".counter", 0.25, {
    delay:3.5,
    opacity: 0,
});

gsap.to(".bar", 1.5, {
    delay:3.5,
    height: 0,
    stagger: {
        amount: 0.5,
    },
    ease: "power4.inOut",
});

gsap.from (".h1", 1.5, {
    delay: 4,
    y:700,
    stagger: {
        amount:0.5,
    },
    ease:"power4.inOut",
})

gsap.from(".ground", 2,{
    delay:4.5,
    y: 400,
    ease: "power4.inOut",
});


// Create a Three.js scene
const scene = new THREE.Scene();

// Create a camera with a wider field of view
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);


// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(0, 10, 10);
spotLight.angle = Math.PI / 6;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 50;
scene.add(spotLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 2);
hemisphereLight.position.set(0, 10, 0);
scene.add(hemisphereLight);

// Add additional lights
const additionalPointLight = new THREE.PointLight(0xffffff, 0.5, 100);
additionalPointLight.position.set(-10, 10, 10);
scene.add(additionalPointLight);

const additionalSpotLight = new THREE.SpotLight(0xffffff, 0.5);
additionalSpotLight.position.set(-10, 20, -10);
additionalSpotLight.angle = Math.PI / 8;
additionalSpotLight.penumbra = 0.2;
additionalSpotLight.distance = 100;
scene.add(additionalSpotLight);

const additionalDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
additionalDirectionalLight.position.set(-5, -10, 10);
scene.add(additionalDirectionalLight);

// Load the 3D model
const loader = new GLTFLoader();
let chalice;
loader.load(
  `models/chalice/scene.gltf`,
  function (gltf) {
    chalice = gltf.scene;
    scene.add(chalice);

    chalice.position.set(0,0,0);

    // Animation for the model
    function animate() {
      requestAnimationFrame(animate);
      if (chalice) {
        chalice.rotation.y += 0.01; // Spinning effect
        chalice.position.y = Math.sin(Date.now() * 0.002) * 2; // Floating effect
      }
      renderer.render(scene, camera);
    }
    animate();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

// Set the camera position further back
camera.position.z = 50;

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', () => {
    
      window.location.href = './intro'; // Replace with your target page URL
  });
});