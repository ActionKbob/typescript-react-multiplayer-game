import { configureStore } from '@reduxjs/toolkit';
import debug from '@/debug/store';
import networking from '@/networking/store';

const store = configureStore({
	reducer : {
		networking,
		debug
	}
} );

export const appDispatch = store.dispatch;

export default store;