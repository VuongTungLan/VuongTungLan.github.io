const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detection = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detection, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    if (resizedDetections.length > 0) {
      const box = resizedDetections.detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: 'Lan' })
      // faceapi.draw.drawDetections(canvas, resizedDetections)
      // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

      drawBox.draw(canvas)
    }

  }, 100)
})
