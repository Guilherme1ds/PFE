hora = Number(prompt("Digite o horário do seu turno:"));
prioridade = Number(prompt("Digite a prioridade entre 1 a 10:"));

    if (hora >= 0 && hora <= 11) {
        hora = "Manhã";
    }
    else if (hora >= 12 && hora <= 17) {
        hora = "Tarde";
    }
    else if (hora >= 18 && hora <= 23) {
        hora = "Noite";
    }
    else {
        alert ("Hora Inválida");
    };
    if ((hora === "Manhã" || hora === "Tarde") && prioridade > 8) {
        alert ("TAREFA CRÍTICA/URGENTE");
    }
    else if ((hora === "Manhã" || hora === "Tarde") && prioridade >= 7 && prioridade <= 9) {
        alert ("TAREFA IMPORTANTE");
    }
    else if ((hora === "Noite") && prioridade >= 1 && prioridade <= 10) {
        alert ("TAREFA NÃO IMPORTANTE");
    }
    else {
        alert ("Prioridade Inválida");
    }        
