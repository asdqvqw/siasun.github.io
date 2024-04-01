
gltfLoader.load(
    'https://asdqvqw.github.io/whwtest.github.io/kivastation.gltf',
    (gltf) => {
      let huojiacar = gltf.scene;
      // 设置模型的位置、缩放等属性
      huojiacar.position.set(9.25, 0, 1.7);
      huojiacar.scale.set(1.5, 0.8, 0.8);
  
      // huojiacar.rotation.set(0, THREE.MathUtils.degToRad(90), 0);
      scene.add(huojiacar);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );
  
  gltfLoader.load(
    'https://asdqvqw.github.io/whwtest.github.io/kivastation.gltf',
    (gltf) => {
      let huojiacar2 = gltf.scene;
      // 设置模型的位置、缩放等属性
      huojiacar2.position.set(9.1, 0, -3.5);
      huojiacar2.scale.set(1.5, 0.8, 0.8);
  
      huojiacar2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
      scene.add(huojiacar2);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );
  