import './asset/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Main from './Pages/Main';
import Auth from './Pages/Auth';
import User from './Pages/User';






function App() {

  return (
    <>
      <div className="App">
        <Main />
        <Auth />
        <User />
     
      </div>
    </>
  );
}
export default App;
