import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  provider: null,
  web3Provider: null
}

const appSlice = createSlice({
  name: "user",
  
  initialState,
  
  reducers: {
    setProvider(state, action) {
      state.provider = action.payload;
    },
    setWeb3Provider(state, action) {
      state.web3Provider = action.payload;
    },
  }
});


export default appSlice.reducer;
export const { setProvider,setWeb3Provider } = appSlice.actions;