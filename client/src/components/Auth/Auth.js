import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Icon from './icon'
import useStyles from './styles'
import Input from './Input'
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    let navigate = useNavigate();
    const disspatch = useDispatch();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            disspatch(signup(formData, navigate))
        } else {
            disspatch(signin(formData, navigate))
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const switchMode = () => {
        setFormData(initialState)
        setIsSignUp((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }
    const googleSuccess = async (res) => {
        const result = jwt_decode(res.credential);
        const token = result.jti;
        try {
            disspatch({ type: 'AUTH', data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try Again Later');
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container >
    )
}

export default Auth