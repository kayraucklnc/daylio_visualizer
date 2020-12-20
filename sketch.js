let table;
let boxSize = 45;
let percentSpace = 0.05;

//TODO: Doesnt look if there are empty days;

let moods = {
  "rad": 2,
  "good": 1,
  "meh": 0,
  "bad": -1,
  "awful": -2,
  "Sick": -2,
  "Cry": -2,
};

function preload() {
  table = loadTable('daylio_export.csv', 'csv', 'header');
}

function prinYear(_g) {

  textAlign(CENTER);

  let prev = "";

  let i = 0;
  let j = 60 + _g * ((boxSize + boxSize * percentSpace));

  //For Numbers
  textSize(24);
  fill(255);
  for (let i = 1; i <= 31; i++) {
    if (i - 1 == floor((mouseX - 180) / (boxSize + boxSize * percentSpace))) {
      fill(255, 0, 0, 255);
    } else {
      fill(255, 255, 255, 255);
    }
    text(i, 150 + i * ((1 + percentSpace) * boxSize), 95)
  }

  let monthCounter = 0;

  for (let r = table.getRowCount() - 1; r > 0; r--) {
    let moodDay = 0;
    let now = table.getRow(r).getString(0).split("-");

    //New month
    if (now[1] != prev[1]) {
      monthCounter++;
      j += boxSize * (1 + percentSpace);
      i = 180 + (now[2] - 1) * boxSize * (1 + percentSpace);
      if (monthCounter > -_g) {
        if (monthCounter - 1 + _g == floor((mouseY - 107) / (boxSize + boxSize * percentSpace))) {
          fill(255, 0, 0, 255);
        } else {
          fill(255, 255, 255, 255);
        }

        textSize(25);
        text(table.getRow(r).getString(1).split(" ")[0], 100, j + boxSize * 0.6);

      }
    }

    if (monthCounter > -_g) {
      if (now[2] != prev[2]) {
        moodDay = moods[table.getRow(r).getString(4)];
        switch (moodDay) {
          case -2:
            fill("#EA2139");
            break;
          case -1:
            fill("#f68c1e");
            break;
          case 0:
            fill("#efd67d");
            break;
          case 1:
            fill("#a2a844");
            break;
          case 2:
            fill("#45a466");
            break;
        }
        square(i, j, boxSize);
        i += boxSize + boxSize * percentSpace;
      } else {
        square(i - (boxSize + boxSize * percentSpace), j, boxSize);
      }
    }
    //A day


    prev = now;
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(41);
  prinYear(0);
}


let g = 0;

function mouseWheel(event) {
  g += 2 * -Math.sign(event.delta);
  g = min(0, g);
  g = max(-13, g);
  background(41);
  prinYear(g);
}

function mouseMoved() {
  clearTimeout(myVar);
  myVar = setInterval(anan, 300);
  background(41);
  prinYear(g);
}

function anan() {
  // ellipse(mouseX, mouseY, 50, 50);
  let a = floor((mouseX - 180) / (boxSize + boxSize * percentSpace));
  let b = floor((mouseY - 107) / (boxSize + boxSize * percentSpace));
  fill(255);
  clearTimeout(myVar);
}

var myVar = setInterval(anan, 300);
