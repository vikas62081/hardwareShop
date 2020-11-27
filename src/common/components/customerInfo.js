import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Divider, Typography } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { firestoreInstance } from '../config'
import ActionBtn from './actionsBtn';
import Paper from '@material-ui/core/Paper'
import Spinner from './spinner'
import { emitter, SUCCESS, ERROR } from './notification'
import { numberFormatter } from './utility'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import moment from 'moment';
import { DATE_FORMAT_TO_SHOW, CUSTOMERS, CUSTOMERS_TRANSACTIONS, ADMIN } from '../constant'
import { useSelector, useDispatch } from 'react-redux'

const CustomerInfo = (props) => {
  const dispatch = useDispatch()
  const [personalInfo, setPersonalInfo] = useState(null)
  const [transactions, setTransactions] = useState(null)
  const [open, setOpen] = useState(false)
  const [isPinCorrect, setIsPinCorrect] = useState(false)
  const { customerId } = props.match.params
  useEffect(() => {
    firestoreInstance.collection(CUSTOMERS).doc(customerId)
      .get()
      .then(doc => {
        setPersonalInfo(doc.data())
      });
    firestoreInstance.collection(CUSTOMERS_TRANSACTIONS).doc(customerId)
      .get()
      .then(doc => {
        const { transactions } = doc.data() ? (doc.data()) : { transactions: [] }
        setTransactions(transactions)
      });
  }, [customerId])
  const handleFabClick = () => {
    setOpen(!open);
  }
  const newTransactions = (newData, pin) => {

    firestoreInstance.collection(ADMIN).doc("bLudkTLbDVc3xny11CXV")
      .get()
      .then(doc => {
        if (Number(doc.data().pin) === Number(pin)) {
          dispatch({ type: "CLOSE_PIN_DIALOG" })
          doTransaction(newData)
        } else {
          emitter.emit("NOTIFICATION", { type: ERROR, msg: "Enter correct password" })
        }
      });


  }
  const doTransaction = (newData) => {
    const { isReturn, amount } = newData
    if (Number(amount) === 0) {
      emitter.emit("NOTIFICATION", { type: ERROR, msg: "Amount should be more than 0." })

    } else if (isReturn && amount > personalInfo.amount) {
      emitter.emit("NOTIFICATION", { type: ERROR, msg: "Returning Amount can't be more than Actual." })
    }
    else {
      dispatch({ type: "CLOSE_TRANSACTION_DIALOG" })
      firestoreInstance.collection(CUSTOMERS_TRANSACTIONS).doc(customerId)
        .get()
        .then(doc => {
          const { transactions } = doc.data()
          const newTrans = [...transactions, newData]
          firestoreInstance.collection(CUSTOMERS_TRANSACTIONS).doc(customerId)
            .set({ transactions: newTrans })
          setTransactions(newTrans)
          emitter.emit("NOTIFICATION", { type: SUCCESS, msg: isReturn ? "Returned Successfully" : "Added Successfully" })
        });
      const newPersonal = {
        ...personalInfo,
        amount: isReturn ? personalInfo.amount - Number(newData.amount) : personalInfo.amount + Number(newData.amount)
      }
      firestoreInstance.collection(CUSTOMERS).doc(customerId)
        .set(newPersonal)
      setPersonalInfo(newPersonal)
    }
  }
  return <Paper>
    <List component="div" >

      {personalInfo && <div><ListItem style={{ background: "#f1f1f1", marginBottom: 8 }}>
        <ListItemAvatar >
          <Avatar title={personalInfo.name}>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={personalInfo.name} secondary={`Phone : ` + personalInfo.phoneNumber} />
        <ListItemSecondaryAction>  <b>{numberFormatter(personalInfo.amount)}
        </b>
        </ListItemSecondaryAction>
      </ListItem>
        <Typography variant="body2" style={{ marginLeft: 10 }} gutterBottom align="left">Transaction Details : </Typography>
      </div>}


      <div style={{ height: "60vh", overflow: "auto" }}>
        <Divider />
        {transactions ? transactions.length > 0 ? transactions.map((trans, index) => <div key={index}>
          <ListItem button >
            <ListItemIcon title={trans.isReturn ? "Return Amount" : "Borrow Amount"}>
              {trans.isReturn ? <ArrowDropDownIcon style={{ color: "green", fontSize: "xx-large" }} /> :
                <ArrowDropUpIcon style={{ color: "red", fontSize: "xx-large" }} />}
            </ListItemIcon>
            <ListItemText primary={moment(trans.date).format(DATE_FORMAT_TO_SHOW)} />
            <ListItemSecondaryAction style={{ color: trans.isReturn ? "green" : "red" }}>
              <b> {trans.isReturn ? `- ` : `+ `}{numberFormatter(trans.amount)}</b>

            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
        ) : <Redirect to='/' /> : <Spinner />}
      </div>
    </List>
    {personalInfo && <div style={{ padding: "20px 0" }}>
      <ActionBtn customerId={customerId} newTransactions={newTransactions} open={open} customerName={personalInfo.name} />
    </div>}

  </Paper>
}

export default CustomerInfo;