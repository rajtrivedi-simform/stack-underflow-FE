import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Question } from "../../../entities/question/types";
import { getQuestions } from "../api/getQuestions";

interface QuestionsState {
  items: Question[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuestionsState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchQuestions = createAsyncThunk<
  Question[],
  void,
  { rejectValue: string }
>("questions/fetchQuestions", async (_, thunkApi) => {
  try {
    const response = await getQuestions();
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(
      error instanceof Error ? error.message : "Failed to load questions",
    );
  }
});

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to load questions";
      });
  },
});

export default questionsSlice.reducer;
