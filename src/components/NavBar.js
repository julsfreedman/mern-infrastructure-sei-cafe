// Don't forget the import
import { Link } from 'react-router-dom';
import * as userService from '../utilities/users-service';

//&nnbsp is just a blank space
export default function NavBar({ name, setUser }) {
    function handleLogout() {
        // Delegate to the users-service
        userService.logOut()
        setUser(null)
    }
    return (
        <nav>
            <Link to="/orders">Order History</Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order</Link>
            &nbsp;
            Welcome, {name}
            &nbsp;&nbsp;<Link to="" onClick={handleLogout}>Log Out</Link>
        </nav>
    );
};
