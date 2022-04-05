"use strict";

  /*  var two = new Two({
      fullscreen: true,
      autostart: true
    }).appendTo(document.body);
    two.renderer.domElement.style.background = 'rgb(50, 50, 50)';
    two.renderer.domElement.style.position = 'absolute';
*/

    // planets
    // put as many as you'd like!(costs performance exponentially)
    let circles = [{
        "x": 1000,
        "y": 500,
        "mass": 20,
        "radius": 20,
        "velocityX": -0.2,
        "velocityY": -0.2,
      },
      {
        "x": 1000,
        "y": 250,
        "mass": 20,
        "radius": 20,
        "velocityX": 0.2,
        "velocityY": 0.2,
      },

 
    ]

   
    // global variables
    const rcircles = []
    let tarray = []


    // You can alter these variables for different behaviours
    const g = 1 // gravitational constant


    // for loop for renderer objects
    for (let i = 0; i < circles.length; i++) {
      rcircles.push(two.makeCircle(circles[i].x, circles[i].y, circles[i].radius, 1))
    }

    // update the screen
    function updatecircle() {
      // create 2 for loops for planet AND reference
      for (let i = 0; i < circles.length; i++) {
        for (let j = 0; j < circles.length; j++) {

          // variables
          const planet = circles[i]
          const planetren = rcircles[i]
          const ref = circles[j]
          const refren = rcircles[j]

          // checks if whether the planet id is the same as reference
          if (rcircles[i].id != rcircles[j].id) {

            // get distance from reference to planet

            const rx = refren.translation.x - planetren.translation.x
            const ry = refren.translation.y - planetren.translation.y
            // get distance from planet to reference

            const rx2 = planetren.translation.x - refren.translation.x
            const ry2 = planetren.translation.y - refren.translation.y
            
            // get distance2 between centers of mass
            var r2 = Math.pow(rx2 - rx, 2) + Math.pow(ry2 - ry, 2);

            // calculate unit vectors
            const rhatx = (rx / Math.sqrt(r2))
            const rhaty = (ry / Math.sqrt(r2))

            // calculate the force exerted on the planet
            const F = g * planet.mass * ref.mass / r2
            // get the components of the force
            const Fx = F * rhatx
            const Fy = F * rhaty
            // apply the force to acceleration
            planet.velocityX += Fx 
            planet.velocityY += Fy 


        

            // log the unit vector of x
            console.log(rhatx)

            // apply velocity to the location of planet
            planetren.translation.x += planet.velocityX
            planetren.translation.y += planet.velocityY

          } else continue; // if the id is the same, continue to other reference
        }
      }
    }

    let completelist= document.getElementById("list");
    console.log(rcircles)
      for(let i=0; i< rcircles.length; i++){
      completelist.innerHTML += `<a id="p${i}">Item ` + rcircles[i].translation.x + `</a>`;
      
      }


    two.bind('update', function (frameCount, timeDelta) {
      if (frameCount % 10 == 0) {
      for(let i=0; i< rcircles.length; i++) {
       document.getElementById(`p${i}`).innerHTML = `Planet ${i}: <br>  
       X: ${rcircles[i].translation.x.toFixed(2)} <br> 
       Y: ${rcircles[i].translation.y.toFixed(2)} <br>
       X Speed/s: ${(circles[i].velocityX * 1000 / timeDelta).toFixed(2)} <br> 
       Y Speed/s: ${(circles[i].velocityY * 1000 / timeDelta).toFixed(2)}`;

      }
    }



    
      // TRAIL
      // every 60 frames places a circle
     

       // create a trail for the planets using two.makeCurve()
        // the trail is a line between the planet and the previous frame
        // the trail is made up of two points, the current location and the previous location
        // the trail is created using the two.makeCurve() function
        if (frameCount % 2 == 0) {
        for (let c = 0; c < rcircles.length; c++) {
        let trail = two.makeCurve(rcircles[c].translation.x, rcircles[c].translation.y, rcircles[c].translation.x - circles[c].velocityX, rcircles[c].translation.y - circles[c].velocityY)
        // set the color of the trail
        trail.linewidth = 5
        //increase the size of the trail
        trail.scale = 2


        trail.stroke = '#2ff3ff'
        trail.closed = true
        
        trail.noFill()
        tarray.push(trail)
      
        


        while (tarray.length > 100 * circles.length) {
          // remove the last element from the array
          let last = tarray.shift()
          console.log(last)
          last.remove()

        }
      }
    }
        
    
     
        

       

      
      // calls the function to update the frame
      updatecircle()
    });