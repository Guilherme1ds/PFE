let hoje = new Date();
let evento = new Date('2026-12-03');

let ms = evento.getTime() - hoje.getTime();

let dia = ms / 24 / 60 / 1000 / 60;

let resultado = Math.ceil(dia)
alert(`Falta, ${dia} dias para o evento`);