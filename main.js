// Input variables
const txtStartingMoney = document.getElementById("txtStartingMoney");
const slcGambleOptions = document.getElementById("slcGambleOptions");
let selectedIndex = slcGambleOptions.selectedIndex;
const txtAmount = document.getElementById("txtAmount");
const txtSimulationNumber = document.getElementById("txtSimulationNumber");
const txtActionsNumber = document.getElementById("txtActionsNumber");
const txtSuccessChance = document.getElementById("txtSuccessChance");
const txtWinMultipler = document.getElementById("txtWinMultipler");
const txtLoseMultipler = document.getElementById("txtLoseMultipler");
let startingMoney;
let amount;
let simulationNumber;
let actionsNumber;
let successChance;
let winMultipler;
let loseMultipler;
// Output variables
const txtWorstCase = document.getElementById("txtWorstCase");
const txtBestCase = document.getElementById("txtBestCase");
const txtAverageCase = document.getElementById("txtAverageCase");
const cvAverageResult = document.getElementById("cvAverageResult").getContext('2d');
let worstCase = Number.POSITIVE_INFINITY;
let bestCase = Number.NEGATIVE_INFINITY;
let averageCase = 0;
let chart = null;

const btnCalculate = document.getElementById("btnCalculate");

btnCalculate.addEventListener('click', () => {
    if (getValues()) {
        let results = [];
        let total = 0;
        worstCase = Number.POSITIVE_INFINITY;
        bestCase = Number.NEGATIVE_INFINITY;
        if (selectedIndex == 1) {
            
            for (let i = 0; i < simulationNumber; i++) {
                let currentBalance = startingMoney;
                for (let j = 0; j < actionsNumber; j++) {
                    let gambleResult = Math.random();
                    let gambleAmount = amount * currentBalance;
                    if (gambleResult <= successChance) {
                        
                        currentBalance += gambleAmount * winMultipler;
                        currentBalance -= gambleAmount;
                    }
                    else {
                        currentBalance -= gambleAmount * (1 - loseMultipler);
                    }
                }
                results[i] = currentBalance;
                if (currentBalance < worstCase) worstCase = currentBalance;
                if (currentBalance > bestCase) bestCase = currentBalance;
            }
            for (let i = 0; i < results.length; i++) {
                total += results[i];
            }
            averageCase = total / results.length;
            updateOutput();
            if (chart != null) chart.destroy();
            loadChart(results);
            
            console.log(geometricAverage(results));
        }
    }
})

// Assign values to the variables from the user inputs
function getValues() {
    let alertMsg = "The following inputs: \"";
    selectedIndex = slcGambleOptions.selectedIndex;

    if (txtStartingMoney.value.trim() !== "" && txtStartingMoney.value.trim() !== "0") {
        startingMoney = parseFloat(txtStartingMoney.value);
    }
    else alertMsg += "Starting money, ";
    if (txtAmount.value.trim() !== "" && txtAmount.value.trim() !== "0") {
        amount = parseFloat(txtAmount.value);
    }
    else alertMsg += "Amount, ";
    if (txtSimulationNumber.value.trim() !== "" && txtSimulationNumber.value.trim() !== "0") {
        simulationNumber = parseInt(txtSimulationNumber.value);
    }
    else alertMsg += "Number of simulations, ";
    if (txtActionsNumber.value.trim() !== "" && txtActionsNumber.value.trim() !== "0") {
        actionsNumber = parseInt(txtActionsNumber.value);
    }
    else alertMsg += "Number of actions, ";
    if (txtSuccessChance.value.trim() !== "") {
        successChance = parseFloat(txtSuccessChance.value);
    }
    else alertMsg += "Win multipler, ";
    if (txtWinMultipler.value.trim() !== "") {
        winMultipler = parseFloat(txtWinMultipler.value);
    }
    else alertMsg += "Win multipler, ";
    if (txtLoseMultipler.value.trim() !== "") {
        loseMultipler = parseFloat(txtLoseMultipler.value);
    }
    else alertMsg += "Lose multipler, ";
    if (alertMsg != "The following inputs: \"") {
        alert(alertMsg.slice(0,alertMsg.length - 2) + "\" cannot be null or 0");
        return false;
    }
    else return true;
}

function updateOutput() {
    txtWorstCase.innerText = worstCase;
    txtBestCase.innerText = bestCase;
    txtAverageCase.innerText = averageCase;
}

function geometricAverage(numbers) {
    const logSum = numbers.reduce((acc, val) => acc + Math.log(val), 0);
    const geoAvg = Math.exp(logSum / numbers.length);
    return geoAvg;
  }

function loadChart(results) {
    let x = [];
    for (let i = 0; i < results.length; i++) {
        x[i] = i;
    }
    
    chart = new Chart(cvAverageResult, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
                label: 'My Dataset',
                data: results,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Simulation number'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Money'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}