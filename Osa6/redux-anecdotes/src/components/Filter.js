import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    //const dispatch = useDispatch() 

    const handleChange = (event) => {   
      event.preventDefault()    
      const filter = event.target.value
      console.log(filter)
      props.filterChange(filter) 

    // input-kentän arvo muuttujassa event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  filterChange,
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter

//export default Filter