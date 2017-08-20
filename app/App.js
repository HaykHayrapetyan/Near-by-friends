import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './reducers/store';
import Layout from './components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/style.sass';

const App = () => {
	injectTapEventPlugin();
	return (
		<MuiThemeProvider>
			<Provider store={store}>
				<Layout />
			</Provider>
		</MuiThemeProvider>
	);
}

render(<App />, document.getElementById("app"));
