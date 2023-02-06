import { createSlice } from '@reduxjs/toolkit';
import { LobbyState } from '@/networking/types';

const initialState : LobbyState = {
	clients : []
}

const lobbySlice = createSlice( {
	name : 'lobby',
	initialState,
	reducers : {
		setLobbyKey : ( state, action ) => {
			const { payload } = action;
			state.lobbyKey = payload;
		},
		clearLobbyKey : ( state ) => {
			state.lobbyKey = undefined;
		},
		setClients : ( state, action ) => {
			const { payload } = action;
			state.clients = payload;
		},
		addClient : ( state, action ) => {
			const { payload } = action;
			state.clients.push( payload );
		},
		removeClient : ( state, action ) => {
			const { payload } = action;
			state.clients = state.clients.filter( client => client !== payload );
		}
	}
} );

export const { setLobbyKey, clearLobbyKey, setClients, addClient, removeClient } = lobbySlice.actions;
export default lobbySlice.reducer;