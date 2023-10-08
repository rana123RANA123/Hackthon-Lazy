import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Routes from './Pages/Routes'
import { useAuthContext } from './contexts/AuthContext';


function App() {
  const { isAppLoading } = useAuthContext()

  if (isAppLoading)
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    )

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
