import { Lock } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Container } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';

const AccessMessage = () => {
  const { dispatch } = useValue();
  return (
    <Container sx={{ py: 10 }}>
      <Alert
        severity='error'
        variant='outlined'
      >
        <AlertTitle>Запрещенный доступ</AlertTitle>
        <p>
          Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к
          этой странице
        </p>
        <Button
          variant='outlined'
          startIcon={<Lock />}
          onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
        >
          Войти
        </Button>
      </Alert>
    </Container>
  );
};

export default AccessMessage;
