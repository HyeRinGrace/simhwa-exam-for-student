import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { waitTwoSeconds } from '../../utils';

// 2초 지연을 시키는 thunk 함수 정의
export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload) => {
    await waitTwoSeconds(); // 2초 지연
    return payload; // payload 반환
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload) => {
    await waitTwoSeconds(); // 2초 지연
    return payload; // payload 반환
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 일반적인 동기적인 액션은 여기에 추가
    addTodo: (state, action) => {
      state.list.push(action.payload); // 투두 리스트에 항목 추가
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.payload); // 투두 리스트에서 항목 삭제
    },
  },
  extraReducers: builder => {
    // 비동기 액션 처리
    builder.addCase(__addToDo.fulfilled, (state, action) => {
      state.list.push(action.payload); // 투두 리스트에 항목 추가
    });
    builder.addCase(__deleteTodo.fulfilled, (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.payload); // 투두 리스트에서 항목 삭제
    });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
