import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const NotiStack = () => {
  return (
    <div>
      <SnackbarProvider />
      <button onClick={() => enqueueSnackbar('That was easy!')}>Show snackbar</button>
    </div>
  );
};