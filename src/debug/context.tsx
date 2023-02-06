// import useKeyPress from "@/utilities/hooks/useKeyPress";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { NetworkingConsoleHooksType } from "@/networking/types";
import { DebugCommand } from "@/debug/types";

import useKeyPress from "@/utilities/hooks/useKeyPress";

import NetworkingConsoleHooks from "@/networking/consoleHooks";

import ConsoleWindow from "@/debug/components/consoleWindow";
import StatsWindow from "@/debug/components/statsWindow";
import Debugger from ".";

export const DebugContext = createContext<Object | null>( null );

export const DebugProvider = ( { children } : any ) => {

	const { lastCommand } = useSelector( ( state : any ) => state.debug );

	const [ debug, setDebug ] = useState( true );
	const windowToggle = useKeyPress( '~' );

	useEffect( () => {

		if( windowToggle )
			setDebug( d => !d );

	}, [ windowToggle ] );

	useEffect( () => {

		const sendCommand = async ( command : DebugCommand ) => {
			if( command === undefined )
				return;
			
			await Object.keys( NetworkingConsoleHooks ).forEach( ( key ) => {
				let result : any;
				if( key === command.func )
				{
					result = NetworkingConsoleHooks[ key as keyof NetworkingConsoleHooksType ]( command.options );

					if( result !== undefined )
					{
						if( typeof result === 'string' ) // If the result is a string, just add it to the log
						{
							Debugger.log( result );
						}
						else if( result.then ) // If the result is a promise, wait for it to resolve
						{
							result.then( ( response : any ) => {
								if( typeof response === 'string' )
									Debugger.success( result );
							} ).catch( ( error : any ) => {
								Debugger.error( result );
							} );
						}
					}
				}
			} );
		}

		sendCommand( lastCommand );

	}, [ lastCommand ] );

	return(
		<DebugContext.Provider value={ { } }>
			<ConsoleWindow isActive={debug} />
			<StatsWindow />
			{ children }
		</DebugContext.Provider>
	)
}

export const useDebug = () => useContext( DebugContext );