import * as THREE from "three";
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, 1.25);



const planeGeometry = new THREE.PlaneGeometry(28,20);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x218600
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);

const CSTboxGeometry = new THREE.BoxGeometry(3,5,3);
const CSTboxMaterial = new THREE.MeshBasicMaterial({
    color: 0xcfa781
});
const CSTbox = new THREE.Mesh(CSTboxGeometry, CSTboxMaterial);

const SusEnergyGeometry = new THREE.BoxGeometry(3,6,3);
const SusEnergyMaterial = new THREE.MeshBasicMaterial({
    color: 0x5ba5e1
})
const SusEnergy = new THREE.Mesh(SusEnergyGeometry, SusEnergyMaterial);

const LongBuildGeometry = new THREE.BoxGeometry(10,5,3);
const LongBuildMaterial = new THREE.MeshBasicMaterial({
    color: 0x0470a5
})

const LongBuild = new THREE.Mesh(LongBuildGeometry, LongBuildMaterial);

const roadVertGeometry = new THREE.BoxGeometry( 3,planeGeometry.parameters.height,0.01);
const roadVertMaterial = new THREE.MeshBasicMaterial({
    color: 0x6c6d6d
});

const roadVert = new THREE.Mesh(roadVertGeometry, roadVertMaterial);

const roadHorGeometry = new THREE.BoxGeometry( planeGeometry.parameters.width-0.1,3, 0.01);
const roadHorMaterial = new THREE.MeshBasicMaterial({
    color: 0x6c6d6d
});

const roadHor = new THREE.Mesh(roadHorGeometry, roadHorMaterial);

const ringGeometry = new THREE.CylinderGeometry(3.5,3.5, 0.01);
const ringMaterial = roadHorMaterial;
const ring = new THREE.Mesh(ringGeometry, ringMaterial);

const movingObjGeometry = new THREE.TetrahedronGeometry(1.5);
const movingObjMaterial = new THREE.MeshBasicMaterial({
    color: 0xc26dca
});
const movingObj = new THREE.Mesh(movingObjGeometry, movingObjMaterial);

const slantedObjGeometry = new THREE.BoxGeometry(10,5,3);
const slantedObjMaterial = new THREE.MeshBasicMaterial({
    color: 0x929192
});
const slantedObj = new THREE.Mesh(slantedObjGeometry, slantedObjMaterial);

CSTbox.position.z += CSTboxGeometry.parameters.depth/2;
CSTbox.position.y += planeGeometry.parameters.height/4;
CSTbox.position.x -= planeGeometry.parameters.width/3;

SusEnergy.position.z += SusEnergyGeometry.parameters.depth/2;
SusEnergy.position.y -= planeGeometry.parameters.height/4;
SusEnergy.position.x -= planeGeometry.parameters.width/3;

LongBuild.position.z += LongBuildGeometry.parameters.depth/2;
LongBuild.rotation.z += 3;
LongBuild.position.y += planeGeometry.parameters.height/4;
LongBuild.position.x += planeGeometry.parameters.width/4;

roadVert.position.z += roadVertGeometry.parameters.depth/2;
// roadVert.rotation.z += 3.14159*0.505;
roadVert.position.x -= 4;

roadHor.position.z = roadVert.position.z;
roadHor.rotation.z += -0.08;

ring.position.z = roadVert.position.z;
ring.position.y = roadHor.position.y;
ring.position.x -= 4;
ring.rotation.x += 3.14159/2;

movingObj.position.z += LongBuildGeometry.parameters.depth/2 -0.3;
movingObj.position.x -= 3.6;
movingObj.position.y -= 7;

slantedObj.position.z += slantedObjGeometry.parameters.depth/2;
slantedObj.position.y -= 6.75;
slantedObj.position.x += 8.4;

scene.add(plane);
scene.add(CSTbox);
scene.add(SusEnergy);
scene.add(LongBuild);
scene.add(roadVert);
scene.add(roadHor);
scene.add(ring);
scene.add(movingObj);
scene.add(slantedObj);

scene.add(camera);

camera.position.z = 9;
camera.position.y = 9;
camera.position.x = 9;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

gsap.to(movingObj.position, { duration: 2, y:6 , ease: "power1.inOut", repeat: -1, yoyo: true });
gsap.to(movingObj.rotation, { duration: 2, y: Math.PI * 2, ease: "power1.inOut", repeat: -1, yoyo: true });


function animate()
{
    requestAnimationFrame(animate);
    orbitControls.update();
    renderer.render(scene,camera);
}
animate();