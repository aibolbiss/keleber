import { Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImagesList from './ImagesList';
import ProgressList from './progressList/ProgressList';

const AddImages = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });
  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
        <div
          style={{ padding: '16px', fontFamily: 'Roboto' }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: 'green' }}>Картинка в зоне видимости...</p>
          ) : (
            <p>
              Перетащите сюда несколько файлов или щелкните мышью, чтобы выбрать
              файлы
            </p>
          )}
          <p style={{ fontStyle: 'italic' }}>
            Принимаются изображения с расширением *.jpeg, *.jpg, *.png
          </p>
        </div>
      </Paper>
      <ProgressList {...{ files }} />
      <ImagesList />
    </>
  );
};

export default AddImages;
