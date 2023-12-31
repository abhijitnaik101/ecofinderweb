import React, { useState } from 'react';
import LocationData from './LocationData';

const SearchBar = () =>
{
    
    const [searchLocation, setSearchLocation] = useState(null);
    const [searchClicked, setSearchClicked] = useState(false);

    

    const onChanged = (value) =>
    {
        setSearchClicked(false);
        setSearchLocation(value);
    }

    const onClicked = (value) =>
    {
        setSearchLocation(value);
        setSearchClicked(true);
    }



    return(
        <>
            <div className='w-full mr-6 relative'>
                        
                        <div className='flex justify-between items-center'>
                            <input onChange={(e)=>{ onChanged(e.target.value) }} type='address' value={searchLocation} autoComplete='on' placeholder='Search...' className='py-3 px-4 m-3 rounded-lg w-full'/>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white h-10 w-24 rounded-md'>click me</button>
                        </div>
                        {
                            (searchLocation && !searchClicked) ? <>
                                <div className='absolute z-10 bg-white rounded-lg p-4 w-full shadow-md'>
                                    {LocationData().map( (value, index) => 
                                    <p onClick={(e) => {onClicked(e.target.textContent); console.log(e.target.textContent)}} className='p-1 hover:bg-slate-100'>
                                        {value.name}
                                    </p> )}
                                </div>
                            </> : <></>
                        }
                </div>
        </>
    )
}

export default SearchBar