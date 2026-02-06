let salario = Number(prompt("Digite o valor do salário"));
let aluguel = Number(prompt("Digite o valor do aluguel"));
let alimentacao = Number(prompt("Digite o valor da alimentação"));
let lazer = Number(prompt("Digite o valor do lazer"));

despesas = aluguel + alimentacao + lazer

if (despesas < salario) {
    alert ("SALDO POSITIVO");
}

else if (despesas > salario) {
    alert ("SALDO NEGATIVO");
}

else {
    alert ("SALDO NO LIMITE");
}