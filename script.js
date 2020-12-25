// Put event listeners into place
        window.addEventListener("DOMContentLoaded", function() {
            // Grab elements, create settings, etc.
            var canvas = document.getElementById("canvas"),
                context = canvas.getContext("2d"),
                // we don't need to append the video to the document
                video = document.createElement("video"),
                videoObj = 
                navigator.mediaDevices.getUserMedia || navigator.mediaDevices.mozGetUserMedia ? // our browser is up to date with specs ?
                { 
                video: {
					width: { min: 1280,  max: 1280 },
       				height: { min: 720,  max: 720 },

                    },
                    audio:true
                }:
				{
                    video: {
                        mandatory: {
                            minWidth: 1280,
                            minHeight: 720,
                            maxWidth: 1280,
                            maxHeight: 720
                        }
                    },
                    audio:true
                };
                errBack = function(error) {
                    console.log("Video capture error: ", error.code); 
                };
            // create a crop object that will be calculated on load of the video
			var crop;
			// create a variable that will enable us to stop the loop.
			var raf;
			
			navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mozGetUserMedia;
            // Put video listeners into place
            navigator.mediaDevices.getUserMedia(videoObj, function(stream) {
                    video.src = URL.createObjectURL(stream);
                    video.onplaying = function(){
						var croppedWidth = ( Math.min(video.videoHeight, canvas.height) / Math.max(video.videoHeight,canvas.height)) * Math.min(video.videoWidth, canvas.width),
						croppedX = ( video.videoWidth - croppedWidth) / 2;
						crop = {w:croppedWidth, h:video.videoHeight, x:croppedX, y:0};
						// call our loop only when the video is playing
						raf = requestAnimationFrame(loop);
						};
					video.onpause = function(){
						// stop the loop
						cancelAnimationFrame(raf);
						}
					video.play();
                }, errBack);

            function loop(){
               context.drawImage(video, crop.x, crop.y, crop.w, crop.h, 0, 0, canvas.width, canvas.height);
               raf = requestAnimationFrame(loop);
            }
		// now that our video is drawn correctly, we can do...
		context.translate(canvas.width, 0);
		context.scale(-1,1);

        }, false);
