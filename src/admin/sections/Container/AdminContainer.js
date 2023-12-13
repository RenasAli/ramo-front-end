import './AdminContainer.css'

const AdminContainer = (props) => {
  return (
    <div className='container'>
        {props.children}
    </div>
  )
}

export default AdminContainer
