import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModelDialog from './modelDialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { firestoreInstance } from '../config'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Spinner from './spinner'
import { emitter, SUCCESS } from './notification'
import Search from './search'
import { numberFormatter, capitlizeString } from './utility'
import Typography from '@material-ui/core/Typography'
import moment from 'moment';
import { DATE_FORMAT, CUSTOMERS, CUSTOMERS_TRANSACTIONS } from '../constant'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const CustomersView = () => {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState(null)
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isIncorrectPhoneNumber, setIsIncorrectPhoneNumber] = useState(false)
    const [amount, setAmount] = useState('')
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState("")
    const [permanentCustomerList, setPermanentCustomerList] = useState()
    useEffect(() => {
        firestoreInstance.collection(CUSTOMERS).get().then(resp => {
            const listOfCustomers = resp.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            listOfCustomers.sort((a, b) => (a.amount < b.amount) ? 1 : ((b.amount < a.amount) ? -1 : 0))
            setCustomers(listOfCustomers)
            setPermanentCustomerList(listOfCustomers)
        }
        )


    }, [refresh])
    const handleChange = (searchValue) => {
        setSearch(searchValue)
        if (Number(searchValue)) {
            setCustomers(permanentCustomerList.filter(cust => cust.phoneNumber.toString().includes(searchValue)))
        } else {
            setCustomers(permanentCustomerList.filter(cust => cust.name.toLowerCase().includes(searchValue.toLowerCase())))
        }

    }
    const handleClear = () => {
        setSearch('')
        handleChange('')
    }
    const handleFabClick = () => {
        setOpen(!open);
    }
    const fab = {
        position: 'fixed',
        bottom: 10,
        right: 5,
    }

    const addNewCustomer = () => {
        let newDocId;
        const newCustomer = { name: capitlizeString(name), phoneNumber: Number(phoneNumber), amount: Number(amount) }
        handleFabClick()
        firestoreInstance.collection(CUSTOMERS).add(newCustomer).then(function (docRef) {
            newDocId = docRef.id;
            firestoreInstance.collection(CUSTOMERS_TRANSACTIONS).doc(newDocId)
                .set({ transactions: [{ date: moment().format(DATE_FORMAT), amount: amount, isReturn: false }] })
            emitter.emit("NOTIFICATION", { type: SUCCESS, msg: "New Customer Added Successfully" })
        })
        setRefresh(!refresh)
        setAmount(0)
        setName('')

    }
    return (
        <>
            <Paper>
                {/* <Notification/> */}
                <Search value={search} handleChange={handleChange} handleClear={handleClear} />
                <List >
                    <Divider />
                    {customers ? customers.length > 0 ? customers.map((customer, index) => <div key={index}>
                        <ListItem button component={Link} to={`/${customer.id}`}>
                            <ListItemAvatar >
                                <Avatar title={customer.name}>
                                    {/* <ImageIcon /> */}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={customer.name} secondary={`Phone : ` + customer.phoneNumber} />
                            <ListItemSecondaryAction>  <b>{numberFormatter(customer.amount)}</b>
                                <IconButton edge="end" aria-label="more" title="click for more infomation"
                                    component={Link} to={`/${customer.id}`}>
                                    <ChevronRightTwoToneIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>) : <Typography variant="caption">No customer to show</Typography> : <Spinner />}
                </List>
            </Paper>
            <Fab color="primary" onClick={handleFabClick} aria-label="add" style={fab}>
                <AddIcon />
            </Fab>
            <ModelDialog isOpen={open} title="Add New Customer" handleModelClick={handleFabClick}>

                <form onSubmit={
                    e => {
                        e.preventDefault();
                        // addNewCustomer()
                        if (!isIncorrectPhoneNumber) {
                            addNewCustomer()
                        }

                    }} autoComplete="off">
                    <DialogContent>
                        <DialogContentText>
                            Create a new customer account here. All fields are required !
                    </DialogContentText>

                        <TextField autoFocus onChange={(e) => setName(e.target.value)}
                            margin="dense" id="name" label="Name" type="text" fullWidth required />

                        <TextField error={isIncorrectPhoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value)
                                const condition = e.target.value.toString().length === 10
                                setIsIncorrectPhoneNumber(condition ? false : true)
                            }} inputProps={{ minLength: 10 }}
                            margin="dense" id="phoneNumber" label="Phone Number" type="number" fullWidth required />
                        {isIncorrectPhoneNumber && <FormHelperText error id="component-error-text">Phone Number should be 10 digit</FormHelperText>}

                        <TextField onChange={(e) => setAmount(e.target.value)}
                            margin="dense" id="amount" label="Amount" type="number" fullWidth required />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFabClick} color="primary" title="Cancel">  Cancel  </Button>
                        <Button type="submit" color="primary" title="create new customer"> Create </Button>
                    </DialogActions>
                </form>
            </ModelDialog>

        </>
    );
}
export default CustomersView;