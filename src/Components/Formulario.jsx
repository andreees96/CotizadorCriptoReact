import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectOpcion from '../hooks/useSelectOpcion';
import { monedas } from '../data/monedas';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 10px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
  //agregamos arreglo en el state ya que no es un arreglo estatico sino que dinamico
  const [criptos, setCriptos] = useState([]);

  //componente que se ejecutara en el error
  const [error, setError] = useState(false);

  //asignamos valor inicial al hook
  const [ moneda, SelectMonedas ] = useSelectOpcion('Elige tu Moneda', monedas);

  //una vez se llene el arreglo dinamico del set state se pasan a este hook
  const [ criptomoneda, SelectCriptomonedas ] = useSelectOpcion('Elige tu Criptomoneda', criptos);

  //consumir API
  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=12&tsym=USD"
      //bloqueamos la sgte línea con await hasta que carguen las APIs
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      //nuevo arreglo para extraer las propiedades de la API
      const arrayCripto = resultado.Data.map( cr => {

        const obj = {
          id: cr.CoinInfo.Name,
          nombre: cr.CoinInfo.FullName 
        }
        //al ser mas de una línea no estamos dando como implicito el return, este retorna y llena el arreglo
        return obj;
      })

      setCriptos(arrayCripto);

    };
    consultarAPI();
  }, []); //el arreglo vacío significa que se debe ejecutar solo 1 vez

  //al ser un formulario prevenimos la accion por default
  const handleSubmit = e =>{
    e.preventDefault();
    //si se encuentra un campo vacio
    if([moneda, criptomoneda].includes('')){
      //si hay error cambia a true
      setError(true);

      //return para no tener un else y no ejecutar la sgte linea
      return; 
    };
    setError(false);
    setMonedas({moneda, criptomoneda});
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}

      {/* al hacer submit ejecuta la funcion "handleSubmit"  */}
      <form onSubmit={handleSubmit} >

          <SelectMonedas />
          <SelectCriptomonedas />

          <InputSubmit type="submit" value="Cotizar"/>

      </form>
    </>
  );
};

export default Formulario;