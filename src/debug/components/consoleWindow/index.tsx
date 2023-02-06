import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';

import useKeyPress from '@/utilities/hooks/useKeyPress';

import { DebugWindowProps } from '@/debug/types';

import { addCommand, addLog, clearLog } from '@/debug/store';

import Output from '@/debug/components/consoleWindow/Output';

const ConsoleWindow = ( { isActive } : DebugWindowProps ) => {

	const dispatch = useDispatch();

	const { log, commandHistory } = useSelector( ( state : any ) => state.debug );

	const inputRef = useRef<HTMLInputElement>( null );
	const [ inputValue, setInputValue ] = useState<string>( "" );

	const [ historyIndex, setHistoryIndex ] = useState<number>( 0 );

	const enterCommand : boolean = useKeyPress( 'Enter' );
	const upKey : boolean = useKeyPress( 'ArrowUp' );
	const downKey : boolean = useKeyPress( 'ArrowDown' );

	useEffect( () => {
		if( isActive )
		{
			inputRef.current?.focus();
		}
		else
		{
			inputRef.current?.blur();
			setInputValue("");
		}
	}, [ isActive ] );

	useEffect( () => {
		if( isActive && enterCommand && inputValue !== "" )
		{
			if( inputValue === 'clear' )
			{
				dispatch( clearLog() );
			}
			else
			{
				batch( () => {
					dispatch( addCommand( inputValue ) );
					dispatch( addLog( `${'\u00BB'} ${inputValue}` ) );
				} );
			}
			
			setInputValue("");
			setHistoryIndex( 0 );
		}
	}, [ enterCommand ] );

	useEffect( () => {
		if( isActive )
		{
			if( upKey )
			{
				if( historyIndex < commandHistory.length )
				{
					setHistoryIndex( historyIndex + 1 );
					setInputValue( commandHistory[ commandHistory.length - historyIndex - 1 ].raw );
				}
			}

			if( downKey )
			{
				if( historyIndex - 1 > 0 )
				{
					setHistoryIndex( historyIndex - 1 );
					setInputValue( commandHistory[ commandHistory.length - historyIndex + 1 ].raw );
				}
				else
				{
					setInputValue( "" );
					setHistoryIndex( 0 );
				}
			}
		}
	}, [ upKey, downKey ] );
		
	return(
		<div id="console-window" className={ `absolute flex flex-col justify-end w-1/2 h-1/2 left-0 bg-slate-800 bg-opacity-50 text-sm text-gray-300 font-thin transition-[top] ease-in-out duration-300 ${ isActive ? 'top-0' : '-top-1/2' }` }>
			<Output log={ log } />
			<div className='flex p-2'>
				<div>&gt;&nbsp;</div>
				<input className='flex-grow bg-transparent border-none focus:outline-none' type="text" ref={ inputRef } value={ inputValue } onChange={ e => setInputValue( e.target.value.replace(/~/g, '') ) } />
			</div>
		</div>
	)
}

export default ConsoleWindow;