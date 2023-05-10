import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import './style.css'
import api from "./services/api";

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function clickAqui() {

  if(input === ""){
    alert('preencha o campo vazio!')
    return;
  }

  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data)
    setInput('');

  }catch{
    alert('Algo deu errado!');
    setInput("")
  }
}

  return (
    <div className="container">
     <h1 className="title">Buscador de CEP</h1>
     <div className="inpuut">
     <input type="text" 
     placeholder="Digite o CEP aqui..."
     value={input}
     onChange={(e) => setInput(e.target.value)}>
     </input>
     <button className="search" onClick={clickAqui}>
      <FiSearch size={25} color="black"/>
     </button>
     </div>

     {Object.keys(cep).length > 0 && (
        <main id="main">
        <h2>CEP: {cep.cep}</h2>

        <span>Endereço: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
       </main>
      
     )}

     </div>
  );
}

export default App;
