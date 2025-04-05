import React from 'react'
import {Link, useLocation} from 'react-router-dom'


const Viewrecipe = () => {
	let location= useLocation();

	console.log(location)
	console.log(location.state)

	let obj=location.state

	let nutrientsarr= Object.entries(location.state.totalNutrients)

	console.log(nutrientsarr)
  return (
	<div className='h-max pt-20 bg-black text-white p-6'>
	  <div className=' w-[60%] md:h-[300px] h-[500px]  m-auto text-black  rounded-xl flex md:flex-row flex-col items-center gap-4 bg-white overflow-hidden p-5'>
		<div className='md:w-[40%] w-full bg-amber-500 md:p-5 p-1 h-full'>
		<img className='w-[480px] h-full  ' src={obj.image} alt="" />
		</div>
		<div className='md:w-[60%] w-full flex flex-col items-center'>
	<h1 className='text-center text-xl font-bold'> {obj.label}</h1>
	<p><span className='font-bold my-2 lg:text-xl sm:text-md text-sm'>Cuisine Type</span> {obj.cuisineType}</p>
	<p><span className='font-bold my-2 lg:text-xl sm:text-md text-sm'>Dish Type</span> {obj.dishType}</p>
	<p><span className='font-bold my-2 lg:text-xl sm:text-md text-sm'>diet label</span> {obj.dietLabels}</p>

	<Link to={obj.url} className='bg-green-600 rounded-md px-4 py-2 hover:bg-green-400 text-white mt-4 block w-max' >How to cook</Link>
		</div>
		
	  </div>
	  <div className='bg-white text-black w-[70%] m-auto rounded-lg p-5 mt-5'>
	  <ul className='list-disc'>
			<b className='text-center block'>Indegrends list</b>
		{
			obj.ingredientLines.map((lines,i)=>{

				return <li key={lines}> {lines} </li>

			})
			
		}
		 </ul>
	  </div>
	  <h1 className='text-center text-xl font-bold mt-5 capitalize'>Table of Nutrients</h1>
<div className='overflow-x-scroll'>
<table className='bg-white mt-5 text-center w-[70%] text-black m-auto'>
		<thead>
			<tr className='border border-black'>
				<th className='p-3 '>S.NO</th>
				<th>Name</th>
				<th>Label</th>
				<th>Quantity</th>
				<th>unit</th>
			</tr>
		{
			nutrientsarr.map(([a,b],i)=>{
				return <tr className='border'>
					<td className='p-3'>{i+1}</td>
					<td>{a}</td>
					<td>{b.label}</td>
					<td>{(b.quantity).toFixed(2)}</td>
					<td>{b.unit}</td>
				</tr>
			})
		}
		</thead>
		<tbody></tbody>
	  </table>
</div>

	</div>
  )
}

export default Viewrecipe
