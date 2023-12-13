import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  productsTotalQuantity: 0,
  productsTotalAmount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
    const existingProductIndex = state.products.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
      
      state.products[existingProductIndex].quantity += 1;
      state.products[existingProductIndex].totalPrice += action.payload.price;
    } else {
      
      state.products.push(action.payload);
    }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
    const existingProductIndex = state.products.findIndex(item => item.id === id);
      state.products[existingProductIndex].quantity += 1;
      state.products[existingProductIndex].totalPrice += action.payload.price;
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
    const existingProductIndex = state.products.findIndex(item => item.id === id);
      state.products[existingProductIndex].quantity -= 1;
      state.products[existingProductIndex].totalPrice -= action.payload.price;
    },
    removeFromCart: (state, action) =>{
      state.products = state.products.filter(item => item.id !== action.payload.id)
    },
    resetCart: (state) =>{
      state.products = []
    },
    getTotalProducts: (state) =>{
      const total = state.products.reduce((accumulator, product) => {
        return accumulator + product.totalPrice;
      }, 0);
      
      const totalQuantity = state.products.reduce((accumulator, product) => {
        if(accumulator === 0){
          return product.quantity;
        }else{
          return accumulator + product.quantity;
        }
        
      }, 0);

    
      return { ...state, productsTotalAmount: total,productsTotalQuantity: totalQuantity  };

    
    },
  },
})


export const { addToCart , removeFromCart, resetCart, incrementQuantity,decrementQuantity, getTotalProducts} = cartSlice.actions

export default cartSlice.reducer