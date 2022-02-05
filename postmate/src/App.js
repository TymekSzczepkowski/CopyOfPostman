import { useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu/Menu";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/404/404";
import Login from "./pages/Auth/Login/Login";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute";
import { reducer, intialState } from "./reducer";
import Register from "./pages/Auth/Register/Register";
import useWebsiteTitle from "./hooks/useWebsiteTitle";
import Activate from "./pages/Auth/Activate/Activate";
import Request from "./pages/Request/Request";
import About from "./pages/About/About";
import History from "./pages/History/History";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  useWebsiteTitle("Postmate API Platform | Sign Up for Free");
  const menu = <Menu />;

  const content = (
    <div>
      <Switch>
        <AuthenticatedRoute path='/profile' component={Profile} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/' exact component={Home} />
        <Route
          path='/activate/:uidFromUrl/:tokenFromUrl'
          component={Activate}
        />
        <Route path='/request' exact component={Request} />
        <Route path='/about' exact component={About} />
        <AuthenticatedRoute path='/history' component={History} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: state.user,
          login: (user) => dispatch({ type: "login", user }),
          logout: () => dispatch({ type: "logout" }),
        }}>
        <ReducerContext.Provider
          value={{
            state,
            dispatch,
          }}>
          <Layout menu={menu} content={content} />
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
