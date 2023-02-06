export type NetworkingConsoleHooksType = {
	generate_client_id : () => string;
	get_client_id : () => string;
	lobby_join : ( config? : LobbyConfig ) => void;
	lobby_leave : () => void;
}

export type NetworkingState = {
	clientId : string;
	socketState : number;
	lobbyKey? : string;
}

export type SocketState = {
	clientId : string;
	readyState : number;
}

export type LobbyState = {
	lobbyKey? : string;
	clients : string[];
}

export type LobbyConfig = {
	key? : string;
}