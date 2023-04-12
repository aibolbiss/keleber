import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import { AddLocationAlt, Apps, Map } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import ClusterMap from './map/ClusterMap';
import Rooms from './rooms/Rooms';
import AddRoom from './addRoom/AddRoom';
import Protected from './protected/Protected';
import { useValue } from '../context/ContextProvider';

const BottomNav = () => {
  const {
    state: { section },
    dispatch,
  } = useValue();
  const ref = useRef();
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [section]);
  return (
    <Box ref={ref}>
      {
        {
          0: <ClusterMap />,
          1: <Rooms />,
          2: (
            <Protected>
              <AddRoom />
            </Protected>
          ),
        }[section]
      }
      <Paper
        elevation={3}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={section}
          onChange={(e, newValue) =>
            dispatch({ type: 'UPDATE_SECTION', payload: newValue })
          }
        >
          <BottomNavigationAction
            label='Карта'
            icon={<Map />}
          />
          <BottomNavigationAction
            label='Главная'
            icon={<Apps />}
          />
          <BottomNavigationAction
            label='Добавить'
            icon={<AddLocationAlt />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;