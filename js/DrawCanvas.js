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


