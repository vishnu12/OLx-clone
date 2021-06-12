import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { FireBaseProvider } from './store/FirebaseContext'
import { AuthProvider } from './store/AuthContext';


ReactDOM.render(
    <Router>
        <FireBaseProvider>
            <AuthProvider>
            <App />
            </AuthProvider>
        </FireBaseProvider>
    </Router>
    , document.getElementById('root'));
