import { generateClientId, getClientId } from "./utilities";
import { NetworkingConsoleHooksType } from "./types";
import { networkLobby } from ".";

const NetworkingConsoleHooks : NetworkingConsoleHooksType= {
	generate_client_id : generateClientId,
	get_client_id : getClientId,
	lobby_join : networkLobby.joinOrCreate.bind( networkLobby ),
	lobby_leave : networkLobby.leave.bind( networkLobby )
}

export default NetworkingConsoleHooks;