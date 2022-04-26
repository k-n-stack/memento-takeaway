import { Provider } from 'react-redux';
import store from "./Store/Store";
// import Login from './Component/Views/Login';
import Navigation from './Container/Navigation';


export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}