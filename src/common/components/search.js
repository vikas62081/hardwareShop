import React from 'react'

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
const Search = ({ value, handleChange, handleClear }) => {
  const style = { background: "#f2f2f2", padding: "5px 3px" }
  return <div style={style}>
    <InputBase
      style={{ background: "#fff", padding: "0 8px" }}
      placeholder="Search someone..."
      value={value}
      fullWidth
      onChange={(e) => {
        value = e.target.value
        handleChange(value)
      }}
      inputProps={{ 'aria-label': 'search' }}
      startAdornment={<IconButton disabled><SearchIcon /></IconButton>}
      endAdornment={value ? <IconButton title="Clear Search" onClick={() => handleClear()}>
        <ClearIcon /></IconButton> : null} />
  </div>
}
export default Search;