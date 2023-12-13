import './Table.css'

const Table = (props) => {
  return (
    <>
        <table className="table table-hover">
        {props.children}
            <tbody>
                <tr>
                
                </tr>
            </tbody>
        </table>
    </>
  )
}

export default Table
