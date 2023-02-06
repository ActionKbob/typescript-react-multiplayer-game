export type DebugWindowProps = {
	isActive : boolean;
}

export type DebugCommand = {
	func : string;
	options? :  { [ k : string ] : any };
	raw : string;
}

export type DebugState = {
	lastCommand? : DebugCommand,
	commandHistory : DebugCommand[],
	log : string[]
}