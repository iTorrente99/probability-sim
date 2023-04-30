// Input variables
const txtStartingMoney = document.getElementById("txtStartingMoney");
const slcGambleOptions = document.getElementById("slcGambleOptions");
const txtAmount = document.getElementById("txtAmount");
const txtSimulationNumber = document.getElementById("txtSimulationNumber");
const txtActionsNumber = document.getElementById("txtActionsNumber");
let startingMoney;
let amount;
let simulationNumber;
let actionsNumber;
// Output variables
const txtWorstCase = document.getElementById("txtWorstCase");
const txtBestCase = document.getElementById("txtBestCase");
const txtAverageCase = document.getElementById("txtAverageCase");
const cvAverageResult = document.getElementById("cvAverageResult");
let worstCase = startingMoney * 1000000;
let bestCase = startingMoney * -1000000;
let averageCase;

const btnCalculate = document.getElementById("btnCalculate");

btnCalculate.addEventListener('click', () => {
    if (getValues()) {
        console.log("Nice");
    }
})

// Assign values to the variables from the user inputs
function getValues() {
    let alertMsg = "The following inputs: \"";

    if (txtStartingMoney.value.trim() !== "") {
        startingMoney = parseFloat(txtStartingMoney.value);
    }
    else alertMsg += "Starting money, ";
    if (txtAmount.value.trim() !== "") {
        amount = parseFloat(txtAmount.value);
    }
    else alertMsg += "Amount, ";
    if (txtSimulationNumber.value.trim() !== "") {
        simulationNumber = parseInt(txtSimulationNumber.value);
    }
    else alertMsg += "Number of simulations, ";
    if (txtActionsNumber.value.trim() !== "") {
        actionsNumber = parseInt(txtActionsNumber.value);
    }
    else alertMsg += "Number of actions, ";
    if (alertMsg != "The following inputs: \"") {
        alert(alertMsg.slice(0,alertMsg.length-2)+"\" cannot be null or 0");
        return false;
    }
    else return true;
}