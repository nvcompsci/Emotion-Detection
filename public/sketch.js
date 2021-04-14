const faces = document.querySelectorAll('div.emotions div')
faces.forEach(face => {
  face.onclick = addData
})

document.getElementById('train')
  .onclick = startTraining

document.getElementById('guess')
  .onclick = classify

let r,g,b;

function setup() {
  createCanvas(400, 400);
  
  r = random(0, 255)
  g = random(0, 255)
  b = random(0, 255)
  //alert(emotion)
  background(r, g, b)
}

function draw() {
  //background(220);
}

function addData(event) {
  const {
    target: face
  } = event
  const {
    id: emotion
  } = face
  
  const inputs = {
    r,g,b
  };
  const output = {
    emotion
  };

  nn.addData(inputs, output);
  
  r = random(0, 255)
  g = random(0, 255)
  b = random(0, 255)
  //alert(emotion)
  background(r, g, b)

}

const options = {
  task: 'classification',
  debug: true
}

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options);

function startTraining() {
  console.log("Start training")
  // Step 5: normalize your data;
  nn.normalizeData();

  // Step 6: train your neural network
  const trainingOptions = {
    epochs: 200,
    batchSize: 12
  }
  nn.train(trainingOptions, whileTraining, finishedTraining);

}

function whileTraining(e, l) {
  console.log(e,l)
}

// Step 7: use the trained model
function finishedTraining() {
  classify();
}

// Step 8: make a classification
function classify() {
  const input = {
    r,g,b
  };

  r = random(0, 255)
  g = random(0, 255)
  b = random(0, 255)
  //alert(emotion)
  background(r, g, b)
  nn.classify(input, handleResults);
}

// Step 9: define a function to handle the results of your classification
function handleResults(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(result); // {label: 'red', confidence: 0.8};
}
