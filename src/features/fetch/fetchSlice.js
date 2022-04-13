import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

export const fetchAsyncGet = createAsyncThunk(
  "fetch/get", // asyncの名前を付けている
  async () => {
    const res = await axios.get(apiUrl);
    return res.data;
  }
);

const fetchSlice = createSlice({
  name: "fetch",
  initialState: { users: [] },
  reducers: {},

  extraReducers: (builder) => {
    /* createAsyncThunkは、非同期処理の結果を３種類返す。
    fulfilled成功、pending保留、rejected失敗
     */
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    });
  },
});

// コンポーネントから利用するため
export const selectUsers = (state) => state.fetch.users;
export default fetchSlice.reducer;
