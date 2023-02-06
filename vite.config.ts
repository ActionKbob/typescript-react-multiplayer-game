import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig( {
	resolve : {
		alias : [
			{
				find : '@',
				replacement : path.resolve( __dirname, './src' )
			}
		],
	},
	server : {
		port : 3000,
	},
	plugins : [ react() ],
} );