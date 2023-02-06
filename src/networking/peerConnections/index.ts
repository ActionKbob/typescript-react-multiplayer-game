class PeerConnection
{

}

export default class PeerConnections extends Map<string, PeerConnection>
{
	private localClient : string;

	constructor( _localClient :string, _clients : string[] )
	{
		super();
		this.localClient = _localClient;
		this.create( _clients.filter( c => { return c !== _localClient } ) );
	}

	create( clients : string[] ) : void
	{
		for( let i = 0; i < clients.length; i++ )
		{
			const client = clients[ i ];
			const peerConnection = new PeerConnection();
			this.set( client, peerConnection );
		}
	}
}