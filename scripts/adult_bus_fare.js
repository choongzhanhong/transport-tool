function adultBusFare () {
  var distanceInKM = prompt("Please enter the distance you want to travel (in kilometer) ")
  var modeOfTravel = prompt("Will you be travelling by 'bus' or 'train'? ")
  var distanceInMeter = distanceInKM * 1000
  
  var payThrough = prompt("Are you traveling using 'card' or 'cash' ")
  if (payThrough.toLowerCase() === "card") {
    var minDistance = 3200
    var minMoney = 0.99
    var fareChangeAfterMeter = 1000
    var i = 1;
    var n = 0;
    if (distanceInMeter <= minDistance) {
      pay = minMoney
    } 
    else if ((3300 <= distanceInMeter) && (distanceInMeter <= 6200)) {
      while (i < 4) {
        if(distanceInMeter <= minDistance + (i * fareChangeAfterMeter)){
          pay = minMoney + (0.1) + (n*(0.1))
          break
        }
        i++; n++;
      }
    }
    else if ((6300 <= distanceInMeter) && (distanceInMeter <= 7200)){
      pay = minMoney + 0.39
    }
    else if ((7300 <= distanceInMeter) && (distanceInMeter <= 9200)){
      while (i < 3) {
        if(distanceInMeter <= 7200 + (i * fareChangeAfterMeter)){
          pay = minMoney + (0.46) + (n*(0.07))
          break
        }
        i++; n++;
      }
    }
    else if ((9300 <= distanceInMeter) && (distanceInMeter <= 14200)){
      while (i < 6) {
        if(distanceInMeter <= 9200 + (i * fareChangeAfterMeter)){
          pay = minMoney + (0.57) + (n*(0.04))
          break
        }
        i++; n++;
      }
    }
    else if ((14300 <= distanceInMeter) && (distanceInMeter <= 15200)) {
      pay = minMoney + 0.78
    }
    else if ((15300 <= distanceInMeter) && (distanceInMeter <= 19200)){
      while (i < 5) {
        if(distanceInMeter <= 15200 + (i * fareChangeAfterMeter)){
          pay = minMoney + (0.82) + (n*(0.04))
          break
        }
        i++; n++;
      }
    }
    else if ((19300 <= distanceInMeter) && (distanceInMeter <= 23200)){
      while (i < 5) {
        if(distanceInMeter <= 19200 + (i * fareChangeAfterMeter)){
          pay = minMoney + (0.97) + (n*(0.03))
          break
        }
        i++; n++;
      }
    }
    else if ((23300 <= distanceInMeter) && (distanceInMeter <= 26200)){
      while (i < 4) {
        if(distanceInMeter <= 23200 + (i * fareChangeAfterMeter)){
          pay = minMoney + (1.08) + (n*(0.02))
          break
        }
        i++; n++;
      }
    }
    else if ((26300 <= distanceInMeter) && (distanceInMeter <= 40200)){
      while (i < 15) {
        if(distanceInMeter <= 26200 + (i * fareChangeAfterMeter)){
          pay = minMoney + (1.13) + (n*(0.01))
          break
        }
        i++; n++;
      }
    }
    else {
      pay = 2.26
    }
  }

  else if (payThrough.toLowerCase() === "cash") {
    if (distanceInMeter <= 3200) {
      pay = 1.7
    } 
    else if ((3300 <= distanceInMeter) && (distanceInMeter <= 6200)) {
      pay = 1.9
    }
    else if ((6300 <= distanceInMeter) && (distanceInMeter <= 9200)) {
      pay = 2.1
    }
    else if ((9300 <= distanceInMeter) && (distanceInMeter <= 11200)) {
      pay = 2.3
    }
    else if ((11300 <= distanceInMeter) && (distanceInMeter <= 15200)) {
      pay = 2.5
    }
    else if ((15300 <= distanceInMeter) && (distanceInMeter <= 19200)) {
      pay = 2.6
    }
    else if ((19300 <= distanceInMeter) && (distanceInMeter <= 23200)) {
      pay = 2.7
    }
    else {
      pay = 2.8
    }
  }
  else {alert("Please enter either 'card' or 'cash'.")}
  
  alert(`Your ${modeOfTravel} fare will be $${pay.toFixed(2)}`)
}
  
adultBusFare();