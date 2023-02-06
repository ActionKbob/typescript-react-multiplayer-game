import { appDispatch } from "@/store";
import { addLog } from "@/debug/store";

const Debugger = {
	log : ( message : string ) => {
		appDispatch( addLog( message ) );
	},
	success : ( message : string ) => {
		appDispatch( addLog( `<span class="text-lime-500">${ message }</span>` ) );
	},
	warn : ( message : string ) => {
		appDispatch( addLog( `<span class="text-amber-500">${ message }</span>` ) );
	},
	error : ( message : string ) => {
		appDispatch( addLog( `<span class="text-red-500">${ message }</span>` ) );
	}
}

export default Debugger;
