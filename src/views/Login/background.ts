import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // gltf模型载入库
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from "gsap";

export const initThreeBackground = (threeRef) => {
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
  camera.position.set(0, 0, 10);
  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper);
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 抗锯齿
  });
  renderer.setSize(innerWidth, innerHeight);
  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  // 渲染函数
  const render = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  threeRef.current.appendChild(renderer.domElement);
  render();

  // 创建星空背景
  const skyImg = new URL(
    "../../assets/imgs/three_background.jpg",
    import.meta.url
  ).href;
  const skyTexture = new THREE.TextureLoader().load(skyImg);
  skyTexture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = skyTexture;
  scene.environment = skyTexture;

  // 添加灯光
  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);
  scene.add(light);
  let light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  light2.position.set(0, 0, -1);
  scene.add(light2);
  let light3 = new THREE.AmbientLight(0xffffff, 0.5);
  light3.position.set(-1, 1, 1);
  scene.add(light3);

  // 加载模型
  const dracoLoader = new DRACOLoader(); // 解压
  dracoLoader.setDecoderPath("/draco/"); // 设置解压库路径
  const gltfLoader = new GLTFLoader(); // 模型载入
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.load("/model/xz.glb", (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);
    model.position.x = 3;
    scene.add(model);

    window.addEventListener("mousemove", (e) => {
      // let x = (e.clientX / window.innerWidth) * 2 - 1;
      // let y = (e.clientY / window.innerHeight) * 2 - 1;

      // const timeline = gsap.timeline();
      // timeline.to(model.rotation, {
      //   x: y,
      //   y: x,
      //   duration: 0.5,
      // });
      let x = (e.clientX / window.innerWidth) * 2 - 1;
      let y = (e.clientY / window.innerHeight) * 2 - 1;

      const timeline = gsap.timeline();
      timeline.to(camera.position, {
        x: x,
        y: y,
        duration: 0.5,
      });
      // camera.lookAt(0, 0, 0)
    });
  });

  // 加载月亮
  gltfLoader.load("./model/moon.glb", (gltf) => {
    let moon = gltf.scene.children[0];
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

  // 监听画面的变化，更新渲染画面
  window.addEventListener("resize", () => {
    // 1.更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight; // 更新宽高比
    camera.updateProjectionMatrix(); // 更新投影矩阵
    // 2.更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};
