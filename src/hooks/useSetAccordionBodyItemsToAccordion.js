

const UseSetAccordionBodyItemsToAccordion = (props) => {

  const handleFiltercheckboxOnChange = (e)=>{
    const isChecked = e.target.checked
    
    
    props.setSelectedCheckbox(selectedCheckbox =>{
      if(isChecked)return [...selectedCheckbox, {title: e.target.dataset.title, type: e.target.dataset.type}]
       return selectedCheckbox.filter(item => item.title !== e.target.dataset.title)
      
    }
    )
  }

  return (
    <>
    {Object.values(props.accordionBodyItems).map((item) =>(
       <div key={item.id} className='ramo-filter-accorion-checkbox'>
            <div className='ramo-filter-accorion-checkbox'>
            <input  type="checkbox"  onChange={handleFiltercheckboxOnChange} data-title ={item.title} data-type={item.filterType}/>
            <label>{item.title}</label>
            </div>
            <span>({item.quantity})</span>
    </div>))
    }
    </>
  )
}

export default UseSetAccordionBodyItemsToAccordion
