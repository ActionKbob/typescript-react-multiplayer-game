import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { SocketState } from "@/networking/types";
import { getClientId } from "@/networking/utilities";

const initialState : SocketState = {
	clientId : import.meta.env.MODE === 'development' ? uuid() : getClientId(),
	readyState : WebSocket.CLOSED
}

const socketSlice = createSlice( {
	name : 'socket',
	initialState,
	reducers : {
		setClientId : ( state, action ) => {
			const { payload } = action;
			state.clientId = payload;
		},
		setReadyState : ( state, action ) => {
			const { payload } = action;
			state.readyState = payload;
		}
	}
} );

export const { setClientId, setReadyState } = socketSlice.actions;
export default socketSlice.reducer;
