import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
const [eventTitle, setEventTitle] = useState("");
const [eventType, setEventType] = useState("Palestra");
const [eventList, setEventList] = useState([]);
const [filter, setFilter] = useState("Todos");
const [searchText, setSearchText] = useState("");
const [vagas, setVagas] = useState(10);
const [showModal, setShowModal] = useState(false);
const [editingId, setEditingId] = useState(null);

// Carregar dados iniciais do LocalStorage
useEffect(() => {
const savedEvents = localStorage.getItem("@eventpulse_data");
if (savedEvents) setEventList(JSON.parse(savedEvents));
}, []);

// Sincronizar alterações com o LocalStorage
useEffect(() => {
localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
}, [eventList]);

const addEvent = (e) => {
e.preventDefault();
if (!eventTitle.trim()) return;

if (editingId) {
  // Lógica de Edição
  setEventList(eventList.map(evt => 
    evt.id === editingId 
      ? { ...evt, title: eventTitle, type: eventType, vagas: vagas } 
      : evt
  ));
  setEditingId(null);
} else {
  // Lógica de Criação
  const newEvent = {
  id: crypto.randomUUID(),
  title: eventTitle,
  type: eventType,
  status: "Agendado", // Status inicial padrão
  date: new Date().toLocaleDateString(),
  vagas: vagas
  };

  setEventList([newEvent, ...eventList]);
}

setEventTitle("");
setEventType("Palestra");
setVagas(10);
};

const prepareEdit = (event) => {
  setEditingId(event.id);
  setEventTitle(event.title);
  setEventType(event.type);
  setVagas(event.vagas);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const cancelEdit = () => {
  setEditingId(null);
  setEventTitle("");
  setEventType("Palestra");
  setVagas(10);
};

const toggleStatus = (id) => {

setEventList(eventList.map(evt => {
if (evt.id === id) {
// Rotaciona o status do evento sequencialmente
const nextStatus = evt.status === "Agendado" ? "Em Andamento" :
evt.status === "Em Andamento" ? "Encerrado" : "Agendado";
return { ...evt, status: nextStatus };
}
return evt;
}));
};

const deleteEvent = (id) => {
const confirmed = window.confirm(
  "Tem certeza que deseja remover este evento? Esta ação não pode ser desfeita!"
);

if (confirmed) {
  setEventList(eventList.filter(evt => evt.id !== id));
}
};

const inscreverAluno = (id) => {
  setEventList(eventList.map(evt => {
    if (evt.id === id && evt.vagas > 0) {
      return { ...evt, vagas: evt.vagas - 1 };
    }
    return evt;
  }));
};

const clearSchedule = () => {
  const confirmed = window.confirm(
    "Tem certeza que deseja limpar TODO o cronograma? Esta ação não pode ser desfeita!"
  );
  
  if (confirmed) {
    setEventList([]);
    localStorage.removeItem("@eventpulse_data");
  }
};

const filteredEvents = eventList.filter(evt => {
if (filter === "Agendados") return evt.status === "Agendado";
if (filter === "Em Andamento") return evt.status === "Em Andamento";
if (filter === "Encerrados") return evt.status === "Encerrado";
return true;
})
.filter(evt => {
return evt.title.toLowerCase().includes(searchText.toLowerCase());
})
.sort((a, b) => {
if (a.type === "Workshop" && b.type !== "Workshop") return -1;
if (b.type === "Workshop" && a.type !== "Workshop") return 1;
return 0;
});

return (
<div className="app-container">
<header>
<h1>EventPulse</h1>
<p>Gestão de Eventos Acadêmicos</p>
<button onClick={clearSchedule} className="clear-btn">
     Limpar Cronograma
  </button>
</header>

<section className="form-section">
<form onSubmit={addEvent} className={editingId ? "editing" : ""}>
<input
value={eventTitle}
onChange={(e) => setEventTitle(e.target.value)}
placeholder="Nome do evento ou atividade..."
/>
<select value={eventType} onChange={(e) => setEventType(e.target.value)}>
<option value="Palestra">Palestra</option>
<option value="Workshop">Workshop</option>
<option value="Painel">Painel</option>
</select>
<select value={vagas} onChange={(e) => setVagas(Number(e.target.value))}>
  <option value={10}>10 vagas</option>
  <option value={30}>30 vagas</option>
  <option value={50}>50 vagas</option>
</select>
<button type="submit" style={{ backgroundColor: editingId ? '#27ae60' : '' }}>
  {editingId ? "Salvar" : "Agendar"}
</button>
{editingId && (
  <button type="button" onClick={cancelEdit} className="cancel-btn">
    Cancelar
  </button>
)}
</form>
</section>

<section className="filter-section">
{["Todos", "Agendados", "Em Andamento", "Encerrados"].map(f => (
<button
key={f}
className={filter === f ? "active" : ""}
onClick={() => setFilter(f)}
>
{f}
</button>
))}
</section>
<section className='search-section'>
  <input
    type="text"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    placeholder="Buscar eventos..."
    className="search-input"
  />
</section>

<main className="event-grid">
{filteredEvents.map(item => (
<div
key={item.id}
className={`event-card ${item.type.toLowerCase()}
${item.status.toLowerCase().replace(" ", "-")}`}
>
<div className="event-content">
<h3>{item.title}</h3>
<span className="event-tag">Tipo: {item.type}</span>
<span className="status-badge">Status: {item.status}</span>
<small>Registrado em: {item.date}</small>
</div>
<div className="event-actions">
<button onClick={() => toggleStatus(item.id)} className="status-btn">
{item.status === "Agendado" ? "Iniciar" : item.status === "Em Andamento"
? "Encerrar" : "Reiniciar"}
</button>
<button onClick={() => prepareEdit(item)} className="edit-btn">
  Editar
</button>
<button 
  onClick={() => inscreverAluno(item.id)}
  className="inscrever-btn"
  disabled={item.vagas === 0}
>
  {item.vagas === 0 ? "Esgotado" : `Inscrever (${item.vagas})`}
</button>
<button onClick={() => deleteEvent(item.id)} className="delete">
Remover
</button>
</div>
</div>
))}
</main>

      <button 
        className="floating-btn" 
        onClick={() => setShowModal(!showModal)}
        title="Ver alterações CSS"
      >
        <img src="/favicon_css.png" alt="Ícone" style={{ width: '24px', height: '24px' }} />
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h2>Alterações CSS Realizadas</h2>
            
            <div className="modal-changes">
              <div className="change-item">
                <h3>Paleta de Cores Escolhida</h3>
                <p>Escolha da cor azul/roxo (#667eea) para o título do header e elementos principais como botões, filtros ativos e destaques, criando uma identidade visual coerente e profissional em todo o aplicativo.</p>
              </div>
                    
              <div className="change-item">
                <h3>Cards com Efeito Hover</h3>
                <p>Cards ganham interatividade visual ao passar o mouse com transformação suave e sombra elevada, criando profundidade e feedback visual.</p>
              </div>
              
              <div className="change-item">
                <h3>Botões Otimizados e Confirmações</h3>
                <p>Botões redimensionados para caber perfeitamente nos cards. Adicionado aviso de confirmação ao remover eventos para evitar exclusões por acidente.</p>
              </div>

              <div className="change-item">
                <h3>Edição de Eventos</h3>
                <p>Implementada a função para editar título, tipo e vagas de eventos já cadastrados.</p>
              </div>
            </div>
            
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
);
}

export default App;