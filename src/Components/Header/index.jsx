import CodeIcon from '@mui/icons-material/Code';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import Register from 'features/Auth/Components/Register';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    link: {
        color: "#fff",
        textDecoration: "none",
    },
}));

export default function Header() {

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const chasses = useStyles();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
        <CodeIcon className={classNames.menuButton}/>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className={chasses.link} to="/"> ReactJS </Link>
          </Typography>
          
          <NavLink className={chasses.link} to="/todos">
          <Button color="inherit">Todo</Button>
          </NavLink>
          
          <NavLink className={chasses.link} to="/albums">
            <Button color="inherit">Album</Button>
          </NavLink>
          
            <Button color="inherit" onClick={handleClickOpen}>Register</Button>
        </Toolbar>
      </AppBar>

      <Dialog disableEscapeKeyDown onBackdropClick="false" open={open} onClose={handleClose}>
        <DialogContent>
          <Register />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
