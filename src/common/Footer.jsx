import './Footer.css'
import logoBme from '../assets/bme.png'
const Footer = () => {
  return (
    <div className='footer'>
        <p className='text-white m-0'>Todos los derechos reservados © (2016 - 2024)</p>
        <img src={logoBme} className='logoBme' />
    </div>
    //logo
  )
}

export default Footer