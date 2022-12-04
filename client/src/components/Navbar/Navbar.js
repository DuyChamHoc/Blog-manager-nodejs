import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'
import useStyles from './styles'
import memories from '../../images/memories.jpg'
const Navbar = () => {
    let navigate = useNavigate();
    const disspatch = useDispatch();
    const location = useLocation();
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(() => {
        try {
            const token = user?.token;
            if (token) {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 < new Date().getTime()) logout();
            }
        } catch (error) {

        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
    const logout = () => {
        setUser(null)
        disspatch({ type: 'LOGOUT' })
        setUser(null)
        googleLogout();
        navigate('/auth');
    }
    return (
        <AppBar className={classes.appBar} position='static' color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'> Memories</Typography>
                <img className={classes.image} src={memories} alt="memoties" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar