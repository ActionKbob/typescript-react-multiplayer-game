export const StatRow = ( { label, value } : any ) => {
	return(
		<div className="flex">
			<div className="w-[85px]">{ label }</div>
			<div className="px-2">:</div>
			<div dangerouslySetInnerHTML={ {__html : value } }></div>
		</div>
	)
}