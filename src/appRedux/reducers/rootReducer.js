const initState = {
    posts:[
        {isLogin:false , userId:''}
    ]
}

const rootReducer = (state=initState,action)=>{
    console.log(action);
    debugger;
    if(action.type==='UPDATE_USER'){
       return {
        posts:[
            {isLogin:true , userId:action.userId}
        ]
       } 
    }
    return state;
}

export default rootReducer;