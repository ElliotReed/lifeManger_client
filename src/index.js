import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('life-manager');

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: 'http://localhost:4011/graphql',
});

const client = new ApolloClient({
	cache,
	link,
});

ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>,
	root
);

const render = Component => {
	return ReactDOM.render(
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>,
		root
	);
};

render(App);

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./components/App').default;
//     render(NextApp);
//   });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
