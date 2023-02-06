import EventEmitter from "events";
import { LobbyConfig } from "./types";

import store, { appDispatch } from "@/store";
import { setReadyState } from "./store/slices/socket";
import { batch } from "react-redux";
import { setClients, setLobbyKey } from "./store/slices/lobby";

export default class NetworkLobby
{
	private _socket : WebSocket | undefined;

	private _emitter : EventEmitter;
	public get emitter() : EventEmitter
	{
		return this._emitter;
	}

	public get readyState() : number
	{
		return this._socket?.readyState ?? WebSocket.CLOSED;
	}

	constructor()
	{
		this._emitter = new EventEmitter();
	}

	private async open() : Promise<WebSocket | undefined>
	{
		return new Promise( ( resolve, reject ) => {
			if( this._socket === undefined || this._socket.readyState === WebSocket.CLOSED )
			{
				const { clientId } = store.getState().networking.socket;
				this._socket = new WebSocket( `ws://${ import.meta.env.VITE_SOCKET_ENDPOINT }?id=${ clientId }` );

				this._socket.addEventListener( 'open', () => {
					appDispatch( setReadyState( this._socket?.readyState ) );
					resolve( this._socket );
				} );
				
				this._socket.addEventListener( 'message', this.handleMessage.bind( this ) );

				this._socket.addEventListener( 'close', () => {
					appDispatch( setReadyState( this._socket?.readyState ) );
					this._socket = undefined;
				} );
			}
			else
			{
				reject( `Socket is already open` );
			}
		} );
	}

	private async close() : Promise<void>
	{
		return new Promise( ( resolve, reject ) => {
			if( this._socket !== undefined && this._socket.readyState === WebSocket.OPEN )
			{
				this._socket.close();
				resolve();
			}
			else
			{
				reject( `Socket is already closed` );
			}
		} );
	}

	private handleMessage( event : MessageEvent )
	{
		const { type, payload } = JSON.parse( event.data );
		switch( type )
		{
			case 'lobby_joined' :
				batch( () => {
					appDispatch( setReadyState( this._socket?.readyState ) );
					appDispatch( setLobbyKey( payload.key ) );
					appDispatch( setClients( payload.clients ) );
				} );				
				break;

			case 'lobby_left' :
				batch( () => {
					appDispatch( setLobbyKey( undefined ) );
					appDispatch( setClients( [] ) );
				} );

				this.close();
				break;
		}

		this._emitter.emit( type, payload );
	}

	public async joinOrCreate( config? : LobbyConfig ) : Promise<string | void>
	{
		return new Promise( ( resolve, reject ) => {
			if( this._socket === undefined || this._socket.readyState === WebSocket.CLOSED )
			{
				this.open().then( () => {
					this.joinOrCreate( config ).then( ( message ) => {
						resolve( message );
					} )
					.catch( ( error ) => {
						reject( error );
					} );
				} )
				.catch( ( error ) => {
					reject( error );
				} );
			}
			else
			{
				this._socket.send( JSON.stringify( {
					type : 'join_or_create_lobby',
					payload : config?.key
				} ) );
				
				// Debugger.warn( `${ key ? 'Joining' : 'Creating' } lobby...` )
				resolve();
			}
		} );
	}

	public async leave() : Promise<void>
	{
		return new Promise( ( resolve, reject ) => {
			if( this._socket !== undefined && this._socket.readyState === WebSocket.OPEN )
			{
				this._socket.send( JSON.stringify( {
					type : 'leave_lobby'
				} ) );
				resolve();
			}
			else
			{
				reject( `Socket is already closed` );
			}
		} );
	}
}