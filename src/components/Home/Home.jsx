import { useTranslation } from "react-i18next"

const Home = () => {
  const [t] = useTranslation("global")

  return (
    <div>
      <h2>{t("inicio.bienvenida")}</h2>
    </div>
  )
}

export default Home