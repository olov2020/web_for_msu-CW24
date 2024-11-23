import {Link} from "react-router-dom";
import style from "../../../header.module.css";

// eslint-disable-next-line react/prop-types
const MenuDropdown = ({items = [], onClick, ...props}) => {
  return (
    <div className={style.menu__dropdownList}
         {...props}
    >
      {items.map((dropdownItem) => (
        <Link to={dropdownItem.link}
              className={style.dropdownList__item}
              key={dropdownItem.id}
              onClick={onClick}
        >
          <h3>{dropdownItem.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default MenuDropdown;