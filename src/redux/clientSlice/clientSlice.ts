import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message:'',
    code:''
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    updateCode : (state , actions)=>{
        state.code = actions?.payload
    }
  },
});

export const { updateCode } = clientSlice.actions;

export default clientSlice.reducer;
