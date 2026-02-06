function converter() {
    let celsius = Number(document.getElementById("celsiusInput").value);

let farenheit = celsius * 1.8 + 32;
alert (`A temperatura em Farenheit é: ${farenheit}°F`);

if (farenheit > 80) {
    document.body.style.backgroundColor = "coral";
} else {
    document.body.style.backgroundColor = "lightskyblue";
}

}