import './Footer.css'
import logoBme from '../assets/bme.png'
import { useContext } from 'react';
import { EquipaContext } from '../context/EquipaContext';
const Footer = () => {

  const { t } = useContext(EquipaContext);

  return (
    <div className='footer'>
        <img src={logoBme} className='logoBme' />
        <p className='text-white m-0'>{t("footer.derechosReservados")} © (2016 - 2024)</p>
    </div>
    //logo
  )
}

export default Footer