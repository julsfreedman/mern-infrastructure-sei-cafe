// Don't forget the import
import { Link } from 'react-router-dom';

//&nnbsp is just a blank space
export default function NavBar(props) {
    return (
        <nav>
            <Link to="/orders">Order History</Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order</Link>
        </nav>
    );
};
