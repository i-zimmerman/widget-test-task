import React, {CSSProperties, memo, ReactNode} from "react";
import styles from './ListItem.module.css'
import classNames from "classnames";


interface IListItem {
    children: ReactNode,
    style?: CSSProperties,
    className?: string,
}

const ListItem = memo<IListItem>(({ className,children , style}) => {
    return <li className={classNames(styles.list_item, className)} style={style}>
        {children}
    </li>
})


export default ListItem