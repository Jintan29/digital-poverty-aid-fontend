const config = {
    api_path: import.meta.env.VITE_API_PATH,
    line_api_path : import.meta.env.VITE_LINE_API_PATH,
    line_liff_id: import.meta.env.VITE_LINE_LIFF_ID,
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