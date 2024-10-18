// defines
nx = 15
ny = 12
nc = 4 // must be even
stroke_fill = .5 // percentage of fill 
lop = [] // list of points
lol = [] // list of lines
tile = []
sw = 0

function scale_point(x, w, i, nx)
{
   x0 = i * (w / nx) 
   x  = x0 + x * w / nx
   return(x)
}

function random_color()
{
   return([random(0,255),random(0,255),random(0,255)])
}

function calc_global_coordinates(p)
{
   p.gx  = scale_point(p.x,  W, p.i, nx)
   p.gy  = scale_point(p.y,  H, p.j, ny)
   p.gdx = scale_point(p.dx, W, p.i, nx)
   p.gdy = scale_point(p.dy, H, p.j, ny)
}

function calc_bezier(p1,p2)
{
   if (p1.x == 0){
      p1.dy = p1.y
      if (p2.x == 0){
         p1.dx = abs(p1.y - p2.y)
      }
      else if (p2.x == 1){
         p1.dx = 0.5
      }
      else if (p2.y == 0){
         p1.dx = p2.x
      }
      else if (p2.y == 1){
         p1.dx = p2.x
      }
   }
   else if (p1.x == 1){
      p1.dy = p1.y
      if (p2.x == 0){
         p1.dx = 0.5
      }
      else if (p2.x == 1){
         p1.dx = 1-abs(p1.y-p2.y)
      }
      else if (p2.y == 0){
         p1.dx = p2.x
      }
      else if (p2.y == 1){
         p1.dx = p2.x
      }
   }
   else if (p1.y == 0){
      p1.dx = p1.x
      if (p2.x == 0){
         p1.dy = p2.y
      }
      else if (p2.x == 1){
         p1.dy = 0.5
      }
      else if (p2.y == 0){
         p1.dy = 1-abs(p1.x-p2.x)
      }
      else if (p2.y == 1){
         p1.dy = p2.y
      }
   }
   else if (p1.y == 1){
      p1.dx = p1.x
      if (p2.x == 0){
         p1.dy = p2.y
      }
      else if (p2.x == 1){
         p1.dy = p2.y
      }
      else if (p2.y == 0){
         p1.dy = 0.5
      }
      else if (p2.y == 1){
         p1.dy = abs(p1.x-p2.x)
      }
   }
}

function create_point(i,j,side){
   if (((side == 0) && (j != 0)) || 
       ((side == 1) && (i != (nx-1))) || 
       ((side == 2) && (j != (ny-1))) ||
       ((side == 3) && (i != 0)))
   {
      if (side == 0){ 
         // top
         this.x = (c + 1) / (nc + 1);
         this.y = 0
      }
      else if (side == 1){ 
         // right
         this.x = 1
         this.y = (c + 1) / (nc + 1);
      }
      else if (side == 2){ 
         // bottom
         this.x = (c + 1) / (nc + 1);
         this.y = 1
      }
      else if (side == 3){ 
         // left
         this.x = 0
         this.y = (c + 1) / (nc + 1);
      }
      this.i = i
      this.j = j
      this.side = side
   }
}


function lop_find_idx(i){
   found = NaN
   for (let j = 0; j < lop.length; j++) {
      if (lop[j].idx == i){
         found = j
      }
   }
   return(lop[found])
}


function setup() {
   createCanvas(windowWidth, windowHeight);
   W = windowWidth
   H = windowHeight
   // camera(0,1000,5000)
   // perspective(2 * Math.atan(500 / 2 / 800))
   // first create a list of all points with local coordinates
   let idx = 0
   for (let i = 0; i < (nx); i++){
      tile[i] = Array()
      for (let j = 0; j < (ny); j++){
         tile[i][j] = Array()
         for (side = 0; side < 4; side++){
            for (c = 0; c < nc; c++){
               a = new create_point(i,j,side)
               if (Object.keys(a).length != 0){
                  a.idx = idx
                  lop[idx] = a;
                  tile[i][j].push(idx)
                  idx = idx + 1
               }
            }
         }
      }
   }
   // connect point pairs within a tile
   for (let i = 0; i < (nx); i++){
      for (let j = 0; j < (ny); j++){
         while (tile[i][j].length > 0){
            r1 = int(random(tile[i][j].length))
            idx1 = tile[i][j][r1]
            tile[i][j].splice(r1,1)
            r2 = int(random(tile[i][j].length))
            idx2 = tile[i][j][r2]
            tile[i][j].splice(r2,1)
            lop[idx1].pair = idx2
            lop[idx2].pair = idx1
         }
      }
   }
   // calculate parameters for bezier curves
   for (p of lop){
      calc_bezier(p,lop[p.pair])
   }
   // calculate parameters for bezier curves
   for (p of lop){
      calc_global_coordinates(p)
      p.used = 0
   }
   // console.log(lop)
   // create list of layers: lol
   let points_in_layer =  new Array(1) 
   let i_layer = 0
   let i_point = 0
   pi = lop[0]
   pf = lop[0]
   let n = 0
   while (n < (0.5*lop.length)){
      // console.log(lol)
      // console.log(points_in_layer)
      n++
      pi.used = 1
      pj = lop_find_idx(pi.pair)
      pj.used = 1
      points_in_layer[i_point] = [pi.gx, pi.gy,pj.gx, pj.gy, pi.gdx, pi.gdy,pj.gdx, pj.gdy]
      i_point++
      for (p of lop){
         if ((abs(p.gx - pj.gx)<1) && (abs(p.gy - pj.gy)<1) && (p.idx != pj.idx)){
            pi = p
            // console.log("found")
         }
      }
      if (pf.idx == pi.idx){
         lol[i_layer] = points_in_layer
         points_in_layer = []
         i_point = 0
         i_layer++
         for (p of lop){
            if (p.used == 0){
               pi = p
               pf = pi
            }
         }
      }
   }
   // calculate z
   sw = stroke_fill * W / (nx * nc) 
   console.log(sw)
   for (i = 0; i<lol.length; i++){
      for (j=0; j< lol[i].length; j++){
         lol[i][j][8] = 10*sw*Math.random()
      }
      lol[i][lol[i].length-1][8] = lol[i][0][8]
   }
}


function draw() {
   // draw on screen
   // console.log(lol)
   background(255, 219, 88)
   background("#ff980F")
   background("#ffffff")
   for (p of lop){
      stroke(0,0,255);
      strokeWeight(sw)
      // point(p.gx,p.gy)
   }
   noFill()
   colorMode(HSB);
   for (i = 0; i<lol.length; i++){
      // b = 150 - i * 100 / lol.length
      hue2 = 127
      sat2 = 96
      hue2 = random(80,150)
      sat2 = random(100,250)
      for (j=0; j< lol[i].length; j++){
         for (k = 0; k<2; k++){
            if (k == 0)
            {
               strokeWeight(sw+1)
               stroke(0);
            }
            else
            {
               strokeWeight(sw)
               if (lol[i].length > 6){
                  b = int(25 + 200 * abs((j/lol[i].length) - 0.5))
               }
               else
               {
                  b = 50
               }
               stroke(hue2, sat2, b); 
            }
            bezier(lol[i][j][0],lol[i][j][1],lol[i][j][4],lol[i][j][5],lol[i][j][6],lol[i][j][7],lol[i][j][2],lol[i][j][3])
         }
      }
   }
   
   saveCanvas('tiles-'+new Date().toISOString()+'.png');
   noLoop()
}  
