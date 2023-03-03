import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';
import { api } from '../../api/backend-api';
import { StartContainerRequest, StartContainerResponse } from 'common-src';

interface StartContainerState {
  status: Status;
  error: Error;
}

const initialState: StartContainerState = {
  status: 'idle',
  error: null,
};

export const startContainerThunk = createAsyncThunk<StartContainerResponse, StartContainerRequest>(
  'containers/startContainer',
  (startContainerRequest) => api.v1ContainerDbContainerIdStartPost(startContainerRequest)
);

const startContainerSlice = createSlice({
  name: 'startContainer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(startContainerThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(startContainerThunk.fulfilled, (state) => {
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(startContainerThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
  },
});

export const startContainerActions = startContainerSlice.actions;
export const startContainerReducer = startContainerSlice.reducer;