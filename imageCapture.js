let stream = null

let photo_button = document.querySelector('#capturePhotoButton')

photo_button.addEventListener('click', async function () {
  let containerDiv = document.getElementById('container')
  let optionsDiv = document.getElementById('mainMenu')
  let captureMenuDiv = document.getElementById('captureMenu')
  let imageCaptureDiv = document.getElementById('imagecapture')
  let canvasArea = document.getElementById('videoCapture')
  let videoArea = document.getElementById('video')
  let control = ''

  containerDiv.style.visibility = 'hidden'
  optionsDiv.style.visibility = 'hidden'

  imageCaptureDiv.style.visibility = 'visible'
  captureMenuDiv.style.visibility = 'visible'


  const videoConstraints = {}

  let maxDimensions = getMaxHeightWidth()
  videoConstraints.facingMode = 'environment'

  if (maxDimensions.height > maxDimensions.width) {
    control = maxDimensions.height / 4

    videoConstraints.height = control * 4 
    videoConstraints.width = control * 3 
  } else { 
    control = maxDimensions.width / 4

    videoConstraints.height = control * 3 
    videoConstraints.width = control * 4 

  }

  videoArea.height = maxDimensions.height
  videoArea.width = maxDimensions.width

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: false,
    })
  } catch (error) {
    alert(error.message)
    return
  }

  video.srcObject = stream

  let { width, height } = stream.getTracks()[0].getSettings()

  canvasArea.height = height
  canvasArea.width = width
})

function capturePhoto() {
  let videoCaptureCanvas = document.querySelector('#videoCapture')
  videoCaptureCanvas
    .getContext('2d')
    .drawImage(video, 0, 0, videoCaptureCanvas.width, videoCaptureCanvas.height)

  let imageDataUrl = videoCaptureCanvas.toDataURL('image/png')
  exitCapturePhoto()

  return imageDataUrl
}

function exitCapturePhoto() {
  let containerDiv = document.getElementById('container')
  let optionsDiv = document.getElementById('mainMenu')
  let captureMenuDiv = document.getElementById('captureMenu')
  let imageCaptureDiv = document.getElementById('imagecapture')

  containerDiv.style.visibility = 'visible'
  optionsDiv.style.visibility = 'visible'

  imageCaptureDiv.style.visibility = 'hidden'
  captureMenuDiv.style.visibility = 'hidden'


  stopCamera()
}

function stopCamera() {
  let streamList = stream.getTracks()

  for (let track = 0; track < streamList.length; track++) {
    streamList[track].stop()
  }
}
