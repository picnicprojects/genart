let myColors = []

function setup() {
   W = windowWidth
   H = windowHeight
   createCanvas(W,H);
   background('white')
   strokeWeight(0)
   angleMode(DEGREES)
   myColors = [color('white'),color(245, 245, 220),color(184,115,51),color(196, 164, 132),color(183,65,14)]
}

function draw() 
{
   rand = 20
   background('white')
   fill(myColors[4])
   rect(0,0,500 + rand * 2,400 + rand * 2)
   
   for (i=0;i<2;i=i+1){
      for (j=0;j<2;j=j+1){
         console.log(i,j)
         x = i*(500+rand)
         y = j*(400+rand)
         fill(255,255,255)
         rect(x,y,rand,rand)
         fill(myColors[4])
         ellipse(i*500+rand,j*400+rand,2*rand,2*rand)
      }
   }
   frameRate(1)
   for (i = 0; i < 500; i=i+50)
   {
      for (j = 0; j < 400; j=j+50)
      {
         c = random(myColors)
         fill(c)
         rect(i+rand,j+rand,50,50)
         c = random(myColors)
         c.setAlpha(200)
         fill(c)
         r = int(random(0,3))
         start = r * 90
         end   = start + 90
         if (r == 0)
         {
            x = i - 50
            y = j - 50
         }
         else if (r == 1)
         {
            x = i
            y = j - 50
         }
         else if (r == 2)
         {
            x = i
            y = j
         }
         else if (r == 3)
         {
            x = i - 50
            y = j
         }
            
         arc(x+50+rand,y+50+rand,100,100,start,end)
         console.log(rand)
      }
   }
   noLoop()
   saveCanvas('fifties-'+new Date().toISOString()+'.png');
}
