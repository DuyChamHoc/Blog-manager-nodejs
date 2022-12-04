import React from 'react'
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
export default function App() {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId='584132717591-e8pc50bre6bd3toj45m8fvrlgp8je6v4.apps.googleusercontent.com'>
                <Container maxWidth="lg">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/posts" />} />
                        <Route path="/posts" element={<Home />} />
                        <Route path="/posts/search" element={<Home />} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                        <Route path="/auth" element={!user ? <Auth /> : <Navigate replace to='/posts' />} />
                    </Routes>
                </Container>
            </GoogleOAuthProvider>
        </BrowserRouter>
    )
}
