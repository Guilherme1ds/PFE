import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#1a1a2e', 
      textAlign: 'center', 
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#ff00ff', textShadow: '4px 4px 0px #00ffff', fontSize: '3rem' }}>
        👽 Olá, React! 🛸
      </h1>
      <p style={{ color: '#baff00', fontSize: '20px', letterSpacing: '3px' }}>
        Estou alterando meu primeiro componente com um estilo MUITO LOCO.
      </p>

      <Saudacao/>
      <Perfil nome="Guilherme" cargo="Mestre dos Magos do Front-end" />
      <Painel/>
      <Descricao nome="Guilherme" cargo="Estudante Caótico" competencia="Quebrar o CSS" />

      <h6> Aqui está um teste de State e Hooks: </h6>
      <PlacarFutebol nomeTimeA="Corinthians" nomeTimeB="Flamengo"/>
    </div>
  )
}
export default App

function Saudacao() {
  return (
    <div style={{ 
      backgroundColor: '#ff007f', 
      padding: '20px', 
      borderRadius: '50px 10px 50px 10px', 
      marginBottom: '20px', 
      border: '5px dashed yellow', 
      transform: 'rotate(-2deg)' 
    }}>
      <h2 style={{ color: '#fff', fontSize: '2.5rem', margin: '0 0 10px 0' }}>
        🌭 Olá, Samuel! 🌭
      </h2>
      <p style={{ color: '#ffff00', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Este componente foi criado separadamente e está um pouco tonto.
      </p>
    </div>
  );
}

function Perfil({ nome, cargo }) {
  return (
    <div style={{
      border: '8px dotted #00ff00',
      borderRadius: '100px',
      padding: '25px',
      margin: '20px auto',
      backgroundColor: '#4a00e0',
      boxShadow: '10px 10px 0px #ff0055',
      transform: 'scale(1.05)',
      maxWidth: '600px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#00ffff', textTransform: 'uppercase' }}>
        🕵️‍♂️ Nome: {nome}
      </h3>
      <p style={{ margin: 0, color: '#ffbb00', fontSize: '1.2rem' }}>
        Cargo: <strong>{cargo}</strong> 🚀
      </p>
    </div>
  );
}

function Painel() {
  const [texto, setTexto] = useState('');

  return (
    <div style={{ background: '#f9f9f9', padding: '15px', border: '1px dashed #666', marginTop: '20px'}}>
      <h4>Escreva uma mensagem:</h4>
      <input
        type="text"
        placeholder="Digite algo..."
        onChange={(e) => setTexto(e.target.value)}
        style={{ padding: '8px', width: '80%' }}
      />
      <p>O que você digitou: <span style={{ color: 'red' }}>{texto}</span></p>
    </div>
  );
}

function Descricao({ nome, cargo, competencia }) {
  return (
    <div style={{
      border: '10px double #ff5e62',
      /* Isso cria um formato de "geleca/blob" ao invés de um quadrado normal */
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', 
      padding: '40px',
      margin: '40px auto',
      backgroundColor: '#ff9966',
      boxShadow: 'inset 5px 5px 15px rgba(0,0,0,0.5)',
      transform: 'rotate(3deg)',
      maxWidth: '500px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#800080', fontSize: '1.8rem' }}>
        🦄 Nome: {nome}
      </h3>
      <h3 style={{ color: '#000080', marginBottom: '15px' }}>
        🧙‍♂️ Cargo: {cargo}
      </h3>
      <p style={{ fontSize: '1.5rem', color: '#fff', backgroundColor: '#000', padding: '10px', borderRadius: '15px' }}>
        ⚡ Competência: <strong>{competencia}</strong> ⚡
      </p>
    </div>
  );
}

function PlacarFutebol({ nomeTimeA, nomeTimeB }) {
  // Criamos duas "caixinhas de memória" (States)
  const [golsA, setGolsA] = useState(0);
  const [golsB, setGolsB] = useState(0);

  const botaoEstilo = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#1b5e20',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={{
      border: '3px solid #2ed32',
      borderRadius: '15px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f1f8e9',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      <h2 style={{ color: '#1b5e20' }}>Placar do Jogo</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {/* Lado do Time A */}
        <div>
          <h3>{nomeTimeA}</h3>
          <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{golsA}</h1>
          <button onClick={() => setGolsA(golsA + 1)} style={botaoEstilo}>
            GOL!
          </button>
        </div>

        <h1 style={{ margin: '0 20px' }}>X</h1>

        {/* Lado do Time B */}
        <div>
          <h3>{nomeTimeB}</h3>
          <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{golsB}</h1>
          <button onClick={() => setGolsB(golsB + 1)} style={botaoEstilo}>
            GOL!
          </button>
        </div>
      </div>
    </div>
  );
}

