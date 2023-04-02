import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';


const Formulario = ({ crearCita }) => {

    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false)

    //e.target.name para saber en que campo estas escribiendo 
    //e.target.value para saber lo que escribe el usuario

    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    const { mascota, propietario, fecha, hora, sintomas } = cita

    //Cuando el usuario presiona agregar cita

    const submitCita = (e) => {
        e.preventDefault();
        //Validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }
        actualizarError(false);

        //Asignar un ID
        cita.id = uuidv4();

        //Crear la cita
        crearCita(cita)
        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return (
        <>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todo los campos son obligatorios</p> : null}

            <form onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}

                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}

                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}

                />
                <label>Sintomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}

                >

                </textarea>

                <button type="submit" className="u-full-width button-primary">Agregar</button>
            </form>
        </>
    );
};

export default Formulario;
