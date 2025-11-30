document.addEventListener("DOMContentLoaded", () => {
const textInput = document.getElementById("text");
const img = document.getElementById("qrImage");
const linkInput = document.getElementById("link");
const downloadBtn = document.getElementById("download");
const generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", (e) => {
e.preventDefault(); // предотвращаем перезагрузку
const text = textInput.value.trim();
if (!text) {
alert("Введите текст!");
return;
}

const size = document.querySelector("input[name='size']:checked").value;
const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

img.src = url;
linkInput.value = url;
downloadBtn.disabled = false;
});

downloadBtn.addEventListener("click", async (e) => {
e.preventDefault();
if (!img.src) return;

try {
const response = await fetch(img.src);
const blob = await response.blob();
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "qrcode.png";
a.click();
} catch (error) {
alert("Ошибка при скачивании QR-кода.");
console.error(error);
}
});

// Поддержка Ctrl+Enter для генерации
textInput.addEventListener("keydown", (e) => {
if (e.ctrlKey && e.key === "Enter") {
generateBtn.click();
}
});
});