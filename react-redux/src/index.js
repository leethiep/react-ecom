import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ThemeProvider, createTheme } from "@mui/material";
import '../src/assets/css/main.min.css';

import { primaryColor } from "./assets/variables/color";



const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
