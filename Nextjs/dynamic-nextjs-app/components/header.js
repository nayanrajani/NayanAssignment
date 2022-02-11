import Link from 'next/link';
const Header=()=>(
    <header>
        <br />
        <center>
        <table>
            <tr>
                <td>
                <Link href="/">
                    <a>Home</a>
                </Link>
                </td>
            
                <td>
                <Link href="/about">
                    <a>About</a>
                </Link>
                </td>
                <td>
                <Link href="/route/mainroutingcomponent">
                    <a>Main Page</a>
                </Link>
                </td>
                <td>
                <Link href="/route/createdepartment">
                    <a>createdepartment</a>
                </Link>
                </td>
                <td>
                <Link href="/route/listdepartmentscomponent">
                    <a>listdepartmentscomponent</a>
                </Link>
                </td>
                <td>
                <Link href="/route/editdepartment">
                    <a>editdepartments</a>
                </Link>
                </td>
            </tr>

        </table>
        </center>
        
        {/* <ul> */}
            {/* <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </li> */}
            {/* <li>
                <Link href="/blog/first">
                    <a>First Blog</a>
                </Link>
            </li>
            <li>
                <Link href="/blog/second">
                    <a>Second Blog</a>
                </Link>
            </li> */}
        {/* </ul> */}
    </header>
);

export default Header;