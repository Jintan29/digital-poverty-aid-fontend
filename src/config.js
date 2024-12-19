const config = {
    api_path: import.meta.env.VITE_API_PATH,
    token_name : 'senior_token',

    //alwys return new value token
    headers: ()=>{
        return{
            headers: {
                Authorization:'Bearer ' + localStorage.getItem('token')
            }
        }
    }
}

export default config