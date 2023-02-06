import { Provider } from "react-redux";
import { DebugProvider } from "@/debug/context";
import { buildProviderTree } from "@/utilities/providerTree";

import store from "@/store";

export default function App()
{
	const ContextProviders : any = buildProviderTree( [
		DebugProvider
	] );
	
	return (
		<Provider store={store}>
			<div className="App bg-sky-900 min-w-screen min-h-screen">
				<ContextProviders></ContextProviders>
			</div>
		</Provider>
	)
}
