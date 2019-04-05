var markup = `
  <div id="container"></div>
  <svg style="position: absolute; bottom: 0; width: 100%" viewBox="0 0 580 400">
  <ellipse fill="rgba(0,0,0,0.7)" stroke="#000" stroke-width="1.5" cx="290" cy="450" id="svg_1" rx="398" ry="139.5" stroke-dasharray="none" fill-opacity="1"></ellipse>
  </svg>
  <div id="timer" style="font-family: 'Roboto Mono', monospace; position: absolute; bottom: 60px; width: 100%; text-align: center; font-size: 130px; color: white;">12:34</div>
  <div id="title" style="font-family: 'Roboto Mono', monospace; position: absolute; top: 60px; width: 100%; text-align: center; font-size: 70px; color: white;">Spring Hack Day Presentations<div>
  <div id="subtitle" style="display: none"></div>
`;

window.createMarkup = () => {
  document.body.innerHTML = markup;

  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';

  const font = document.createElement('link');
  font.setAttribute('href', 'https://fonts.googleapis.com/css?family=Roboto+Mono');
  font.setAttribute('ref', 'stylesheet');
  document.head.appendChild(font);

  ["three.js"].forEach(src => {
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("src", src);
    document.head.appendChild(scriptTag);
  });
  setTimeout(() => {
    ["GPUParticleSystem.js"].forEach(src => {
      const scriptTag = document.createElement("script");
      scriptTag.setAttribute("src", src);
      document.head.appendChild(scriptTag);
    });
  }, 200);

  setTimeout(() => {
    var camera, tick = 0,
    scene, renderer, clock = new THREE.Clock(),
    controls, container,
    options, spawnerOptions, particleSystem, spawner, timeScale;
  var stats;
  init();
  animate();
  function init() {
    //
    container = document.getElementById( 'container' );
    camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 100;
    scene = new THREE.Scene();
    // The GPU Particle system extends THREE.Object3D, and so you can use it
    // as you would any other scene graph component.	Particle positions will be
    // relative to the position of the particle system, but you will probably only need one
    // system for your whole scene
    particleSystem = new THREE.GPUParticleSystem( {
      maxParticles: 250000
    } );
    scene.add( particleSystem );
    // options passed during each spawned

    timeScale = 0.3;

    spawner = [
      {options: {
        position: new THREE.Vector3(),
      positionRandomness: .3,
      velocity: new THREE.Vector3(),
      velocityRandomness: .5,
      color: 0xc60029,
      colorRandomness: .2,
      turbulence: .5,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1
      }, spawnerOptions: {
        spawnRate: 5000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.33,
      timeScale

      }},
      {options: {
        position: new THREE.Vector3(),
      positionRandomness: .3,
      velocity: new THREE.Vector3(),
      velocityRandomness: .5,
      color: 0xc60029,
      colorRandomness: .2,
      turbulence: .5,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1
      }, spawnerOptions: {
        spawnRate: 5000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.33,
      timeScale
      }},
      {options: {
        position: new THREE.Vector3(),
      positionRandomness: .3,
      velocity: new THREE.Vector3(),
      velocityRandomness: .5,
      color: 0xc60029,
      colorRandomness: .2,
      turbulence: .5,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1
      }, spawnerOptions: {
        spawnRate: 5000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.33,
      timeScale
      }},
      {options: {
        position: new THREE.Vector3(),
      positionRandomness: .3,
      velocity: new THREE.Vector3(),
      velocityRandomness: .5,
      color: 0xc60029,
      colorRandomness: .2,
      turbulence: .5,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1
      }, spawnerOptions: {
        spawnRate: 5000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.33,
      timeScale
      }},
      {options: {
        position: new THREE.Vector3(),
      positionRandomness: .3,
      velocity: new THREE.Vector3(),
      velocityRandomness: .5,
      color: 0xc60029,
      colorRandomness: .2,
      turbulence: .5,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1
      }, spawnerOptions: {
        spawnRate: 5000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.33,
      timeScale
      }},
    ];
    //
    //
    //
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x111111, 1);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta() * timeScale;
    tick += delta;
    if ( tick < 0 ) tick = 0;
    if ( delta > 0 ) {
      spawner.forEach(({options, spawnerOptions}, idx) => {
        options.position.x = Math.sin( idx * 7 + tick * spawnerOptions.horizontalSpeed ) * 20;
        options.position.y = Math.sin( idx *11 + tick * spawnerOptions.verticalSpeed ) * 10;
        options.position.z = Math.sin( idx *13 + tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed ) * 5;
        for ( var x = 0; x < spawnerOptions.spawnRate * delta; x ++ ) {
          // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
          // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
          particleSystem.spawnParticle( options );
        }
      })
    }
    particleSystem.update( tick );
    render();
  }
  function render() {
    renderer.render( scene, camera );
  }

  }, 400);
};
