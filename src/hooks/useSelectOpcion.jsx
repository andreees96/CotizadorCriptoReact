import { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
    margin-bottom: 5px;
`

const useSelectOpcion = (label, opciones) => {
    
    const [state, setState] = useState('');

    const SelectOpcion = () =>(
        <>
            <Label>{label}</Label>
            <Select
                //agregamos 2 props
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value="">Seleccione</option>

                {opciones.map(opcion => (
                    <option
                        key={opcion.id}
                        //lo que se almacena en el state
                        value={opcion.id}                
                    >{opcion.nombre}</option>
                ))};
            </Select>
        </>
    )
    return[state, SelectOpcion];
}

export default useSelectOpcion;