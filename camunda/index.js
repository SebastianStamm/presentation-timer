window.createMarkup = () => {
  const markup = `
  <div id="timer" style="position: absolute; top: 720px; width: 100%; text-align: center; font-size: 54px; color: white;"></div>
  <div id="title" style="position: absolute; top: 470px; font-size: 70px; font-weight: bold; color: white; left: 75px;"></div>
  <div id="subtitle" style="position: absolute; top: 570px; font-size: 42px; color: white; left: 75px;"></div>
`;

  const params = new URLSearchParams(window.location.search);

  const endTime = new Date(params.get("time")).valueOf();

  document.body.innerHTML = markup;

  document.querySelector("#title").textContent = params.get("title");
  document.querySelector("#subtitle").textContent = params.get("subtitle");

  function animate() {
    const now = Date.now();
    if (endTime - now > 0) {
      // render time after
      timer.textContent = convertRemaining(endTime - now);
    } else {
      timer.textContent = "00:00";
    }
    requestAnimationFrame(animate);
  }
  function convertRemaining(milliseconds) {
    const minutes = Math.floor(milliseconds / 60 / 1000);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    return leftPad(minutes) + ":" + leftPad(seconds);
  }
  function leftPad(number) {
    return number.toString().length < 2 ? "0" + number : number;
  }
  requestAnimationFrame(animate);
};
