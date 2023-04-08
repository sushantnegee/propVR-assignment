const Action  = (data,dispatch)=>{
    dispatch({
        type:"LOGIN",
        payload:data
    })
}

export default Action