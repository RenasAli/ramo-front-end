import './CardWrap.css'


const CardWrap = (props) => {

  return (
    <>
      <div className='card-wrapper-bg'>
        
        <div className='card-wrapper-items'>
          {props.data}
        </div>
      </div>
    </>
  )
}

export default CardWrap
