import { useEffect, useRef } from 'react';

const ConsoleOutput = ( { log } : any ) => {
	const outputEnd = useRef<HTMLDivElement>( null );

	useEffect( () => {
		outputEnd.current?.scrollIntoView( { behavior : "smooth" } );
	}, [ log ] );

	return(
		<div className='d-flex overflow-auto flex-column p-2'>
			{ log.map( ( l : string, index : number ) => (
				<div key={ index } dangerouslySetInnerHTML={ { __html : l } } className=""></div>
			) ) }
			<div ref={ outputEnd }></div>
		</div>
	)
}

export default ConsoleOutput;