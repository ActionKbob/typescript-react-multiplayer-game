import { ContextProps } from "@/types";


export function buildProviderTree( providers : Array<any> ) : Array<Function>
{
	
	if( providers.length === 1 )
		return providers[0];
	
	const ProviderA : Function = providers.shift();
	const ProviderB : Function = providers.shift();

	return( [
		( { children } : ContextProps ) => {
			<ProviderA>
				<ProviderB>
					{ children }
				</ProviderB>
			</ProviderA>
		},
		...providers
	] );
}

export default buildProviderTree;