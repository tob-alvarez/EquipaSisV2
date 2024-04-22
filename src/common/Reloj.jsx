import { useState, useEffect } from 'react';
import moment from 'moment';

const Reloj = () => {
  const [currentDateTime, setCurrentDateTime] = useState(moment());

  useEffect(() => {
    // Actualizar la fecha y hora cada minuto
    const intervalId = setInterval(() => {
      setCurrentDateTime(moment());
    }, 60000); // 60000 ms = 1 minuto

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // La dependencia vacía asegura que solo se ejecute una vez al montar el componente

  // Formatear la fecha y hora actual
  const formattedDate = currentDateTime.format('DD/MM/YYYY');
  const formattedTime = currentDateTime.format('HH:mm');

  return (
    <div className='d-flex justify-content-center'>
      <p style={{margin: 0, fontSize: ".60rem"}} className='px-2'>Fecha: {formattedDate}</p>
      <p style={{margin: 0, fontSize: ".60rem"}} className='px-2'>Hora: {formattedTime}</p>
    </div>
  );
};

export default Reloj;
