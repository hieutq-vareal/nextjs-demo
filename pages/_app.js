import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from 'react-redux';
import Store from '../Lib/redux'

export default ({ Component, pageProps }) => {
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>
  )
};
