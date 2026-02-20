let nome = prompt("Escreva o nome")

let novonome = nome.trim().toUpperCase();
alert(`Nome formatado: ${novonome}`);

const total = novonome.split(" ");
const totalPalavras = total.length
alert(`Total de Palavras: ${totalPalavras}`);