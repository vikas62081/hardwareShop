import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function ModelDialog({ isOpen: open, title, children, fullScreen = false }) {

    return (
        <div>
            <Dialog fullScreen={fullScreen} open={open} TransitionComponent={Transition}
             disableRestoreFocus={true}
             aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                {children}
            </Dialog>
        </div>
    );
}
