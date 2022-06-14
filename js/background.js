import { GLTFLoader } from './GLTFLoader.js';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Color,
    Mesh,
    AmbientLight,
    Vector3,
    DirectionalLight,
    MathUtils,
} from "./Three/Three.js";

const getScrollPosition = () => {
    return document.documentElement.scrollTop / document.documentElement.scrollTopMax;
};

const createScene = async () => {

    // setup scene
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    document.body.onresize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };

    // setup lighting
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // setup model
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync("../src/dna.gltf");

    /** @type {Mesh} */
    const mesh = gltf.scene.children[0];

    scene.add(mesh);
    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // smooth camera movement
    camera.position.z = 8;
    camera.rotation.z = -0.25 * Math.PI;
    let cameraDistance, cameraRotation;

    // scroll event listener
    const onScroll = () => {
        const position = getScrollPosition();
        cameraDistance = 3.5 + position * 2.5;
        cameraRotation = (0.2 + position * 0.2) * Math.PI;
    };

    document.addEventListener("scroll", onScroll);
    onScroll();

    // remove loader
    const overlay = document.querySelector(".loader");
    overlay.classList.add("hidden");
    setTimeout(() => overlay.remove(), 500);

    // render method
    function render() {
        requestAnimationFrame(render);

        // camera smooth intro
        camera.position.z = MathUtils.lerp(camera.position.z, cameraDistance, 0.05);
        camera.rotation.z = MathUtils.lerp(camera.rotation.z, cameraRotation, Math.PI / 200);

        mesh.rotateOnAxis(new Vector3(0, 1, 0), 0.005);

        renderer.render(scene, camera);
    }

    render();
};

export default createScene;
// window.addEventListener("DOMContentLoaded", createScene);
