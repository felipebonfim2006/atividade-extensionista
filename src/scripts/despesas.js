function criarLinhaFixa() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="date"></td>
        <td><input type="text" placeholder="Descrição"></td>
        <td>
            <select>
                <option>Alimentação</option>
                <option>Aluguel</option>
                <option>Energia</option>
                <option>Internet</option>
            </select>
        </td>
        <td><input type="text" class="valor" placeholder="0,00"></td>
        <td>
            <button onclick="this.closest('tr').remove(); atualizar()">X</button>
        </td>
    `;

    document.getElementById("fixas-body").appendChild(tr);
}

function criarLinhaVariavel() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="date"></td>
        <td><input type="text" placeholder="Descrição"></td>
        <td><input type="text" placeholder="Categoria"></td>
        <td><input type="text" class="valor" placeholder="0,00"></td>
        <td>
            <button onclick="this.closest('tr').remove(); atualizar()">X</button>
        </td>
    `;

    document.getElementById("variaveis-body").appendChild(tr);
}

function parseValor(valor) {
    if (!valor) return 0;
    return parseFloat(
        valor.replace(/\./g, "").replace(",", ".")
    ) || 0;
}

function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function atualizar() {
    let totalFixas = 0;
    let totalVariaveis = 0;
    let categorias = {};

    document.querySelectorAll("#fixas-body tr").forEach(tr => {
        const valor = parseValor(tr.querySelector(".valor").value);
        const categoria = tr.querySelector("select").value;

        totalFixas += valor;
        categorias[categoria] = (categorias[categoria] || 0) + valor;
    });

    document.querySelectorAll("#variaveis-body tr").forEach(tr => {
        const valor = parseValor(tr.querySelector(".valor").value);
        totalVariaveis += valor;
    });

    document.getElementById("total-fixas").innerText = formatar(totalFixas);
    document.getElementById("total-variaveis").innerText = formatar(totalVariaveis);

    const ul = document.getElementById("totais-categoria");
    ul.innerHTML = "";

    for (let categoria in categorias) {
        const li = document.createElement("li");
        li.innerText = `${categoria}: R$ ${formatar(categorias[categoria])}`;
        ul.appendChild(li);
    }
}

document.addEventListener("input", atualizar);
criarLinhaFixa();
criarLinhaVariavel();
