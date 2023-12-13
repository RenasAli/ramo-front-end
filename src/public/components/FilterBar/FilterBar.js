import './FilterBar.css'
import { TbListSearch } from "react-icons/tb";
import Accordion from 'react-bootstrap/Accordion';

const FilterBar = (props) => {

  
  return (
    <>
        <div className='filter-bar-pc'>
            <h3><TbListSearch/> Filter</h3>
            {props.children}
        </div>
        <div className='filter-bar-mobile'>
          <Accordion className='ramo-accordion'  alwaysOpen>
            <Accordion.Item  className='ramo-accordion-item' eventKey='1' >
              <Accordion.Header className='ramo-accordion-header'>
                <h5><TbListSearch/> Filter</h5>
              </Accordion.Header>
              <Accordion.Body className='ramo-accordion-body'> 
                {props.children}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
            
        </div>
    </>
  )
}

export default FilterBar
