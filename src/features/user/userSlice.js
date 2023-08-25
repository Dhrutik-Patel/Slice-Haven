import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}

const initialState = {
  username: null,
  status: 'idle',
  position: { latitude: null, longitude: null },
  address: null,
};

export const fetchAddressThunk = createAsyncThunk(
  'user/fetchAddress',
  async () => {
    try {
      const data = await fetchAddress();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddressThunk.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAddressThunk.fulfilled, (state, action) => {
      state.status = 'idle';
      state.position = action.payload.position;
      state.address = action.payload.address;
    });
    builder.addCase(fetchAddressThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { updateUsername } = userSlice.actions;
export default userSlice.reducer;
