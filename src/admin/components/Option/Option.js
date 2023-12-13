import './Option.css'

const Option = (props) => {
  return (
    <>
    <option  value={props.value}>{props.name}</option>
    </>
  )
}

export default Option
