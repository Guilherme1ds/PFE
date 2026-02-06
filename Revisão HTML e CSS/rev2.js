    document.getElementById("nomeInput").addEventListener("input", function() {
    document.getElementById("nomeCartao").innerText = this.value;
});

document.getElementById("cargoInput").addEventListener("input", function() {
    document.getElementById("cargoCartao").innerText = this.value;
});

var corSelect = document.getElementById("corInput");
if (corSelect) {
    corSelect.addEventListener("change", function() {
        var cartao = document.getElementById("cartao");
        if (cartao) cartao.style.backgroundColor = this.value;
    });
}
