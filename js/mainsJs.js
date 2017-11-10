function initWorld() {

  /*  FOR DRAG
  var bodyId = document.getElementById('bodyId');
  bodyId.addEventListener('mousedown', function(){console.log('clicando');});
  bodyId.addEventListener('mouseup', function(){console.log('n-clicando');});
  */

  var algo;
  var width = window.innerWidth;
  var height = window.innerHeight;

  var camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({antialias:true});
  var scene = new THREE.Scene();
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);

  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);


  camera.position.z = 650;

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
  camera.lookAt(world.position);


  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.set(0, 300,1600);
  scene.add(pointLight);



  function render(){
    var clock = new THREE.Clock();

    renderer.render(scene, camera);

    world.rotation.y +=0.001;

    requestAnimationFrame(render);
    //world.rotation.y +=0.001;




  }

  render();

  function loadTexture(){
    var image = new THREE.ImageUtils.loadTexture('images/texture/earthTexture.jpg', {}, function(){
      renderer.render(scene);
    });
    return image;
  }
/*
  var isDragging = false;
  var previousMousePosition = {
      x: 0,
      y: 0
  };
  $(renderer.domElement).on('mousedown', function(e) {
      isDragging = true;
  })
  .on('mousemove', function(e) {
      //console.log(e);
      var deltaMove = {
          x: e.offsetX-previousMousePosition.x,
          y: e.offsetY-previousMousePosition.y
      };

      if(isDragging) {

          var deltaRotationQuaternion = new THREE.Quaternion()
              .setFromEuler(new THREE.Euler(
                  toRadians(deltaMove.y * 1),
                  toRadians(deltaMove.x * 1),
                  0,
                  'XYZ'
              ));

          world.quaternion.multiplyQuaternions(deltaRotationQuaternion, world.quaternion);
      }

      previousMousePosition = {
          x: e.offsetX,
          y: e.offsetY
      };
    });


    $(document).on('mouseup', function(e) {
      isDragging = false
    });

*/


}
