var markup = `
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">
  <div id="bg" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;" />
  <h1 style="font-family: 'Roboto Mono', monospace; text-align: center; color: white; font-size: 5em; margin-top: 200px" id="title"></h1>
  <h1 style="font-family: 'Roboto Mono', monospace; text-align: center; color: white; font-size: 3em; font-style: italic" id="subtitle"></h1>
  <h2 style="font-family: 'Roboto Mono', monospace; text-align: center; color: white; font-size: 2em;">Starting in <span id="timer">99:99</span></h2>
`

window.createMarkup = () => {
  {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/97/three.min.js';
    script.onload = () => {
      {
        const script = document.createElement('script');
        script.src = 'https://www.vantajs.com/dist/vanta.net.min.js';
        script.onload = () => {
          {
            const script = document.createElement('script');
            script.innerHTML = ` VANTA.NET({
              el: "#bg",
              color: 0x3fa4ff
            })`;

            document.head.appendChild(script);

            }
          }
        document.head.appendChild(script);
        }
    }
    document.head.appendChild(script);
  }
  document.body.innerHTML = markup;
}