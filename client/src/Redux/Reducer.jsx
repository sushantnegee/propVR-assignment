const initialData = {
    userDetails : {}
}


const Reducer = (state=initialData,action) => {
    switch(action.type){
        case  "LOGIN" :{
            return{
                userDetails : action.payload
            }
        }
        default : {
            return state
    
        }
    }
}

export default Reducer