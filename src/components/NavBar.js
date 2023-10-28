import { useDispatch, useSelector } from "react-redux";
import { setSideBarOpen } from "../features/sideBarSlice";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const { isSideBarOpen } = useSelector((store) => store.sideBar);
  return (
    <div className="navbar w-100">
      <div className="left">
        <span
          className="mdi mdi-menu icon-lg"
          onClick={() => dispatch(setSideBarOpen(!isSideBarOpen))}
        ></span>
      </div>
      <div className="right">
        <div className="item">
          <span className="mdi mdi-moon-waning-crescent icon-md"></span>
        </div>
        <div className="item">
          <span className="mdi mdi-bell icon-md"></span>
          <span className="text">10</span>
        </div>
        <Dropdown className="item">
          <Dropdown.Toggle
            variant="success"
            className="avatar"
            id="dropdown-basic"
          >
            A
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={"/admin/dashboard"}>Dashboard</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/admin/profile"}> Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/admin/logout"}> Đăng xuất</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default NavBar;
