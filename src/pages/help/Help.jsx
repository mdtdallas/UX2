import React from 'react'
import './help.css'
import addCatHelp from '../../img/addCatHelp.png'
import catDetails from '../../img/catDetailsHelp.png'
import addAward from '../../img/addAwardHelp.png'
import shows from '../../img/shows.png'
import selectCat from '../../img/selectCatHelp.png'
import enterShow from '../../img/enterShowHelp.png'

export default function Help() {
  return (
    <div className='help'>
      <div className="helpContainer">
          <h1 className='text-center p-2 pt-4'>Profile Page</h1>
          <p>Add New Cat...</p>
          <img src={addCatHelp} alt="" />
          <p>See cat details...</p>
          <img src={catDetails} alt="" />
          <h1 className='text-center p-2'>Cat Profile</h1>
          <p>Add Award...</p>
          <img src={addAward} alt="" />
          <h1 className='text-center p-2 pt-4'>Shows Page</h1>
          <p>View show location..</p>
          <img src={shows} alt="" />
          <p>Select cat to enter show...</p>
          <img src={selectCat} alt="" />
          <p>Enter Show...</p>
          <img src={enterShow} alt="" />

      </div>
    </div>
  )
}
