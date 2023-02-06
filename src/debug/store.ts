import { createSlice } from '@reduxjs/toolkit';
import { DebugState, DebugCommand } from '@/debug/types';

const initialState : DebugState = {
	commandHistory : [],
	log : []
}

const debugSlice = createSlice( {
	name : 'debug',
	initialState,
	reducers : {
		addCommand : ( state, action ) => {
			const { payload } = action;
			const commandParts = payload.split( ' ' );

			const func = commandParts.shift();

			const options : { [ k : string ] : any } = {};

			commandParts.map( ( option : string ) => {
				const [ key, value ] = option.split( '=' );
				options[ key ] = value;
			} );

			const lastCommand : DebugCommand = {
				func,
				options,
				raw : payload
			}

			state.lastCommand = lastCommand;
			state.commandHistory.push( lastCommand );			
		},
		addLog : ( state, action ) => {
			const { payload } = action;
			state.log.push( payload );
		},
		clearLog : ( state ) => {
			state.log = [];
		}
	}
} );

export const { addCommand, addLog, clearLog } = debugSlice.actions;
export default debugSlice.reducer;