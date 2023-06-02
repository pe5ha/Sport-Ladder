

function ratingChangeAlg(winner_rating, loser_rating){
  if(winner_rating >= loser_rating){
    let diff = winner_rating - loser_rating;
    if(diff == 0) return [5,-5];
    if(diff == 1) return [6,-6];
    if(diff <= 4) return [4,-4];
    if(diff <= 5) return [5,-5];
    if(diff <= 10) return [4,-4];
    if(diff <= 20) return [3,-3];
    if(diff <= 25) return [2,-2];
    if(diff <= 31) return [1,-1];
    else return [0,0];
  }
  else {
    let diff = loser_rating - winner_rating;
    if(diff <= 5) return [5,-5];
    if(diff <= 10) return [6,-6];
    if(diff <= 15) return [7,-7];
    if(diff <= 20) return [7,-8];
    if(diff <= 25) return [8,-9];
    if(diff <= 30) return [8,-10];
    if(diff <= 35) return [9,-10];
    if(diff <= 40) return [9,-10];
    if(diff <= 45) return [10,-10];
    if(diff <= 50) return [11,-10];
    if(diff <= 55) return [12,-10];
    if(diff <= 60) return [16,-10];
    if(diff <= 65) return [24,-10];
    if(diff <= 70) return [28,-10];
    if(diff <= 75) return [33.5,-10];
    if(diff <= 80) return [39,-10];
    if(diff <= 85) return [40,-10];
    if(diff <= 90) return [44,-10];
    if(diff <= 95) return [48,-10];
    if(diff <= 100) return [49,-10];
    else return [50,-10];
  }

}


