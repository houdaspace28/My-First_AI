import { TextField } from "@mui/material"

type Props = {
    name:string,
    type:string,
    label:string,
}

const CustomizedInput = ({name,type,label}:Props) => {
  return (
    <TextField name={name} label={label} type={type} InputLabelProps={{style:{color:"black"}}} InputProps={{style:{borderRadius:"10px"}}}>CustomizedInput</TextField>
  )
}

export default CustomizedInput