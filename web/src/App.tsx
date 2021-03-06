import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import "./App.css";
// import Users from "./components/Users";
import Landing from "./pages/Landing";
import { setContext } from "apollo-link-context";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Users from "./components/Users";
import IsAuthenticated from "./components/IsAuthenticated";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });
const authLink = setContext((req, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "http://localhost:4000",
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/users">Users</Link>
        <Switch>
          <Route exact path="/">
            Starting page
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <IsAuthenticated>
            <Route path="/users">
              <Users />
            </Route>
          </IsAuthenticated>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
