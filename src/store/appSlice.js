import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  provider: null,
  address: null,
  web3Modal: null
}

const appSlice = createSlice({
  name: "user",
  
  initialState,
  
  reducers: {
    setProvider(state, action) {
      state.provider = action.payload.provider;
      state.address = action.payload.address
    },
    clearProvider(state, action) {
      state.provider = null;
      state.address = null
    },
    setWeb3Modal(state, action) {
      state.web3Modal = action.payload;
    },
  }
});


export default appSlice.reducer;
export const { setProvider,setWeb3Modal,clearProvider } = appSlice.actions;