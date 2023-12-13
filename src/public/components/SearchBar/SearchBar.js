import './SearchBar.css';
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from 'react';
import makeRequest from '../../../data/fetch';


const SearchBar = () => {
  const [data, setData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const settings = {
        method: "GET",
    };
    makeRequest(`category/products/items`, settings)
    .then((data) => {
        setData(data)
    })
    .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleInputOnChange = (e) =>{
        if(e.target.value.length <= 2){
            setSearchResult([])
        } else{
            const filter = data.filter((item) => {
                for (const key in item){
                    if(item[key] &&
                    String(item[key]).toLowerCase().includes(e.target.value)){
                        return true
                    }
                }
                return false
            }      
            )
            setSearchResult(filter)
        } 
    }
   
    const displaySearchResults = searchResult.map(result =>{
        return<li className='search-found-item' key={result.id}>
            <img alt='' className='search-found-item-img' src={result.img}/>
            <span className='search-found-item-title'>{result.name}</span>
            </li>
    })

  return (
    <>
    <div className="search-bar" >
        <input className="search-bar-input"  placeholder="Søg" aria-label="Search" onInput={handleInputOnChange} />
        <div className="search-icon " ><CiSearch/></div>
    </div>
    {searchResult.length !== 0 && 
    <div>
        <ul className='search-found-list'>
         {displaySearchResults} 
         </ul>
    </div>
    }
    </>
  )
}

export default SearchBar
