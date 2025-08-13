import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [empleados, setEmpleados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/empleados')
      .then(res => {
        if (!res.ok) throw new Error('Error fetching empleados')
        return res.json()
      })
      .then(data => {
        setEmpleados(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Agrupar empleados por área
  const empleadosPorArea = empleados.reduce((acc, emp) => {
    acc[emp.area] = acc[emp.area] || []
    acc[emp.area].push(emp)
    return acc
  }, {})

  if (loading) return <p>Cargando empleados...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Lista de Empleados</h1>
      {Object.entries(empleadosPorArea).map(([area, lista]) => (
        <div key={area} style={{marginBottom: '2rem'}}>
          <h2>
            {area} ({lista.length})
          </h2>
          <ul>
            {lista.map(emp => (
              <li
                key={emp.id}
                style={{cursor: 'pointer', color: empleadoSeleccionado?.id === emp.id ? 'blue' : 'black'}}
                onClick={() => setEmpleadoSeleccionado(emp)}
              >
                <strong>{emp.nombre}</strong> | Edad: {emp.edad} | Antigüedad: {emp.antiguedad_anios} años
              </li>
            ))}
          </ul>
        </div>
      ))}

      {empleadoSeleccionado && (
        <div style={{border: '1px solid #ccc', padding: '1rem', marginTop: '2rem'}}>
          <h2>Detalle de {empleadoSeleccionado.nombre}</h2>
          <p><b>Área:</b> {empleadoSeleccionado.area}</p>
          <p><b>Edad:</b> {empleadoSeleccionado.edad}</p>
          <p><b>Antigüedad:</b> {empleadoSeleccionado.antiguedad_anios} años</p>
          <p><b>Teléfono:</b> {empleadoSeleccionado.telefono}</p>
          <button onClick={() => setEmpleadoSeleccionado(null)}>Cerrar</button>
        </div>
      )}
    </div>
  )
}

export default App