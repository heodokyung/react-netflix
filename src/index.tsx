import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './theme';
import reset from 'styled-reset';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    line-height: 1;
    font-family: 'Source Sans Pro', sans-serif;
    color:${(props) => props.theme.white.darker};
    background-color: black;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color:inherit;
  }
`;
const client = new QueryClient();
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<QueryClientProvider client={client}>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<App />
				</ThemeProvider>
			</QueryClientProvider>
		</RecoilRoot>
	</React.StrictMode>,
);
