import { FiSearch } from 'react-icons/fi';
import './styles.css';
import { useState } from 'react';
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState ({});

  async function handleSearch(){
    if(input === '') {
      alert('Preencha algum CEP"')
      return;
    }

    try{ 
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')
    }catch{
      alert('Erro ao buscar.')
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Busca CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value) }/>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="FFF"></FiSearch>
        </button>

      </div>
        
      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2 className='spanColor'>CEP: <span>{cep.cep}</span></h2>

        <span><span className='spanColor'>Endereço: </span>{cep.logradouro}</span>
        <span><span className='spanColor'>Complemento: </span>{cep.complemento}</span>
        <span><span className='spanColor'>Bairro: </span>{cep.bairro}</span>
        <span><span className='spanColor'>Cidade: </span>{cep.localidade} - {cep.uf}</span>

      </main>
      )}
    </div>
  );
}

export default App;
