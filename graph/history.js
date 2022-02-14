const historySlider = document.getElementById("history-slider");
const historyValue = document.getElementById("history-value");

historySlider.oninput = function() {    
    historyValue.innerHTML = this.value;
}