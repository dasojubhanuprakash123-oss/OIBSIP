const form = document.querySelector("#converter-form");
const temperatureInput = document.querySelector("#temperature-input");
const fromUnit = document.querySelector("#from-unit");
const toUnit = document.querySelector("#to-unit");
const inputSymbol = document.querySelector("#input-symbol");
const inputHint = document.querySelector("#input-hint");
const errorMessage = document.querySelector("#error-message");
const resultValue = document.querySelector("#result-value");
const resultDescription = document.querySelector("#result-description");
const copyButton = document.querySelector("#copy-button");
let latestResult = "";

const units = {
  celsius: { name: "Celsius", symbol: "°C", min: -273.15 },
  fahrenheit: { name: "Fahrenheit", symbol: "°F", min: -459.67 },
  kelvin: { name: "Kelvin", symbol: "K", min: 0 }
};

function toCelsius(value, unit) {
  if (unit === "fahrenheit") return (value - 32) * 5 / 9;
  if (unit === "kelvin") return value - 273.15;
  return value;
}
function fromCelsius(value, unit) {
  if (unit === "fahrenheit") return value * 9 / 5 + 32;
  if (unit === "kelvin") return value + 273.15;
  return value;
}
function formatNumber(value) {
  if (Object.is(value, -0) || Math.abs(value) < 1e-10) value = 0;
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(value);
}
function updateInputUnit() {
  inputSymbol.textContent = units[fromUnit.value].symbol;
  inputHint.textContent = `Minimum: ${units[fromUnit.value].min} ${units[fromUnit.value].symbol} (absolute zero).`;
}
function clearError() {
  errorMessage.textContent = "";
  temperatureInput.removeAttribute("aria-invalid");
}
function showError(message) {
  errorMessage.textContent = message;
  temperatureInput.setAttribute("aria-invalid", "true");
  resultValue.textContent = "—";
  resultDescription.textContent = "Check your value and try again.";
  latestResult = "";
  copyButton.disabled = true;
}
function convertTemperature(event) {
  if (event) event.preventDefault();
  clearError();
  const raw = temperatureInput.value.trim();
  if (raw === "") {
    showError("Enter a temperature value to convert.");
    temperatureInput.focus();
    return;
  }
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    showError("Enter a valid number.");
    temperatureInput.focus();
    return;
  }
  const celsius = toCelsius(value, fromUnit.value);
  if (celsius < -273.15 - 1e-10) {
    showError("That value is below absolute zero and cannot be converted.");
    temperatureInput.focus();
    return;
  }
  const converted = fromCelsius(celsius, toUnit.value);
  const output = formatNumber(converted);
  const symbol = units[toUnit.value].symbol;
  resultValue.textContent = `${output} ${symbol}`;
  resultDescription.textContent = `${formatNumber(value)} ${units[fromUnit.value].symbol} = ${output} ${symbol}`;
  latestResult = `${output} ${symbol}`;
  copyButton.disabled = false;
}
form.addEventListener("submit", convertTemperature);
fromUnit.addEventListener("change", () => { updateInputUnit(); if (temperatureInput.value.trim()) convertTemperature(); });
toUnit.addEventListener("change", () => { if (temperatureInput.value.trim()) convertTemperature(); });
temperatureInput.addEventListener("input", clearError);
document.querySelector("#clear-button").addEventListener("click", () => {
  temperatureInput.value = ""; clearError(); resultValue.textContent = "—";
  resultDescription.textContent = "Your result will appear here."; latestResult = "";
  copyButton.disabled = true; temperatureInput.focus();
});
document.querySelector("#swap-button").addEventListener("click", () => {
  const oldFrom = fromUnit.value; fromUnit.value = toUnit.value; toUnit.value = oldFrom;
  updateInputUnit(); if (temperatureInput.value.trim()) convertTemperature();
});
document.querySelectorAll("[data-value]").forEach(button => button.addEventListener("click", () => {
  fromUnit.value = "celsius"; updateInputUnit(); temperatureInput.value = button.dataset.value; convertTemperature();
}));
copyButton.addEventListener("click", async () => {
  if (!latestResult) return;
  try { await navigator.clipboard.writeText(latestResult); }
  catch {
    const helper = document.createElement("textarea"); helper.value = latestResult;
    helper.style.position = "fixed"; helper.style.opacity = "0"; document.body.appendChild(helper);
    helper.select(); document.execCommand("copy"); helper.remove();
  }
  copyButton.textContent = "✓ Copied";
  window.setTimeout(() => { copyButton.textContent = "▢ Copy"; }, 1400);
});
updateInputUnit();
