import { useSelector } from "react-redux";
import { StatRow } from "./StatRow";

const readyStateLabels = [ 
	'<span class="text-amber-500">Connecting</span>', 
	'<span class="text-lime-500">Open</span>', 
	'<span class="text-amber-500">Closing</span>', 
	'<span class="text-red-500">Closed</span>'
];

const StatsWindow = () => {

	const { clientId, readyState } = useSelector( ( state : any ) => state.networking.socket );
	const { lobbyKey, clients } = useSelector( ( state : any ) => state.networking.lobby );

	return(
		<div id="stats-window" className="text-stone-200 p-2 text-xs font-light pointer-events-none">
			<div>
				<StatRow label="Client ID" value={ clientId } />
				<StatRow label="Network State" value={ readyStateLabels[ readyState ] } />
				<StatRow label="Lobby Key" value={ lobbyKey ? lobbyKey : '----' } />
				<StatRow label="# Clients" value={ clients ? clients.length : '--' } />
			</div>
		</div>
	)
}

export default StatsWindow;