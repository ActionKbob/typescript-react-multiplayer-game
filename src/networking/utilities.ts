import { v4 as uuid } from 'uuid';

export function generateClientId() : string
{
	const client_id = uuid();
	localStorage.setItem( 'client_id', client_id );
	return client_id;
}

export function getClientId() : string
{
	return localStorage.getItem( 'client_id' ) || generateClientId();
}