window.createMarkup = () => {
  const params = new URLSearchParams(window.location.search);

  const endTime = new Date(params.get("time")).valueOf();

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
