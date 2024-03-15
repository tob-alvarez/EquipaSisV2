import './Footer.css'
import logoBme from '../assets/bme.png'
const Footer = () => {
  return (
    <div className='footer'>
        <img src={logoBme} className='logoBme' />
        <p className='text-white m-0'>Todos los derechos reservados © (2016 - 2024)</p>
    </div>
    //logo
  )
}

export default Footer