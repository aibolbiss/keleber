import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { login, register } from '../../actions/user';
import { useValue } from '../../context/ContextProvider';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Логин');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isRegister) return login({ email, password }, dispatch);
    const name = nameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword)
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Пароли не совпадают',
        },
      });
    register({ name, email, password }, dispatch);
  };

  useEffect(() => {
    isRegister ? setTitle('Регистрация') : setTitle('Войти');
  }, [isRegister]);
  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
    >
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form
        onSubmit={handleSubmit}
        style={{ margin: '0px' }}
      >
        <DialogContent dividers>
          <DialogContentText>
            Заполните свои данные в полях ниже:
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin='normal'
              variant='standard'
              id='name'
              label='Имя'
              type='text'
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin='normal'
            variant='standard'
            id='email'
            label='Email'
            type='email'
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id='confirmPassword'
              label='Повторить пароль'
            />
          )}
        </DialogContent>
        <DialogActions sx={{ p: '20px' }}>
          <Button
            type='submit'
            variant='contained'
            endIcon={<Send />}
          >
            Отправить
          </Button>
        </DialogActions>
      </form>
      <DialogActions
        sx={{ justifyContent: 'left', p: '5px 24px', fontFamily: 'Roboto' }}
      >
        {isRegister ? 'Есть учетная запись? ' : 'Нет учетной записи?'}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
        <GoogleOneTapLogin />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
