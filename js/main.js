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
        "mass": 8.1,
        "radius": 20,
        "velocityX": 0,
        "velocityY": 0,
      },
      {
        "x": 1000,
        "y": 250,
        "mass": 0.01,
        "radius": 9,
        "velocityX": 0.125,
        "velocityY": 0,
      },

      {
        "x": 1000,
        "y": 750,
        "mass": 0.02,
        "radius": 9,
        "velocityX": -0.125,
        "velocityY": 0,
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
            const rhatx = rx / Math.sqrt(r2)
            const rhaty = ry / Math.sqrt(r2)

            // calculate acceleration
            const stepx = (g * ((ref.mass)) / r2) * rhatx
            const stepy = (g * ((ref.mass)) / r2) * rhaty
            const ax = (stepx * ref.mass)
            const ay = (stepy * ref.mass)

            // add up the acceleration to velocity
            planet.velocityX += ax
            planet.velocityY += ay

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

      for(let i=0; i< rcircles.length; i++) {
       document.getElementById(`p${i}`).innerHTML = `Planet ${i}: ${rcircles[i].translation.x}  ${rcircles[i].translation.y}`;

      }

      // TRAIL
      // every 60 frames places a circle
      if (frameCount % 60 == 0) {

        // create a for loop to push them into tarray
        for (let c = 0; c < rcircles.length; c++) {
          // variables of x and y
          let x = circles[c].velocityX
          let y = circles[c].velocityY

          // checks if any of these velocities is above 0.1 or below -0.1
          // if they are, push the circle into the array
          if (x > 0.1 || y > 0.1 || x < -0.1 || y < -0.1) {
            tarray.push(two.makeCircle(rcircles[c].translation.x, rcircles[c].translation.y, 3, 1))
          }
          // while tarray is longer than 10 * length objects
          while (tarray.length > 10 * circles.length) {
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