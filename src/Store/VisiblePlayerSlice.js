import {createSlice} from "@reduxjs/toolkit"

export const visiblePlayersSlice = createSlice({
    name: "visiblePlayersSlice",
    initialState: [],
    reducers: {
        addSource: (sources, action) => {
            sources.push(action.payload);
        },
        removeSource: (sources, action) => {
            const sourceIndex = sources.indexOf(action.payload);
            sources.splice(sourceIndex, 1);
        }
    }
})

export const {addSource, removeSource} = visiblePlayersSlice.actions

export default visiblePlayersSlice.reducer