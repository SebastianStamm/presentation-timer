window.createMarkup = () => {
  const markup = `
  <img src="camunda.svg" id="logo" style="transition: transform 1s, margin-top 1s; position: absolute; z-index:-1; width: 30vw; margin-left: 35vw; margin-top: 100px;" />
  <div id="container" style="transition: transform 2s;"></div>
  <svg style="transition: bottom 2s; position: absolute; bottom: 0; width: 100%" viewBox="0 0 580 400">
  <ellipse fill="rgba(0,0,0,0.7)" stroke="#000" stroke-width="1.5" cx="290" cy="450" id="svg_1" rx="398" ry="139.5" stroke-dasharray="none" fill-opacity="1"></ellipse>
  </svg>
  <div id="timer" style="transition: bottom 2s; font-family: 'Roboto Mono', monospace; position: absolute; bottom: 60px; width: 100%; text-align: center; font-size: 130px; color: white;"></div>
  <div id="title" style="font-family: 'Roboto Mono', monospace; position: absolute; top: 60px; width: 100%; text-align: center; font-size: 70px; color: white;">Spring Hack Day Presentations<div>
  <div id="subtitle" style="display: none"></div>
`;

  var audio = new Audio("start.mp3");
  const endTime = new Date("2019-04-05T16:00:00.000+0200").valueOf();

  document.body.innerHTML = markup;

  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.style.backgroundColor = "#111111";

  document.getElementById("logo").style.opacity = "0.1";

  const font = document.createElement("link");
  font.setAttribute(
    "href",
    "https://fonts.googleapis.com/css?family=Roboto+Mono"
  );
  font.setAttribute("ref", "stylesheet");
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

  let animationStarted = false;
  let animationProgress = 0;
  setTimeout(() => {
    var camera,
      tick = 0,
      scene,
      renderer,
      clock = new THREE.Clock(),
      controls,
      container,
      options,
      spawnerOptions,
      particleSystem,
      spawner,
      timeScale;
    var stats;
    init();
    animate();
    function init() {
      //
      container = document.getElementById("container");
      camera = new THREE.PerspectiveCamera(
        28,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 100;
      scene = new THREE.Scene();
      // The GPU Particle system extends THREE.Object3D, and so you can use it
      // as you would any other scene graph component.	Particle positions will be
      // relative to the position of the particle system, but you will probably only need one
      // system for your whole scene
      particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 250000
      });
      scene.add(particleSystem);
      // options passed during each spawned

      timeScale = 0.1;

      spawner = [];
      for (let i = 0; i < 10; i++) {
        spawner.push({
          options: {
            position: new THREE.Vector3(),
            positionRandomness: 0.3,
            velocity: new THREE.Vector3(),
            velocityRandomness: 0.5,
            color: 0xc60029,
            colorRandomness: 0.2,
            turbulence: 0.5,
            lifetime: 2,
            size: 5 + 5 * Math.random(),
            sizeRandomness: 1
          },
          spawnerOptions: {
            spawnRate: 15000,
            horizontalSpeed: 0.5 + 2.5 * Math.random(),
            verticalSpeed: 0.5 + 2.1 * Math.random(),
            timeScale
          }
        });
      }
      //
      //
      //
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setClearColor(0x111111, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
      //
      window.addEventListener("resize", onWindowResize, false);
    }
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
      requestAnimationFrame(animate);
      const now = Date.now();
      if (endTime - now > 0) {
        // render time after
        timer.textContent = convertRemaining(endTime - now);
      } else {
        timer.textContent = "00:00";
      }

      animationProgression(endTime - now);

      var delta = clock.getDelta() * timeScale;
      tick += delta;
      if (tick < 0) tick = 0;
      if (delta > 0) {
        spawner.forEach(({ options, spawnerOptions }, idx) => {
          options.position.x =
            Math.sin(idx * 479 + tick * spawnerOptions.horizontalSpeed) * 60;
          options.position.y =
            Math.sin(idx * 311 + tick * spawnerOptions.verticalSpeed) * 30;
          options.position.z =
            Math.sin(
              idx * 83 +
                tick * spawnerOptions.horizontalSpeed +
                spawnerOptions.verticalSpeed
            ) * 15;
          for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
            // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
            // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
            particleSystem.spawnParticle(options);
          }
        });
      }
      particleSystem.update(tick);
      render();
    }
    function render() {
      renderer.render(scene, camera);
    }

    let oscillator, audioCtx;
    function animationProgression(left) {
      if (left < 60000 && left >= 0) {
        timeScale = 0.1 + ((60000 - left) / 60000) * 0.9;
        spawner.forEach(spawner => {
          spawner.spawnerOptions.timeScale = timeScale;
        });
        document.getElementById("logo").style.opacity =
          "" + (0.1 + ((60000 - left) / 60000) * 0.9);
      }
      if (left < 4000 && animationProgress === 0) {
        animationProgress++;
        // create web audio api context
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (left < 3000 && animationProgress === 1) {
        animationProgress++;
        oscillator = audioCtx.createOscillator();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
      }
      if (left < 2800 && animationProgress === 2) {
        animationProgress++;
        oscillator.stop();
      }
      if (left < 2000 && animationProgress === 3) {
        animationProgress++;
        oscillator = audioCtx.createOscillator();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
      }
      if (left < 1800 && animationProgress === 4) {
        animationProgress++;
        oscillator.stop();
      }
      if (left < 1000 && animationProgress === 5) {
        animationProgress++;
        oscillator = audioCtx.createOscillator();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
      }
      if (left < 800 && animationProgress === 6) {
        animationProgress++;
        oscillator.stop();
      }

      if (left < -2000) {
        timeScale = 0.4;
      }
      if (left <= 0 && !animationStarted) {
        animationStarted = true;
        startAnimation();
      }
    }

    async function startAnimation() {
      audio.play();
      document.querySelector("svg").style.bottom = "-300px";
      document.querySelector("#timer").style.bottom = "-300px";
      document.querySelector("#logo").style.transform = "scale(1.3)";
      document.querySelector("#logo").style.marginTop = "200px";
      document.querySelector("#container").style.transform = "scale(10)";
    }
  }, 400);

  function convertRemaining(milliseconds) {
    const minutes = Math.floor(milliseconds / 60 / 1000);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const ms = Math.floor((milliseconds % 1000) / 10);
    if (minutes) {
      return leftPad(minutes) + ":" + leftPad(seconds);
    } else {
      return leftPad(seconds) + ":" + leftPad(ms);
    }
  }
  function leftPad(number) {
    return number.toString().length < 2 ? "0" + number : number;
  }
};
