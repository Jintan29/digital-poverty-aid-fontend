const config = {
    api_path: import.meta.env.VITE_API_PATH,
    api_token_map: import.meta.env.VITE_API_MAPTOKEN,
    token_name : 'token',

    //alwys return new value token
    headers: ()=>{
        return{
            headers: {
                Authorization:'Bearer ' + localStorage.getItem(config.token_name)
            }
        }
    }
}

export default config