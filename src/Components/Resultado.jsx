import styled from '@emotion/styled';

const Contenedor = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;
`

const Imagen = styled.img`
    display: block;
    width: 120px;
`

const Texto = styled.p`
    font-size: 15px;
    span{
        font-weight: 700;
    }
`

const Precio = styled.p`
    font-size: 20px;
    span{
        font-weight: 700;
    }
`

//extraemos el prop de resultado que viene de app.jsx
const Resultado = ({resultado}) => {
    //extrayendo propiedades desde la API, todo esto viene de resultado (segun moneda elegida)
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado;
  return (
    <Contenedor>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt='img crypto' />
        <div>
            <Precio>Precio más alto del día: <span>{HIGHDAY}</span></Precio>
            <Texto>El precio es: <span>{PRICE}</span></Texto>
            <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
            <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
        </div>
    </Contenedor>
  )
}

export default Resultado;