function initWorld(){
  var algo;
  var width = window.innerWidth;
  var height = window.innerHeight;

  var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({antialias:true});
  var scene = new THREE.Scene();

  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  camera.position.y = height/2;
  camera.position.z = 500;

  var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.set(0,300,600);

	scene.add(pointLight);


  var loader = new THREE.JSONLoader();
  /*
  // IMPORTANDO DO BLENDER

  loader.load('json/sphere.json', function(geometry, materials){


    algo = new THREE.Mesh(geometry, materials);
    scene.add(algo);
    algo.scale.set(80,80,80);
    camera.lookAt(algo.position);
  });
  */

  var worldGeo = new THREE.SphereGeometry(100,100,100);
  var materials = new THREE.MeshLambertMaterial({map: loadTexture()});
  var world = new THREE.Mesh(worldGeo, materials);
  scene.add(world);
  world.position.y = 500;
  camera.lookAt(world.position);
  
  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.set(0, 1200,600);
  scene.add(pointLight);

  function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    
    world.rotation.y +=0.001;

    if (algo){
      algo.rotation.y +=0.01;
    }

  }

  render();

  function loadTexture(){
    var image = new THREE.ImageUtils.loadTexture('images/texture/earthTexture.jpg', {}, function(){
      renderer.render(scene);
    });
    return image;
  }


}
