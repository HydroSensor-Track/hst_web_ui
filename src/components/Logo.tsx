import logo from '../assets/logo.jpeg';
import {Logo as StyledLogo} from '../styled-components/Logo.tsx';

const Logo = ({style}:{style?:any}) => {
    return(
        <StyledLogo src={logo} alt={"Logo"} style={style}/>
    )
}

export default Logo;