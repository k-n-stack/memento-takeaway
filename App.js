import { Provider } from 'react-redux';
import store from "./Store/Store";
import Login from './Component/Views/Login';


export default function App() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}