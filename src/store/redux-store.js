import { configureStore } from "@reduxjs/toolkit";

//REDUCERS
import gameSlice from "./reducers/game-slice";

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export const gameActions = gameSlice.actions;

export default store;
