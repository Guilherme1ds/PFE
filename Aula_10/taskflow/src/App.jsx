import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
const [taskText, setTaskText] = useState("");
const [priority, setPriority] = useState("Baixa");
const [taskList, setTaskList] = useState([]);
const [filter, setFilter] = useState("Todas");
const [searchText, setSearchText] = useState("");
const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState("");

useEffect(() => {
const saved = localStorage.getItem("@taskflow_data");
if (saved) setTaskList(JSON.parse(saved));
}, []);

useEffect(() => {
localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
}, [taskList]);

const addTask = (e) => {
e.preventDefault();
if (!taskText.trim()) return;

const newTask = {
id: crypto.randomUUID(),
text: taskText,
priority: priority,
completed: false,
createdAt: new Date().toLocaleDateString()
};

setTaskList([newTask, ...taskList]);
setTaskText("");
};

const toggleTask = (id) => {
setTaskList(taskList.map(t =>
t.id === id ? { ...t, completed: !t.completed } : t
));
};

const deleteTask = (id) => {
setTaskList(taskList.filter(t => t.id !== id));
};

const handleDeleteConfirm = (id) => {
if (window.confirm("Tem certeza que deseja deletar essa tarefa?")) {
deleteTask(id);
}
};

const startEdit = (id, text) => {
setEditingId(id);
setEditText(text);
};

const saveEdit = (id) => {
setTaskList(taskList.map(t =>
t.id === id ? { ...t, text: editText } : t
));
setEditingId(null);
setEditText("");
};

const cancelEdit = () => {
setEditingId(null);
setEditText("");
};

const filteredTasks = taskList
.filter(t => {
  // Filtro por status
  if (filter === "Pendentes") return !t.completed;
  if (filter === "Concluídas") return t.completed;
  return true;
})
.filter(t => {
  // Filtro por busca em tempo real
  return t.text.toLowerCase().includes(searchText.toLowerCase());
})
.sort((a, b) => {
  // Ordenação automática: Alta em primeiro
  const priorityOrder = { "Alta": 0, "Média": 1, "Baixa": 2 };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});

return (
<div className="app-container">
<header>
<h1>TaskFlow</h1>
<p>Gestão de Produtividade</p>
</header>

<section className="form-section">
<form onSubmit={addTask}>
<input
value={taskText}
onChange={(e) => setTaskText(e.target.value)}
placeholder="Descrição da tarefa..."
/>
<select value={priority} onChange={(e) => setPriority(e.target.value)}>
<option value="Baixa">Baixa</option>
<option value="Média">Média</option>
<option value="Alta">Alta</option>
</select>
<button type="submit">Criar</button>
</form>
</section>

<section className="filter-section">
{["Todas", "Pendentes", "Concluídas"].map(f => (
<button
key={f}
className={filter === f ? "active" : ""}
onClick={() => setFilter(f)}
>
{f}
</button>
))}
</section>

<section className="search-section">
<input
type="text"
value={searchText}
onChange={(e) => setSearchText(e.target.value)}
placeholder="Buscar tarefas..."
className="search-input"
/>
</section>

<main className="task-grid">
{filteredTasks.map(item => (
<div key={item.id} className={`task-card ${item.priority.toLowerCase()} ${item.completed
? 'done' : ''}`}>
<div className="task-content">
{editingId === item.id ? (
<input
type="text"
value={editText}
onChange={(e) => setEditText(e.target.value)}
className="edit-input"
autoFocus
/>
) : (
<h3>{item.text}</h3>
)}
<span>Prioridade: {item.priority}</span>
<small>Criada em: {item.createdAt}</small>
</div>
<div className="task-actions">
{editingId === item.id ? (
<>
<button onClick={() => saveEdit(item.id)} className="save">
Salvar
</button>
<button onClick={cancelEdit} className="cancel">
Cancelar
</button>
</>
) : (
<>
<button onClick={() => toggleTask(item.id)}>
{item.completed ? "Reabrir" : "Concluir"}
</button>
<button onClick={() => startEdit(item.id, item.text)} className="edit">
Editar
</button>
<button onClick={() => handleDeleteConfirm(item.id)} className="delete">
Remover
</button>
</>
)}
</div>
</div>
))}
</main>
</div>


);
}

export default App;