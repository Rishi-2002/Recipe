import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [allrecipes, setAllrecipes] = useState([]);
  const [searchitem, setSearchitem] = useState('');
  const searchref = useRef();

  const getdata = async () => {
    let res;
    if (searchitem === '' || searchitem.trim() === '') {
      // Default → show 20 recipes
      res = await fetch(`https://dummyjson.com/recipes?limit=20`);
    } else {
      // When searching
      res = await fetch(`https://dummyjson.com/recipes/search?q=${searchitem}`);
    }
    let data = await res.json();
    console.log(data.recipes);
    setAllrecipes(data.recipes);
  };

  useEffect(() => {
    getdata();
  }, [searchitem]);

  const handlesearch = (e) => {
    e.preventDefault();
    let value = searchref.current.value.trim();
    console.log(value);
    setSearchitem(value);
  };

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handlesearch} className="w-max m-auto my-5 flex gap-3">
        <input
          ref={searchref}
          className="px-3 py-2 rounded-md border-2 border-black"
          type="text"
          placeholder="Search a recipe"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-900 text-white"
        >
          Search
        </button>
      </form>

      {/* Recipes Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 p-5">
        {allrecipes?.length > 0 ? (
          allrecipes.map((ele, i) => (
            <div
              key={i}
              className="w-full border border-gray-200 flex flex-col gap-3 items-center p-3 rounded-lg shadow-md"
            >
              <img
                src={ele.image}
                alt={ele.name}
                className="w-40 h-40 object-cover rounded-md"
              />
              <h1 className="font-semibold text-center">{ele.name}</h1>
              <Link
                to="/view"
                state={ele}
                className="bg-green-700 px-4 py-2 rounded-md hover:bg-green-500 text-white"
              >
                View Recipe
              </Link>
            </div>
          ))
        ) : (
          <h2 className="col-span-full text-center text-lg text-gray-500">
            No recipes found
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
