import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // gltf模型载入库
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import type { Mesh } from "three";
import type { RefObject } from "react";

export const initThreeBackground = (threeRef:RefObject<HTMLDivElement>) => {
  const { innerWidth, innerHeight } = window;
  // 创建场景
  const scene = new THREE.Scene();
  // 创建透视相机
  const camera = new THREE.PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 50, 300);
  // 添加坐标轴辅助器
  // const axesHelper = new THREE.AxesHelper(500);
  // scene.add(axesHelper);
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 抗锯齿
  });
  renderer.setSize(innerWidth, innerHeight);
  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  // 渲染函数
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  threeRef.current?.appendChild(renderer.domElement);
  render();

  // 监听画面的变化，更新渲染画面
  window.addEventListener("resize", () => {
    // 1.更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight; // 更新宽高比
    camera.updateProjectionMatrix(); // 更新投影矩阵
    // 2.更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // 监听鼠标移动，修改摄像机位置
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 400 - 200;
    const y = (e.clientY / window.innerHeight) * 200 - 100;

    const timeline = gsap.timeline();
    timeline.to(camera.position, {
      x: -x,
      y: y,
      duration: 0.5,
    });
  });

  // 创建星空背景
  const skyImg = new URL(
    "../../assets/imgs/three_background.jpg",
    import.meta.url
  ).href;
  const skyTexture = new THREE.TextureLoader().load(skyImg);
  skyTexture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = skyTexture;
  scene.environment = skyTexture;

  // 模型加载器
  const dracoLoader = new DRACOLoader(); // 解压
  dracoLoader.setDecoderPath("./draco/"); // 设置解压库路径
  const gltfLoader = new GLTFLoader(); // 模型载入
  gltfLoader.setDRACOLoader(dracoLoader);

  // 加载月亮
  gltfLoader.load("./model/moon.glb", (gltf) => {
    let moon = gltf.scene.children[0] as Mesh;
    for (let j = 0; j < 10; j++) {
      // 循环10次，创建10组月亮
      // 使用实例化 创建100个月亮
      let moonInstance = new THREE.InstancedMesh(
        moon.geometry,
        moon.material,
        100
      );
      for (let i = 0; i < 100; i++) {
        let x = Math.random() * 1000 - 500;
        let y = Math.random() * 1000 - 500;
        let z = Math.random() * 1000 - 500;

        let matrix = new THREE.Matrix4();
        // let size = Math.random() * 2.5;
        let size = Math.random() * 20 - 8;
        matrix.makeScale(size, size, size);
        matrix.makeTranslation(x, y, z);
        // matrix.setPosition(x, y, z)
        moonInstance.setMatrixAt(i, matrix);
      }

      gsap.to(moonInstance.position, {
        z: -1000,
        duration: Math.random() * 10 + 2, // 随机每一组月亮的速度
        ease: "linear",
        repeat: -1,
      });
      scene.add(moonInstance);
    }
  });

  // 创建地球
  const earthGeometry = new THREE.SphereGeometry(50, 32, 32);
  const earthImg = new URL(`../../assets/imgs/map.jpg`, import.meta.url)
    .href;
  let earthTexture = new THREE.TextureLoader().load(earthImg);
  let earthMaterial = new THREE.MeshBasicMaterial({
    map: earthTexture,
  });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);
  // 发光地球
  const lightEarthGeometry = new THREE.SphereGeometry(53, 32, 32);
  const lightImg = new URL(`../../assets/imgs/earth.jpg`, import.meta.url)
    .href;
  const lightTexture = new THREE.TextureLoader().load(lightImg);
  const lightEarthMaterial = new THREE.MeshBasicMaterial({
    map: lightTexture,
    alphaMap: lightTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });
  const lightEarth = new THREE.Mesh(lightEarthGeometry, lightEarthMaterial);
  scene.add(lightEarth);
  // 地球自转动画
  const earthAnimation = {
    angle: 0,
  };
  gsap.to(earthAnimation, {
    angle: Math.PI * 2,
    duration: 60,
    repeat: -1,
    ease: "linear",
    onUpdate: () => {
      earth.rotation.y = earthAnimation.angle
      lightEarth.rotation.y = earthAnimation.angle
    },
  });

  // 地球外发光精灵
  const spriteImg = new URL(`../../assets/imgs/glow.png`, import.meta.url)
    .href;
  const spriteTexture = new THREE.TextureLoader().load(spriteImg);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: spriteTexture,
    color: 0x4d76cf,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(spriteMaterial); // 精灵是一个总是面朝着摄像机的平面
  sprite.scale.set(155, 155, 0);
  scene.add(sprite);

  // 地球内发光精灵
  const innerGlowImg = new URL(
    `../../assets/imgs/innerGlow.png`,
    import.meta.url
  ).href;
  const spriteTexture1 = new THREE.TextureLoader().load(innerGlowImg);
  const spriteMaterial1 = new THREE.SpriteMaterial({
    map: spriteTexture1,
    color: 0x4d76cf,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite1 = new THREE.Sprite(spriteMaterial1); // 精灵是一个总是面朝着摄像机的平面
  sprite1.scale.set(128, 128, 0);
  scene.add(sprite1);

  // 实现光柱
  for (let i = 0; i < 30; i++) {
    const lightPillarTexture = new THREE.TextureLoader().load(
      new URL(`../../assets/imgs/light_column.png`, import.meta.url).href
    );
    const lightPillarGeometry = new THREE.PlaneGeometry(3, 20);
    const lightPillarMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: lightPillarTexture,
      alphaMap: lightPillarTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const lightPillar = new THREE.Mesh(lightPillarGeometry, lightPillarMaterial);
    lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2)); // 拷贝一个光柱，并且旋转90度，形成交叉

    // 创建波纹
    const circlePlane = new THREE.PlaneGeometry(6, 6);
    const circleTexture = new THREE.TextureLoader().load(
      new URL(`../../assets/imgs/label.png`, import.meta.url).href
    );
    const circleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: circleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const circleMesh = new THREE.Mesh(circlePlane, circleMaterial);
    circleMesh.rotation.x = -Math.PI / 2;
    circleMesh.position.set(0, -7, 0);
    // 波纹扩散动画
    gsap.to(circleMesh.scale, {
      duration: 1 + Math.random() * 0.5,
      x: 2,
      y: 2,
      z: 2,
      repeat: -1,
      delay: Math.random() * 0.5,
      yoyo: true,
      ease: "power2.inOut",
    });
    lightPillar.add(circleMesh);

    // 设置光柱的位置
    const lat = Math.random() * 180 - 90;
    const lon = Math.random() * 360 - 180;
    const position = lon2xyz(60, lon, lat);
    lightPillar.position.set(position.x, position.y, position.z);

    // 光柱从 010方向 旋转到 position向量的方向上
    lightPillar.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      position.clone().normalize()
    );
    earth.add(lightPillar);
  }

  // 绕地球运行的月球
  const RADIUS = 150; // 月球公转半径
  const moonTexture = new THREE.TextureLoader().load(
    new URL(`../../assets/imgs/moon.jpg`, import.meta.url).href
  );
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    emissive: 0xffffff,
    emissiveMap: moonTexture,
  });
  const moonGeometry = new THREE.SphereGeometry(5, 32, 32);
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(RADIUS, 0, 0);
  scene.add(moon);

  // 创建月球环
  const moonRingTexture = new THREE.TextureLoader().load(
    new URL(`../../assets/imgs/moon_ring.png`, import.meta.url).href
  );
  const moonRingMaterial = new THREE.MeshBasicMaterial({
    map: moonRingTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
    opacity: 0.5,
  });
  const moonRingGeometry = new THREE.RingGeometry(RADIUS - 5, RADIUS + 5, 64);
  const moonRing = new THREE.Mesh(moonRingGeometry, moonRingMaterial);
  moonRing.rotation.x = -Math.PI / 2;
  scene.add(moonRing);
  // 月球环绕动画
  const moonAnimation = {
    value: 0,
  };
  gsap.to(moonAnimation, {
    value: 1,
    duration: 10,
    repeat: -1,
    ease: "linear",
    onUpdate: () => {
      moon.position.x = RADIUS * Math.cos(moonAnimation.value * Math.PI * 2);
      moon.position.z = RADIUS * Math.sin(moonAnimation.value * Math.PI * 2);
      moon.rotation.y = moonAnimation.value * Math.PI * 8;
    },
  });
};

const lon2xyz = (R:number, longitude:number, latitude:number) => {
  let lon = (longitude * Math.PI) / 180; // 转弧度值
  const lat = (latitude * Math.PI) / 180; // 转弧度值
  lon = -lon; // js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  const x = R * Math.cos(lat) * Math.cos(lon);
  const y = R * Math.sin(lat);
  const z = R * Math.cos(lat) * Math.sin(lon);
  // 返回球面坐标
  return new THREE.Vector3(x, y, z);
};
