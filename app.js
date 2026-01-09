import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2d8LApywbcUMORHZB0lIpcWQu-KrtHqs",
  authDomain: "meucontrolefinanceiro-94d3a.firebaseapp.com",
  projectId: "meucontrolefinanceiro-94d3a",
  storageBucket: "meucontrolefinanceiro-94d3a.firebasestorage.app",
  messagingSenderId: "592355024628",
  appId: "1:592355024628:web:73c5d3b32902f0534288a1",
  measurementId: "G-94T3P0XC7M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para mudar de tela
window.navegar = (tela) => {
    document.querySelectorAll('.tela').forEach(t => t.style.display = 'none');
    document.getElementById(`tela-${tela}`).style.display = 'block';
    if(tela === 'dashboard') carregarDados();
}

// Salvar no Firebase
window.salvar = async (tipo) => {
    const desc = document.getElementById(tipo === 'ganho' ? 'descGanho' : 'descGasto').value;
    const valor = document.getElementById(tipo === 'ganho' ? 'valorGanho' : 'valorGasto').value;

    if(!desc || !valor) return alert("Preencha tudo!");

    await addDoc(collection(db, "transacoes"), {
        descricao: desc,
        valor: parseFloat(valor),
        tipo: tipo,
        data: new Date()
    });

    alert("Lançado com sucesso!");
    location.reload(); // Recarrega para limpar campos
}

// Carregar Dados e Calcular Saldo
async function carregarDados() {
    const q = query(collection(db, "transacoes"), orderBy("data", "desc"));
    const querySnapshot = await getDocs(q);
    
    let tGanhos = 0, tGastos = 0, html = "";

    querySnapshot.forEach((doc) => {
        const d = doc.data();
        if(d.tipo === 'ganho') tGanhos += d.valor;
        else tGastos += d.valor;

        html += `<p class="${d.tipo}">${d.descricao}: R$ ${d.valor.toFixed(2)}</p>`;
    });

    document.getElementById('totalGanhos').innerText = `R$ ${tGanhos.toFixed(2)}`;
    document.getElementById('totalGastos').innerText = `R$ ${tGastos.toFixed(2)}`;
    document.getElementById('saldo').innerText = `R$ ${(tGanhos - tGastos).toFixed(2)}`;
    document.getElementById('extrato').innerHTML = html;
}
