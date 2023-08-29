// import Link from "next/link";

// const NavBar = () => {
//   return (
//     <header>
//       <nav className="">
//         <ul className="flex gap-5">
//           <li>
//             <Link className="uppercase" href="/">home</Link>
//           </li>
//           <li>
//             <Link className="uppercase" href="/dashboard">dashboard</Link>
//           </li>
//           <li>
//             <Link className="uppercase" href="/suscription">suscription</Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };
// export default NavBar;
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavList from './NavList';
import Link from 'next/link';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1, position:'fixed', width:'100%', zIndex:'100' }}>
      <AppBar position="static" sx={{ background: 'black' }}>
        <Toolbar>
          <NavList/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">
            <Link href='/login' >Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}