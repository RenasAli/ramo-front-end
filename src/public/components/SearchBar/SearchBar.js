import './SearchBar.css';
import { CiSearch } from "react-icons/ci";
import { useEffect, useState, useRef } from 'react';
import makeRequest from '../../../data/fetch';
import { useLocation, Link } from 'react-router-dom';


const SearchBar = () => {
  const [data, setData] = useState([]);
  const [showSearchResultsList, setShowSearchResultList] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const location = useLocation();
  const searchResultsListRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      
      if (searchResultsListRef.current && !searchResultsListRef.current.contains(event.target)) {
        setSearchResult([]);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
useEffect(() => {
    setSearchResult([])
    }, [location.pathname]);
    
  useEffect(() => {
   if(searchResult.length !== 0){
    setShowSearchResultList(true)
   }
    }, [searchResult.length]);

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
        return<Link className="search-found-item-link" to={result.url} key={result.id}>
            <li className='search-found-item' >
                <img alt='' className='search-found-item-img' src={result.img}/>
                <span className='search-found-item-title'>{result.name}</span>
            </li>
           
            </Link>
    })

  return (
    <>
    <div className="search-bar" >
        <input className="search-bar-input"  placeholder="Søg" aria-label="Search" onInput={handleInputOnChange}/>
        <div className="search-icon " ><CiSearch/></div>
    </div>
    {showSearchResultsList  && 
    <div ref={searchResultsListRef} >
        <ul className='search-found-list'>
         {displaySearchResults} 
         </ul>
         
    </div>
    }
    </>
  )
}

export default SearchBar
