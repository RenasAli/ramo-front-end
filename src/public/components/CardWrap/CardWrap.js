import './CardWrap.css'


const CardWrap = (props) => {

  const CardData = props.data;
  
  return (
    <>
      <div className='card-wrapper-bg'>
        
        <div className='card-wrapper-items'>
          {CardData}
        </div>
      </div>
    </>
  )
}

export default CardWrap
