import Formulario from "./components/Formulario"
import Cita from "./components/Cita";
import { useState ,useEffect} from "react"
function App() {


  //Citas en los local storage

  let citasIniciales = JSON.parse(localStorage.getItem('citas'))

  if(!citasIniciales){
    citasIniciales =[];
  }



  const [citas, guardarCitas] = useState(citasIniciales);

  //Use Effect para realizar cierta operaciones cuando el state cambia

  useEffect(()=>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))

    if(citasIniciales){
      localStorage.setItem('citas',JSON.stringify(citas))
    }else{
      localStorage.setItem('citas',JSON.stringify([]))

    }
  },[citas])

  //Funciona que tome cita actuales y agregue la nueva

  const crearCita = cita => {
    guardarCitas([
      ...citas, cita
    ])
  }
  //Funcion que elimina una cita por su id

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  const titulo=citas.length ===0 ? 'No hay citas' :'Administra tus Citas'
  return (
    <>
      <h1>Administracion de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
