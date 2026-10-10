# Tempora — Temperature Converter

A responsive temperature converter built for the **Oasis Infobyte Internship Program — Web Development and Designing, Level 1 Task 3**.

## Features
- Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K).
- Validate input and reject temperatures below absolute zero.
- Swap source and target units.
- Quick reference values for freezing, room temperature, and boiling.
- Copy the converted result.
- Responsive layout for desktop and mobile.
- Keyboard focus styles and reduced-motion support.
- Locale-aware number formatting with `Intl.NumberFormat`.

## Project files
```text
WebDev-L1-TemperatureConverter/
├── index.html
├── style.css
├── script.js
├── README.md
└── Screenshots/
```

## Run locally
1. Open the folder in Visual Studio Code.
2. Open `index.html` in a browser, or use the VS Code Live Server extension.
3. Enter a temperature, select the source and target units, and click **Convert temperature**.

No framework, installation, or build step is required.

## Conversion formulas
- Celsius to Fahrenheit: `(°C × 9/5) + 32`
- Fahrenheit to Celsius: `(°F − 32) × 5/9`
- Celsius to Kelvin: `°C + 273.15`
- Kelvin to Celsius: `K − 273.15`

The app converts through Celsius as an intermediate value.

## Test cases
- `0 °C` → `32 °F`
- `100 °C` → `212 °F`
- `0 °C` → `273.15 K`
- `32 °F` → `0 °C`
- Values below absolute zero should display a validation message.

## Screenshots
Capture screenshots of the running app in a browser and add them to `Screenshots/` before submission.
