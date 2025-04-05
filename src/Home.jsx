import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {Link,useSubmit} from 'react-router-dom'

const Home = () => {
const [allrecipes, setallrecipes] = useState([]);
const [searchitem, setsearchitem] = useState('burger');

	const getdata=async()=>{
		let res=await fetch(`https://api.edamam.com/search?q=${searchitem}&app_id=8a01517b&app_key=
582ba5fc9a6ecd9ac73033c017f7eb49`)
let data=await res.json();
console.log(data.hits)
setallrecipes(data.hits)
	}
	
	useEffect(()=>{
		getdata()
	},[searchitem])
	let searchref=useRef();
	// console.log(searchref)

	const handlesearch=(e)=>{
		e.preventDefault()
		let value=searchref.current.value
		console.log(value)
		setsearchitem(value)
	}

	return (
	<div>
		<form action="" className='w-max m-auto'>
			<input ref={searchref} className='px-3 py-4 rounded-md border-2 border-black' type="text" placeholder='search a recipe' />
			<button onClick={handlesearch} className='px-3 py-2 rounded-md bg-blue-400 hover:bg-blue-900'>
				Search
			</button>

		</form>
		<div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
		{
		allrecipes.map((ele,i)=>{
			return <div className='w-full border border-gray-200  flex flex-col gap-5 items-center p-3 rounded-lg'>
				<img src={ele.recipe.image} alt="" />
				<h1>{ele.recipe.label}</h1>
				<Link to={'/view'} state={ele.recipe} className='bg-green-700 px-4 py-2 rounded-md  hover:bg-green-200 text-white'>view recipe</Link>
			</div>
		})
	} 
		</div>

	</div>
  )
}

export default Home
