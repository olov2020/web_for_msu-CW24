import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import style from '../../../header.module.css';

// eslint-disable-next-line react/prop-types,react/display-name
const MenuDropdown = forwardRef(({ items = [], onClick, ...props }, ref) => {
  return (
    <div className={style.menu__dropdownList} ref={ref} {...props}>
      {items.map((dropdownItem) => (
        <Link
          to={dropdownItem.link}
          className={style.dropdownList__item}
          key={dropdownItem.id}
          onClick={onClick}
        >
          <h3>{dropdownItem.title}</h3>
        </Link>
      ))}
    </div>
  );
});

export default MenuDropdown;
