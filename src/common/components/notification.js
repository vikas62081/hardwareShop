import { useSnackbar } from 'notistack';
import { EventEmitter } from 'fbemitter'

export const emitter = new EventEmitter();
export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';
export const Notification = () => {
  const { enqueueSnackbar } = useSnackbar();
  emitter.addListener("NOTIFICATION", (data) => {
    enqueueSnackbar(data.msg, {
      variant: data.type, anchorOrigin: { vertical: 'top', horizontal: 'right', }
    });
  })
  return null
} 