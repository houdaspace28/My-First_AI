import {Link} from 'react-router-dom';

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () =>Promise<void>;
}

const NavigationLink = ({to,bg,text,textColor,onClick}:Props) => {
  return (
    <Link to={to} onClick={onClick} style={{color:textColor, textDecoration:"none",margin:"2px", padding:"5px", borderRadius:"5px", background:bg, fontSize:"1rem"}}>{text}</Link>
  )
}

export default NavigationLink