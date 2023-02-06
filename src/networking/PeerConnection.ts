const ICE_SERVER_CONFIG = {
	iceServers: [
		{
			urls: import.meta.env.VITE_ICE_STUN,
		},
		{
			urls: import.meta.env.VITE_ICE_TURN,
			credential: import.meta.env.VITE_ICE_TURN_CREDENTIAL,
			username: import.meta.env.VITE_ICE_TURN_USERNAME
		},
	]
};

export default class PeerConnection
{
	socket : WebSocket;
	localClientId : string;
	removeClientId : string;

	remoteDescriptionSet : boolean = false;

	connection : RTCPeerConnection;

	constructor( _socket : WebSocket, _localClientId : string, _removeClientId : string )
	{
		this.socket = _socket;
		this.localClientId = _localClientId;
		this.removeClientId = _removeClientId;

		this.connection = new RTCPeerConnection( ICE_SERVER_CONFIG );
	}
}