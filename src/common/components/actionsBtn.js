import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import ModelDialog from './modelDialog';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';
import { DATE_FORMAT } from '../constant'
import SecurityPin from './securityPin'
import { useSelector, useDispatch } from 'react-redux'
const ActionBtn = ({ open, customerId, newTransactions, handleFabClick, customerName }) => {
    const [amount, setAmount] = useState()
    const [openPin, setOpenPin] = useState(false)
    const dispatch = useDispatch()
    const isShowPinDialog = useSelector(state => state.isShowPinDialog)
    const isShowTransactionDialog = useSelector(state => state.isShowTransactionDialog)

    const [isReturnClicked, setIsReturnClicked] = useState(null)

    const addClicked = () => {
        showTransactionDialog()
        setIsReturnClicked(false)
    }
    const returnClicked = () => {
        showTransactionDialog()
        setIsReturnClicked(true)
    }
    const handleCancel = () => {
        dispatch({ type: "CLOSE_TRANSACTION_DIALOG" })
    }
    const showTransactionDialog = () => {
        dispatch({ type: "OPEN_TRANSACTION_DIALOG" })
    }
    const showPinDialog = () => {
        dispatch({ type: "OPEN_PIN_DIALOG" })

    }
    const addReturnNewAmount = (pin) => {
        newTransactions({ date: moment().format(DATE_FORMAT), amount, isReturn: isReturnClicked ? true : false }, pin)
        // setTimeout(()=>{handleFabClick()},200)
        showPinDialog()
    }
    return <div>
        <Grid container>
            <Grid item xs={6} >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AssignmentReturnIcon />}
                    onClick={returnClicked}

                >
                    Return
      </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={addClicked}
                >
                    Add
      </Button>
            </Grid>
        </Grid>
        <ModelDialog isOpen={isShowTransactionDialog}
            title={isReturnClicked ? "Add New Return Amount" : "Add New Amount"}>

            <form onSubmit={
                e => {
                    e.preventDefault();
                    showPinDialog()
                }}>
                <DialogContent>
                    <DialogContentText>
                        Add new {isReturnClicked ? "Return" : "Borrow"} Amount to <b>{customerName}</b>. All fields are required !
                    </DialogContentText>
                    <TextField autoFocus onChange={(e) => setAmount(e.target.value)}
                        margin="dense" id="amount" label="Amount" type="number" fullWidth required

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary" title="Cancel">  Cancel  </Button>
                    <Button type="submit" color="primary" title="create new customer">
                        {isReturnClicked ? "Return Amount" : "Add Amount"}
                    </Button>
                </DialogActions>
            </form>
        </ModelDialog>
        <ModelDialog fullScreen isOpen={isShowPinDialog} >
            <DialogActions style={{ display: "block" }}>
                <SecurityPin addReturnNewAmount={addReturnNewAmount} />
            </DialogActions>
        </ModelDialog>
    </div>
}

export default ActionBtn;