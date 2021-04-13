const faces = document.querySelectorAll('div.emotions div')
faces.forEach(face => {
  face.onclick = addData
})

function setup() {
  createCanvas(400, 400);
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
  let r = random(0, 255)
  let g = random(0, 255)
  let b = random(0, 255)
  alert(emotion)
  background(r, g, b)

  const inputs = {
    r: item.r,
    g: item.g,
    b: item.b
  };
  const output = {
    color: item.color
  };

  nn.addData(inputs, output);
}

const options = {
  task: 'classification',
  debug: true
}

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options);

function startTraining() {
  // Step 5: normalize your data;
  nn.normalizeData();

  // Step 6: train your neural network
  const trainingOptions = {
    epochs: 32,
    batchSize: 12
  }
  nn.train(trainingOptions, finishedTraining);

}

// Step 7: use the trained model
function finishedTraining() {
  classify();
}

// Step 8: make a classification
function classify() {
  const input = {
    r: 255,
    g: 0,
    b: 0
  }
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
