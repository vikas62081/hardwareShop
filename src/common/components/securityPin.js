import React, { useState } from 'react'
import ReactCodeInput from 'react-code-input'
import Button from '@material-ui/core/Button';
import PinInput from "react-pin-input";
import Typography from '@material-ui/core/Typography'

const SecurityPin = ({ addReturnNewAmount }) => {
  const [pin, setPin] = useState(true)
  const props = {

    inputStyle: {
      fontFamily: 'monospace',
      margin: '5px',
      MozAppearance: 'textfield',
      width: '30px',
      fontSize: '35px',
      height: '30px',
      padding: '10px',
      border: "none",
      borderBottom: "3px #6d6767 solid",
    }
  }
  return <div className="contentCenter">
    <Typography variant="subtitle1" align="center">Enter PIN</Typography>
    <PinInput
      focus
      length={4}
      initialValue=""
      secret
      type="numeric"
      style={{ padding: 10 }}
      onComplete={(value, index) => addReturnNewAmount(value)}
      autoSelect={true}

      {...props}
    />
  </div>
}

export default SecurityPin; 