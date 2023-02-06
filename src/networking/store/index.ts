import { combineReducers } from "@reduxjs/toolkit";

import socketReducer from "./slices/socket";
import lobbyReducer from "./slices/lobby";

const networkingReducer = combineReducers( {
	socket : socketReducer,
	lobby : lobbyReducer
} );

export default networkingReducer;