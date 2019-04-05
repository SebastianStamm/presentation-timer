var markup = `
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">
  <div id="bg" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;" />
  <h1 style="font-family: 'Roboto Mono', monospace; text-align: center; color: white; font-size: 5em; margin-top: 200px;" id="title">Spring Hack Day Presentations</h1>
  <h1 style="font-family: 'Roboto Mono', monospace; text-align: center; color: white; font-size: 3em;" id="subtitle"><i>Optional Subtitle not available</i></h1>
  <h2 style="font-family: 'Roboto Mono', monospace; text-align: center; color: white; font-size: 2em;">Starting in <span id="timer">99:99</span></h2>
`

window.createMarkup = (editable) => {
  document.body.innerHTML = markup;
  {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/92/three.min.js';

    document.head.appendChild(script);
    }
  {
  const script = document.createElement('script');
  script.src = 'https://www.vantajs.com/dist/vanta.birds.min.js';
  script.onload = () => {
    {
      const script = document.createElement('script');
      script.innerHTML = ` VANTA.BIRDS({
        el: "#bg",
        color: 0x3fa4ff
      })`;

      document.head.appendChild(script);

      }
  }
  document.head.appendChild(script);
  }



  if(editable) {
    title.contentEditable = true;
    subtitle.contentEditable = true;
    timer.contentEditable = true;
  }


}