function stars() {
   stroke('white')
   for (i = 0; i< 1000; i++){
      point(random(0,windowWidth),random(0,windowHeight))
   }
}
function setup() {
   createCanvas(windowWidth, windowHeight);
   angleMode(DEGREES)
   colorMode(HSB,100,100,100)
   background('blue')
   background('black')
   stars()
   nx = 20
   ny = 20
   cHue0     = 50
   cHue0     = 25
   cHue0     = 50
   // cBriSun   = 80
   cBriShade = 20
   cSatSun   = 50
   cSatShade = 20
   cHueDelta = 100
   cSatDelta = 50
   cBriDelta = 100
   strokeWeight(.1)
   // stroke('#dddddd')
   // stroke('#000000')
   angleHor = 30
   angleVer = 10
   randomSeed(1)
   for(j=0;j<ny;j++){
      for(i=0;i<nx;i++){
         stroke('black')
         cHue = random(cHue0-cHueDelta/2,cHue0+cHueDelta/2)
         cSat = cSatShade + j * cSatDelta/ny
         cBri = cBriShade + j * cBriDelta/ny
         // stroke(cHue,0,cBri)
         t = int(random(0,3)) // 0=flat, 1=point left, 2=point right, 3=point both
         dx = windowWidth / nx / 2
         dy = dx * sin(angleVer)
         dp = random(0.25*dx, 2*dx)
         if ((j/2) == int(j/2)){
            x0 = (i+0.5) * windowWidth / nx
         }
         else
         {
            x0 = (i) * windowWidth / nx
         }
         y0 = j * windowHeight / ny + dy + random(windowHeight * 0.3)
         y0 = j * windowHeight / ny - 2*dy  + random(windowHeight * 0.3)
         // cSat = random(cSatShade - cSatDelta/2,cSatShade + cSatDelta/2)
         // cBri = random(cBriShade - cBriDelta/2,cBriShade + cBriDelta/2)
         x1 = x0-dx
         x2 = x0
         x3 = x0+dx
         y1 = y0-dy
         y2 = y0-2*dy
         y3 = y0-dy
         xpl = x0 - 0.5*dx
         xpr = x0 + 0.5*dx
         yp = y0 - dp
         
         // left
         // cSat = random(cSatShade - cSatDelta/2,cSatShade + cSatDelta/2)
         // cBri = random(cBriShade - cBriDelta/2,cBriShade + cBriDelta/2)
         fill(cHue,cSat,cBri)
         beginShape()
         vertex(x0,y0)
         if (t==1){
            vertex(xpl,yp)
         }
         vertex(x1,y1)
         vertex(x1,windowHeight)
         vertex(x0,windowHeight)
         vertex(x0,y0)
         endShape()
         // right
         // cSat = random(cSatSun - cSatDelta/2,cSatSun + cSatDelta/2)
         // cBri = random(cBriSun - cBriDelta/2,cBriSun + cBriDelta/2)
         fill(cHue,cSat,cBri)
         beginShape()
         vertex(x0,y0)
         if (t==2){
            vertex(xpr,yp)
         }
         vertex(x3,y3)
         vertex(x3,windowHeight)
         vertex(x0,windowHeight)
         vertex(x0,y0)
         endShape()
         // top
         fill(cHue,cSat,cBri)
         beginShape()
         if (t==0){
            vertex(x0,y0)
            vertex(x1,y1)
            vertex(x2,y2)
            vertex(x3,y3)
            vertex(x0,y0)
         }
         else if (t==1){
            vertex(x0,y0)
            vertex(xpl,yp)
            vertex(xpl+dx,y0-dy-dp)
            vertex(x3,y3)
            vertex(x0,y0)
         }
         else if (t==2){
            vertex(x0,y0)
            vertex(x1,y1)
            vertex(xpr-dx,y0-dy-dp)
            vertex(xpr,yp)
            vertex(x0,y0)
         }
         else if (t==3){
            vertex(x0,y0)
            vertex(x1,y1)
            vertex(x2,y2)
            vertex(x3,y3)
            vertex(x0,y0)
         }
         endShape()
         // noStroke()
         nwx = int(random(2,5))
         ar = random(0.5,2)
         for (lr = -1; lr < 2; lr=lr+2){
            for (iwx = 0; iwx < nwx; iwx++){
               iwy = 0
               yw0 = 100
               while (yw0 < windowHeight){
                  dxw = dx / (nwx+0.25)
                  dyw = dxw * ar
                  xw0 = x0 + lr * (iwx+0.25)*dxw
                  xw1 = x0 + lr * (iwx+1)*dxw
                  xw2 = xw1
                  xw3 = xw0
                  // yw0 = y0 + (2*iwy+0.5)*0.5*dxw + -lr * dy * (xw0-x0) / dx 
                  // yw1 = y0 + (2*iwy+0.5)*0.5*dxw + -lr * dy * (xw1-x0) / dx 
                  yw0 = y0 + (iwy+0.25)*dyw + -lr * dy * (xw0-x0) / dx 
                  yw1 = y0 + (iwy+0.25)*dyw + -lr * dy * (xw1-x0) / dx 
                  yw2 = yw1 + dyw * 0.75
                  yw3 = yw0 + dyw * 0.75
                  iwy++
                  if (random(0,1) > 0.5){
                     fill(20, cSat, cBri)
                  }
                  else{
                     noFill()
                  }
                  beginShape()
                  vertex(xw0 , yw0)
                  vertex(xw1 , yw1)
                  vertex(xw2 , yw2)
                  vertex(xw3 , yw3)
                  vertex(xw0 , yw0)
                  endShape()
               }
            }
         }
      }
   }
   saveCanvas('houses2D-'+new Date().toISOString()+'.png');
   noLoop()
}


function draw() {
}
