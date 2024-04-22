import axiosOriginal from 'axios'

const axios = axiosOriginal.create({
    baseURL: "https://v2.equipasis.com/api/usuarios.php?"
    // baseURL: "http://172.16.9.97:4000"
})

export default axios;