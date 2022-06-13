import React from 'react'
import NewCatForm from '../forms/NewCatForm'

function newCat() {
  return (
    <div>
        <h1 className='text-center display-1 p-4'>New Cat</h1>
        <NewCatForm/>
        </div>
  )
}

export default newCat