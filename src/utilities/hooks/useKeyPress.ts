import { useEffect, useState } from "react";

interface IKeyPressEvent {
	key : string;
}

export const useKeyPress = ( targetKey : string ) => {

	const [ keyPressed, setKeyPressed ] = useState( false );

	useEffect( () => {

		const downHandler = ( { key } : IKeyPressEvent ) => {
			if( key === targetKey )
				setKeyPressed( true );
		}
	
		const upHandler = ( { key } : IKeyPressEvent ) => {
			if( key === targetKey )
				setKeyPressed( false );
		}

		window.addEventListener( 'keydown', downHandler );
		window.addEventListener( 'keyup', upHandler );
		
		return () => {
			window.removeEventListener( 'keydown', downHandler );
			window.removeEventListener( 'keyup', upHandler );
		}
	}, [ targetKey ] );

	return keyPressed;
}

export default useKeyPress;