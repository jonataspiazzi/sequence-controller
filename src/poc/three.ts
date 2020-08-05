import * as THREE from 'three/src/Three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import spriteImg from './sprite.png';
import sprite2Img from './sprite2.png';
import infosRaw from './infos.json';

const infos = infosRaw as QuadCamInfo[];

interface Location {
  x: number;
  y: number;
  z: number;
}

interface WaypointInfo {
  type: 'waypoint' | 'camera',
  name: string;
  description: string;
  location: Location;
}

interface QuadCamInfo {
  name: string;
  description: string;
  points: WaypointInfo[];
}

type State = 'unlock' | 'lock' | 'hover';

let currentSprites = [] as THREE.Sprite[];
let currentInfo = null as QuadCamInfo;
let currentState = null as State;
let currentHover = undefined as THREE.Sprite;

function setCurrentHover(sprite: THREE.Sprite) {
  if (currentHover === sprite) return;

  if (sprite) {
    currentHover = sprite;
    currentHover.scale.set(2, 2, 2);
  }
  else {
    currentHover.scale.set(1, 1, 1);
    currentHover = undefined;
  }
}

export function setup(canvas: HTMLCanvasElement, arrowDiv: HTMLDivElement) {
  const rect = canvas.getBoundingClientRect();

  const scene = new THREE.Scene();

  // CAMERA

  const camera = new THREE.PerspectiveCamera(50, rect.width / rect.height, 0.1, 1000);
  camera.position.set(0, 0, 0);

  // CONTROLS

  const controls = new PointerLockControls(camera, canvas);

  function setCurrentState(state: State) {
    if (currentState === state) return;

    switch (state) {
      case 'unlock':
        arrowDiv.classList.remove('move');
        arrowDiv.classList.remove('pointer');
        break;
      case 'lock':
        arrowDiv.classList.add('move');
        arrowDiv.classList.remove('pointer');
        break;
      case 'hover':
        arrowDiv.classList.add('pointer');
        arrowDiv.classList.remove('move');
        break;
    }

    currentState = state;
  }

  controls.addEventListener('lock', e => {
    setCurrentState('lock');
  });

  controls.addEventListener('unlock', e => {
    setCurrentState('unlock');
    setCurrentHover(undefined);
  });

  scene.add(controls.getObject());

  canvas.addEventListener('click', () => {
    console.log('locked');
    controls.lock();
  });

  //const controls = new OrbitControls(camera, canvas);
  //controls.minDistance = 1;
  //controls.maxDistance = 1;
  //controls.enablePan = false;
  //controls.enableZoom = false;
  //scene.userData.controls = controls;

  // RENDER

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(rect.width, rect.height);

  // GISMO

  /*
  function createGismo(axis: 'x' | 'y' | 'z', color: number) {
    const coord = {
      x: [.2, .05, .05],
      y: [.05, .2, .05],
      z: [.05, .05, .2]
    };

    const geo = new THREE.BoxBufferGeometry(...coord[axis]);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(color, 1, .5),
      roughness: 0.5,
      metalness: 0,
      flatShading: true
    });

    const gismo = new THREE.Mesh(geo, mat);

    switch (axis) {
      case 'x': gismo.translateX(.1); break;
      case 'y': gismo.translateY(.1); break;
      case 'z': gismo.translateZ(.1); break;
    }

    scene.add(gismo);
  }

  createGismo('x', 0);
  createGismo('y', .33);
  createGismo('z', .66);
  */

  // LIGHT

  //scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));

  //const light = new THREE.DirectionalLight(0xffffff, 0.5);
  //light.position.set(1, 1, 1);
  //scene.add(light);

  // SKY BOX

  function setCamera(info: QuadCamInfo) {
    currentInfo = info;

    const names = ['negx', 'posx', 'posz', 'negz', 'posy', 'negy'];
    const imgs = names.map(name => require(`./${info.name}/${name}.png`));

    new THREE.CubeTextureLoader().load(imgs, cubeTexture => {
      scene.background = cubeTexture;

      currentSprites.forEach(s => scene.remove(s));
      currentSprites = [];
      info.points.forEach(createSprite);
    });
  }

  function createSprite(waypoint: WaypointInfo) {
    const spriteTex = new THREE.TextureLoader().load(waypoint.type === 'camera' ? spriteImg : sprite2Img);
    const spriteMat = new THREE.SpriteMaterial({ map: spriteTex, color: 0xffffff, fog: true });
    const sprite = new THREE.Sprite(spriteMat);

    sprite.position.set(waypoint.location.x, waypoint.location.z, waypoint.location.y);
    sprite.position.normalize();
    sprite.position.multiplyScalar(20);
    sprite.userData = waypoint;
    sprite.name = waypoint.name;
    scene.add(sprite);
    currentSprites.push(sprite);
  }

  setCamera(infos[0]);

  /*
  new THREE.CubeTextureLoader().load(imgs, cubeTexture => {
    scene.background = cubeTexture;
    const lightProbe = LightProbeGenerator.fromCubeTexture(cubeTexture);
    //scene.add(new LightProbeHelper(lightProbe, 5));
    scene.add(lightProbe);
  });
  */

  // SPRITE

  //const sprites = [] as THREE.Sprite[];
  const spheres = [] as THREE.Mesh[];

  /*
  for (const info of infosRaw) {
    for (const point of info.points) {
      const spriteTex = new THREE.TextureLoader().load(spriteImg);
      const spriteMat = new THREE.SpriteMaterial({ map: spriteTex, color: 0xffffff, fog: true });
      const sprite = new THREE.Sprite(spriteMat);

      sprite.position.set(point.location.x, point.location.z, point.location.y);
      sprite.position.normalize();
      sprite.position.multiplyScalar(20);
      sprite.userData = point;
      sprite.name = point.name;
      scene.add(sprite);
      sprites.push(sprite);

      //const sTex = new THREE.MeshBasicMaterial({ color: '#008800', transparent: true, opacity: 0 });
      //const sGeo = new THREE.SphereBufferGeometry(.4, 12, 8);
      //const sMesh = new THREE.Mesh(sGeo, sTex);
      //sMesh.position.set(point.location.x, point.location.z, point.location.y);
      //sMesh.position.normalize();
      //sMesh.position.multiplyScalar(18);
      //spheres.push(sMesh);
      //
      //scene.add(sMesh);
    }
  }
  */

  // RAYCASTER

  const raycaster = new THREE.Raycaster();

  // ANIMATION

  let pos = new THREE.Vector3();

  function onCast() {
    if (!currentSprites.length) return;
    if (!controls.isLocked) return;

    controls.getDirection(pos);
    raycaster.set(controls.getObject().position, pos);
    raycaster.setFromCamera(controls.getObject().position, camera);

    const intersections = raycaster.intersectObjects(currentSprites);

    const sprite = intersections.length
      ? intersections[0].object as THREE.Sprite
      : undefined;

    setCurrentHover(sprite);
    setCurrentState(sprite ? 'hover' : 'lock');
  }

  canvas.addEventListener('click', () => {
    if (currentState !== 'hover') return;
    if (!currentHover) return;

    const waypoint = currentHover.userData as WaypointInfo;

    if (waypoint.type !== 'camera') return; // TODO

    const camera = infos.find(i => i.name === waypoint.name);

    setCamera(camera);
  });

  const animate = function () {
    requestAnimationFrame(animate);

    onCast();

    renderer.render(scene, camera);
  };

  animate();
}