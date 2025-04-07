const initialState={
    cart:{},
    user:{},
    orders:[]
}

export default function rootReducer(state=initialState,action)
{
    switch(action.type)
    {
        case "ADD_CART":
            
            state.cart[action.payload[0]]=action.payload[1]
            return ({cart:state.cart,user:state.user,orders:state.orders}) 
        case "DELETE_CART":
            
            delete state.cart[action.payload[0]]
            return ({cart:state.cart,user:state.user,orders:state.orders})  
        case "ADD_USER":
            const newUserState = {...state.user};
            newUserState[action.payload[0]] = action.payload[1];
            return ({cart:state.cart, user:newUserState, orders:state.orders});
        case "CLEAR_CART":
            return ({cart:{},user:state.user,orders:state.orders})
        case "ADD_ORDER":
            return ({cart:state.cart,user:state.user,orders:[...state.orders, action.payload]})
        case "CLEAR_ORDERS":
            return ({cart:state.cart,user:state.user,orders:[]})
        case "LOGOUT":
            return ({cart:{},user:{},orders:[]})
        default:
            return ({cart:state.cart,user:state.user,orders:state.orders})
    }
}