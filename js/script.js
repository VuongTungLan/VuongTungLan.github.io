function drawFaceOverlay(color, flag) {
  const c = $('#faceOverlay').get(0)
  c.width = 320
  c.height = 600
  const context = c.getContext('2d')
  context.strokeStyle = "white"
  context.lineWidth = 3;
  context.beginPath();
  context.ellipse(c.width / 2, 3 *c.height /8  , c.width / 3, (c.width / 3) / 0.7, Math.PI , 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.stroke();
  context.beginPath();
  context.rect((c.width / 2) - ((c.width / 3)), (c.height / 2) +((c.width / 4) / 0.7) , 2 * c.width / 3, 2 * c.width / 3 * 0.6);
  context.fillStyle = color;
  context.fill();
  context.stroke();
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(c.width / 2 - c.width / 7, 3 *c.height /8)
  context.lineTo(c.width / 2 + c.width / 7, 3 *c.height /8)
  context.stroke();
  context.beginPath();
  context.moveTo(c.width / 2, 3 *c.height /8 + c.height /10)
  context.lineTo(c.width / 2, 3 *c.height /8 - c.height /10)
  context.stroke();

  if(flag) {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(c.width / 2 - (c.width / 3) / 0.8, 3 *c.height /8)
    context.lineTo(c.width / 2 - (c.width / 3) / 0.8 + 20, 3 *c.height /8 - 100)
    context.stroke();
    
    context.beginPath();
    context.moveTo(c.width / 2 - (c.width / 3) / 0.8, 3 *c.height /8)
    context.lineTo(c.width / 2 - (c.width / 3) / 0.8 + 20, 3 *c.height /8 + 100)
    context.stroke();
    
    context.beginPath();
    context.moveTo(c.width / 2 + (c.width / 3) / 0.8, 3 *c.height /8)
    context.lineTo(c.width / 2 + (c.width / 3) / 0.8 - 20, 3 *c.height /8 - 100)
    context.stroke();
    
    context.beginPath();
    context.moveTo(c.width / 2 + (c.width / 3) / 0.8, 3 *c.height /8)
    context.lineTo(c.width / 2 + (c.width / 3) / 0.8 - 20, 3 *c.height /8 + 100)
    context.stroke();
  }
  
}

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models')
]).then(run)

async function onPlay() {
  videoEl = $('#inputVideo').get(0)
  const canvas = $('#overlay').get(0)
  if (videoEl.paused || videoEl.ended) {
    return setTimeout(() => onPlay())
  }

  const result = await faceapi.detectAllFaces(videoEl, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks()
  const btnCapture = $('#capture')
  btnCapture.prop('disabled', true)
  btnCapture.css('color', 'white')
  drawFaceOverlay("rgba(255, 255, 255, 0)", false)
  
  if (result.length) {
    const dims = faceapi.matchDimensions(canvas, videoEl, true)
    faceapi.draw.drawFaceLandmarks(canvas, faceapi.resizeResults(result, dims))
    //console.log(result[0].landmarks._positions[27]._y + " " + result[0].landmarks._positions[28]._y + " " + result[0].landmarks._positions[29]._y + " " + result[0].landmarks._positions[30]._y + " " + result[0].landmarks._positions[33]._y);
    if(checkPositionX(canvas.width, result[0].landmarks._positions.slice(27, 31)) && checkPositionY(canvas.height, result[0].landmarks._positions.slice(27, 31))) {
      drawFaceOverlay("rgba(255, 255, 255, 0.5)", true)

   
    }
    // if(checkPositionY(canvas.height, result[0].landmarks._positions.slice(27, 31))) {
    //   console.log("y");
    // }
    
  }
  setTimeout(() => onPlay())
}

function checkPositionX(width, pos) {
  const cond = width / 2
  return pos.filter(function (val) {  
    return (val._x > cond - 10 && val._x < cond + 10)
  }).length > 3
}

function checkPositionY(height, pos) {
  const cond = 3 *height /8
  
  return pos.filter(function (val) {  
    return (val._y > cond - 40 && val._y < cond + 40)
  }).length > 3
}

async function run() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
    }
  })
  const videoEl = $('#inputVideo').get(0)
  videoEl.srcObject = stream
  drawFaceOverlay("rgba(255, 255, 255, 0)", false)
}
