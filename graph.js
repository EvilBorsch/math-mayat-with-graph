import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r114/build/three.module.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

var renderer, scene
var camera2


var c = new THREE.Color(0x0000ff); // задаем цвет
var obj = {color: c}

const parameters =
    {
        x: 0, y: 0, z: 0,
    };


setUpGUI()
init()

animate()


export function init() {

    // info

    var info = document.createElement('div');

    info.style.top = '30px';
    info.style.width = '100%';


    document.body.appendChild(info);

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    document.body.appendChild(renderer.domElement);

    // scene
    var c = new THREE.Color(0xffffff); // задаем цвет
    scene = new THREE.Scene();
    scene.background = c


    drawAxis()

    //updatePositions();

}


var coef = 10
camera2 = new THREE.PerspectiveCamera(140, window.innerWidth / window.innerHeight, 1, coef);
camera2.position.set(0, 0, coef);


function drawAxis() {
    let materialLine = new THREE.LineBasicMaterial({color: 0x000000});
    let geometryLine = new THREE.Geometry();
    geometryLine.vertices.push(new THREE.Vector3(0, 0, 0));
    geometryLine.vertices.push(new THREE.Vector3(0, 20000, 0));
    geometryLine.vertices.push(new THREE.Vector3(0, 0, 0));
    geometryLine.vertices.push(new THREE.Vector3(20000, 0, 0));
    let line2 = new THREE.Line(geometryLine, materialLine);
    scene.add(line2);
}

function drawLine(x1, y1, x2, y2) {

    var materialLine = new THREE.LineBasicMaterial(obj);

    let geometryLine = new THREE.Geometry();
    geometryLine.vertices.push(new THREE.Vector3(x1, y1, 0));
    geometryLine.vertices.push(new THREE.Vector3(x2, y2, 0));
    let line2 = new THREE.Line(geometryLine, materialLine);
    scene.add(line2);
}


function setUpGUI() {
    var gui = new GUI();
    var color = {
        value: c.getHex() // получаем hex-здначение цвета и записываем его в объект
    }
    gui.addColor(color, "value").name("background").onChange((value) => {
        obj.color.set(value); // меняем значение заданного цвета
    });

    const folder1 = gui.addFolder('MaxValues');
    folder1.add(parameters, 'y').onChange((value) => {
        // eslint-disable-next-line max-len
        ymax = value
        camera2 = new THREE.PerspectiveCamera(140, window.innerWidth / window.innerHeight, 1, value);
        camera2.position.set(0, 0, value)


    });

    folder1.add(parameters, 'x').onChange((value) => {
        // eslint-disable-next-line max-len
        ChangeCameraByX(value)


    });


}


function ChangeCameraByX(value) {
    xmax = value
    camera2.position.set(value, 0, ymax)
}


// render
function render() {

    renderer.render(scene, camera2);

}

var prevx = 0
var prevy = 0
var ymax = coef
var xmax = 100


function f(x) {
    return Math.sin(x)
}

var last_val=30
function animate(time) {

    //TODO трогать
    let height = 40;

    //TODO не трогать
    let x0 = 1;
    let y0 = 1;
    let z0 = 1;


    let omega = Math.sqrt(10 / height);

    //TODO больше 180 выдавать БАН
    //TODO трогать
    let phi0 = 0.0175 * 90;
    time = time / 100
    let phi = phi0 * Math.cos(omega * time)


    let x = time
    let y = phi


    drawLine(prevx, prevy, x, y)
    prevx = x
    prevy = y
    //ChangeCameraByX(0.1);
    if (camera2 !== undefined) {
        ChangeCameraByX(last_val)
        last_val+=0.1
        // xmax = 3
        // camera2.position.set(3, 0, ymax)

    }

    requestAnimationFrame(animate);
    render();
    //ChangeCameraByX(3)


}
