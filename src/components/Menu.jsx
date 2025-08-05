import React,{useState} from 'react'
import FoodDisplay from './FoodDisplay/FoodDisplay'

const Menu = () => {
    const [category,setCategory] = useState("All")
  return (
    <div>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Menu
