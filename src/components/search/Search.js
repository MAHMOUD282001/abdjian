import React from 'react'
import Products from '../products/Products'
import { useParams } from 'react-router-dom'

const Search = () => {
  let {searchedWord} = useParams()
  return (
    <>
      <Products dataFlag="searched" api={`https://adminpanel.hyperfinition.com/api/public/products?search_value=${searchedWord}`}/>
    </>
  )
}

export default Search