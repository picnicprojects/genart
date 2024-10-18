// kees@T460:~/d/projects/p5/20240605_chuckclose$ python3 -m http.server

let img
let pencilWidth = 1
let nWobble = 15 
let sizeSquare = 20
let ix = 0
let iy = 0
let angle = 0
// nWobble = 0

function preload() {
   img = loadImage('obama.jpg')
}

function setup() {
   img.filter(GRAY)
   img.filter(DILATE)
   img.resize(100,0);
   // img.resize(50,0);
   W = img.width * sizeSquare
   H = img.height * sizeSquare
   createCanvas(W,H);
   angleMode(DEGREES)
   noFill()
   stroke(0)
   strokeWeight(pencilWidth);
}

function myLine(x0,y0,x1,y1){
   let g = 0
   d = dist(x0, y0, x1, y1);
   // n = int(max(0,d * nWobble / W))
   n = nWobble
   a = atan((y1-y0)/(x1-x0))
   r = 0.002 * d // randomness
   if (nWobble == 0){
      line(x0,y0,x1,y1)
   }
   else{
      beginShape()
      curveVertex(x0,y0)
      for (let i=0;i<=n;i++){
         g = random(-r,r)
         xo = x0 + (x1-x0) * i / n
         yo = y0 + (y1-y0) * i / n
         xg = xo + g * sin(-a)
         yg = yo + g * cos(-a)
         curveVertex(xg,yg)
      }
      curveVertex(x1,y1)
      endShape()
   }
}

function myRect(x,y,w,h,g,a){
   // g is a greyvalue between 0 and 1
   // angle between -89 and 89
   let nx0 = int((1-g) * w / pencilWidth) 
   
   dl = w / nx0
   dx = dl / cos(a)
   w2 = w + h * tan(a)
   nx = w2 / dx
   for (let i=0;i<nx;i++){
      if (a < 90){
         x0 = (i+0.5)*w2/nx - h * tan(a)
      }
      else{
         x0 = (i+0.5)*w2/nx
      }
      y0 = 0
      if (x0 < 0){
         y0 = -x0 / tan(a)
         x0 = 0
      }
      x1 = (i+0.5)*w2/nx 
      y1 = h
      if (x1 > w){
         x1 = w2 - h * tan(a)
         y1 = (w2-(i+0.5)*w2/nx) / tan(a)
      }
      border = random(-1,3)
      stroke(random(int(10,250)))
      if (x0 < w){ // x0 can become larger than w for large angles due to rounding errors
         if (angle > 0){
            myLine(x+x0+border,y+y0+border,x+x1-border,y+y1-border)
         }
         else{
            myLine(x+w-x0+border,y+y0+border,x+w-x1,y+y1)
         }
      }
   }


function myRect_old(x,y,w,h,g){
   // g is a greyvalue between 0 and 1
   let nx = int((1-g) * w / pencilWidth)
   stroke(0)
   for (let i=0;i<nx;i++){
      myLine(x+(i+0.5)*w/nx,y,x+(i+0.5)*w/nx,y+h)
   }
   stroke("#00efef")
   rect(x,y,w,h)
}

function draw() {
   for (let ix=0;ix<img.width;ix++){
      myRect(ix*sizeSquare,iy*sizeSquare,sizeSquare,sizeSquare,img.get(ix,iy)[0]/256, random(-30,30))
   }
   if (iy<img.height){
      iy++
   }
   else{
      noLoop()
   }
}
