import React from 'react';
import {
  //a special type of React component that we'll use to provide data to all of the other components
  ApolloProvider,
  //a constructor function that will help initialize the connection to the GraphQL API server.
  ApolloClient,
  //enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently
  InMemoryCache,
  //allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests
  createHttpLink,
} from '@apollo/client';

// import page components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

//BrowserRouter, Routes, and Route are components that the React Router library provides. We renamed BrowserRouter to Router to make it easier to work with.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// establish a new link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

//instantiate the Apollo Client instance and create the connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/thought/:id" element={<SingleThought />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
