import { makeStyles } from '@material-ui/core';
import { AccountCircle, Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames';
import LoginForm from 'features/Auth/Components/LoginForm';
import RegisterForm from 'features/Auth/Components/RegisterForm';
import { login, logout, register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    link: {
        color: "#fff",
        textDecoration: "none",
    },
    closeButton: {
      position: 'absolute !important',
      top: theme.spacing(1),
      right: theme.spacing(1),
      color: theme.palette.grey[500],
      // right: theme.spacing(1),
      marginLeft: theme.spacing(35),
      xIndex: 1,
    }
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register'
}

export default function Header() {

  const loggedInUser = useSelector(state => state.user.current);
  const isLoggedIn = !! loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN)
  const [anchorEl, setAnchorEl] = useState(null)
  const  dispatch = useDispatch();  
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const onSubmitRegister = async (values) => {
    try {
        const action = register(values);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        enqueueSnackbar('Register succesfully', {variant: "success"});
        setOpen(false );
      } catch (error) {
        enqueueSnackbar(error.message, {variant: "error"});
    }
  }

  const onSubmitLogin = async (values) => {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);
            setOpen(false);
            }
        catch (error) {
            enqueueSnackbar(error.message, {variant: "error"});
        }

  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  }

    const chasses = useStyles();

  return (
    <Box  sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <CodeIcon className={classNames.menuButton}/>

          <Typography variant="h6" component="div"  sx={{ flexGrow: 1 }}>
            <Link className={chasses.link} to="/">Shop Dragons</Link>
          </Typography>
          
          <NavLink className={chasses.link} to="/todos">
          <Button color="inherit">Todo</Button>
          </NavLink>
          
          <NavLink className={chasses.link} to="/albums">
            <Button color="inherit">Album</Button>
          </NavLink>
          
            {!isLoggedIn &&  (
              <Button color="inherit" onClick={handleClickOpen} >Login</Button>
            )}
            
            {isLoggedIn && (
              <IconButton  color="inherit"  onClick={handleUserClick}>
                <AccountCircle />
              </IconButton>
            )}
        </Toolbar>
      </AppBar>

      <Menu  
       keepMounted
       anchorEl = {anchorEl}
       open = {Boolean(anchorEl)}
       onClose = {handleCloseMenu}
       anchorOrigin = {{
         vertical: 'bottom',
         horizontal: 'right',
       }}
       transformOrigin={{
         vertical: 'top',
         horizontal: 'right',
       }}
      >
        <MenuItem onClick={handleCloseMenu}>My Account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose} onBackdropClick="false">

        <IconButton className={chasses.closeButton} onClick={handleClose}>
            <Close  />
        </IconButton> 

        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
            <RegisterForm onSubmit={onSubmitRegister} />

            <Box textAlign="center">

              <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                Already have an acount. Login here
              </Button>
            </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
            <LoginForm onSubmit={onSubmitLogin} />

            <Box textAlign="center">

              <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                Don't have an acount. Register here
              </Button>
            </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
