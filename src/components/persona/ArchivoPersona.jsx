import { useParams } from 'react-router-dom';

const ArchivoPersona = () => {

    const { id_persona } = useParams();

    return (
        <div>
            <h1>Archivos de la persona con ID: {id_persona}</h1>
            {/* Resto del código para mostrar los archivos */}
        </div>
    )
}

export default ArchivoPersona