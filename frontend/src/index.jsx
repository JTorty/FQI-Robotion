import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import Header from './header';
import Body from './body';
import Footer from './footer';
import reportWebVitals from './reportWebVitals';
import Container from "@mui/material/Container";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Container maxWidth="false" className="App">
            <Header/>
            <Body/>
            <Footer/>
        </Container>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
