import './Container.css'

const Container = (props) => {
  return (
    <div className='ramo-container container'>
        {props.children}
    </div>
  )
}

export default Container
