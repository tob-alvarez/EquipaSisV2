import { useTranslation } from "react-i18next"

const Home = () => {
  const [t, i18n] = useTranslation("global")
  const handleChangeLanguage = (lang) =>{
    i18n.changeLanguage(lang)
  }
  return (
    <div>
      <h2>{t("inicio.bienvenida")}</h2>
    </div>
  )
}

export default Home