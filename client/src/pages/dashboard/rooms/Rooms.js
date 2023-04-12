import { useEffect, useMemo, useState } from 'react';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useValue } from '../../../context/ContextProvider';
import { getRooms } from '../../../actions/room';
import moment from 'moment';
import { grey } from '@mui/material/colors';
import RoomsActions from './RoomsActions';
import isAdmin from '../utils/isAdmin';

const Rooms = ({ setSelectedLink, link }) => {
  const {
    state: { rooms, currentUser },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setSelectedLink(link);
    if (rooms.length === 0) getRooms(dispatch);
  }, []);

  const columns = useMemo(
    () => [
      {
        field: 'images',
        headerName: 'Фото',
        width: 70,
        renderCell: (params) => (
          <Avatar
            src={params.row.images[0]}
            variant='rounded'
          />
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: 'price',
        headerName: 'Цена',
        width: 70,
        renderCell: (params) => params.row.price + ' ₸',
      },
      { field: 'title', headerName: 'Заголовок', width: 170 },
      { field: 'description', headerName: 'Описание', width: 200 },
      { field: 'lng', headerName: 'Долгота', width: 110 },
      { field: 'lat', headerName: 'Широта', width: 110 },

      {
        field: 'uName',
        headerName: 'Автор',
        width: 80,
        renderCell: (params) => (
          <Tooltip title={params.row.uName}>
            <Avatar src={params.row.uPhoto} />
          </Tooltip>
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Дата создания',
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
      },
      { field: '_id', hide: true },
      {
        field: 'actions',
        headerName: 'Действия',
        type: 'actions',
        width: 150,
        renderCell: (params) => <RoomsActions {...{ params }} />,
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
      }}
    >
      <Typography
        variant='h3'
        component='h3'
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Объявления
      </Typography>
      <DataGrid
        localeText={{
          columnMenuUnsort: 'Сортировка',
          columnMenuSortAsc: 'Сортировать по возрастанию',
          columnMenuSortDesc: 'Сортировать по убыванию',
          columnMenuFilter: 'Фильтр',
          columnMenuHideColumn: 'Скрыть',
          columnMenuShowColumns: 'Показать столбцы',
          columnsPanelHideAllButton: 'Скрыть все',
          columnsPanelShowAllButton: 'Показать все',
          footerTotalRows: 'Всего строк:',
          columnsPanelTextFieldLabel: 'Найти столбец',
          columnsPanelTextFieldPlaceholder: 'Заголовок столбца',
          filterPanelInputPlaceholder: 'Значение фильтра',
          filterPanelInputLabel: 'Значение',
          filterPanelColumns: 'Столбцы',
          filterPanelLogicOperator: 'Логические операторы',
          filterPanelOperator: 'Операторы',

          filterOperatorContains: 'содержит',
          filterOperatorEquals: 'равен',
          filterOperatorStartsWith: 'начинается с',
          filterOperatorEndsWith: 'заканчивается на',
          filterOperatorIs: 'равен',
          filterOperatorNot: 'не равен',
          filterOperatorAfter: 'больше чем',
          filterOperatorOnOrAfter: 'больше или равно',
          filterOperatorBefore: 'меньше чем',
          filterOperatorOnOrBefore: 'меньше или равно',
          filterOperatorIsEmpty: 'пустой',
          filterOperatorIsNotEmpty: 'не пустой',
          filterOperatorIsAnyOf: 'любой из',
        }}
        columns={columns}
        rows={
          isAdmin(currentUser)
            ? rooms
            : rooms.filter((room) => room.uid === currentUser.id)
        }
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? grey[200] : grey[900],
          },
        }}
      />
    </Box>
  );
};

export default Rooms;
