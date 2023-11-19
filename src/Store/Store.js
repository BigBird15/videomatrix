import {configureStore} from "@reduxjs/toolkit";
import visiblePlayersReducer from "./VisiblePlayerSlice";

export default configureStore({
    reducer: {
        visiblePlayers: visiblePlayersReducer
    }
})