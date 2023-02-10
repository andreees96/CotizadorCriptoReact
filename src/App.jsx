import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imgC from './img/imagen-criptos.png';
import Formulario from './Components/Formulario';
import Resultado from './Components/Resultado';
import Spinner from './Components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color:#fff;
  text-align: center;
  font-weight: 700;
  margin: 80px 0 50px 0;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color:#66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({});

  //almacenamos la información en un state ya que el objeto es dinamico
  const [resultado, setResultado] = useState({});
  //spinner
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      const cotizar = async () =>{
        //se activa spinner
        setCargando(true);

        const { moneda, criptomoneda } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        //de forma dinamica toma las llaves en las diferentes consultas
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        
        //se desativa spinner
        setCargando(false);
      };
      cotizar();
    };
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen
        src={imgC}
        alt='logos cripto'
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario
          setMonedas={setMonedas}
        />
        
        {cargando && <Spinner/>}
        {/* valida que resultado no este vacio por medio de la propiedad PRICE de la api, esto hace que no se ejecute vacio... si hay información pasamos el prop de resultado */}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  )
}

export default App
