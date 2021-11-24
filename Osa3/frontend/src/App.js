import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


const ShowNames = ({namesToShow, setSucceedMessage, persons, setPersons}) => {
  return (
    <div>
      {namesToShow.map(person => 
          <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => {
        if (window.confirm(`Delete ${person.name}?`)) {
        personService
        .del(person.id)
        personService
        .getAll()
          .then(persons => {
          setPersons(persons)
      })
        setSucceedMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setSucceedMessage(null)
        }, 2000)}}}
        >delete</button>
        </div>
        )}
    </div>
  )}

  const Filter = ({newFilter, handleFilterChange}) => {
    return(
      <div>
      filter shown with <input 
                  value={newFilter}
                  onChange={handleFilterChange}/>
      </div>
    )
  }

  const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
      <form onSubmit={addName}>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                  />
          number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}
                  />
          <button type="submit">add</button>
      </form>
    )
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if ((message.includes("Information")) || (message.includes("validation"))) {
      return(
        <div className="error">
        {message}
      </div>
      )
    }
    return (
      <div className="succeed">
        {message}
      </div>
    )
  }


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ newFilter, setNewFilter ] = useState("")
  const [ succeedMessage, setSucceedMessage ] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const nameInList = persons.find(person => person.name === newName)
    console.log(nameInList)
    const nameObject = {
      name : newName,
      number : newNumber,
      id : newName,    
  }

    if (nameInList === undefined) {
    personService
      .create(nameObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        console.log(createdPerson)
        setNewName("")
        setNewNumber("")
      
        setSucceedMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setSucceedMessage(null)
        }, 5000)      
      })
      .catch(error => {
        console.log(error.response.data)
        setSucceedMessage(error.response.data.error)
        setTimeout(() => {
          setSucceedMessage(null)
        }, 5000)
      })
    }

    else if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
      .update(nameInList.id, nameObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === nameInList.id ? updatedPerson : person)) 
        setNewName("")
        setNewNumber("")
        setSucceedMessage(
          `Changed ${newName}`
        )
        setTimeout(() => {
          setSucceedMessage(null)
        }, 5000)   
      })
      .catch(error => {
        setSucceedMessage(
        `Information of ${newName} has already been removed from server`
      )
      setTimeout(() => {
        setSucceedMessage(null)
      }, 5000)
      })         
  }  
}
  

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    console.log(namesToShow)
            
    
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value.length === 0) {
      setShowAll(true)
    }
    else (setShowAll(false))
  }


  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={succeedMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2> 
      <ShowNames namesToShow={namesToShow} setSucceedMessage={setSucceedMessage} persons={persons} setPersons={setPersons}/> 
    </div>
  )
}

export default App