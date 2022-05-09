import React, {CSSProperties, memo, ReactNode} from "react";
import styles from './List.module.css'
import classNames from "classnames";


interface IList {
    children: ReactNode,
    style?: CSSProperties,
    className?: string,
}

const List = memo<IList>(({ className,children , style}) => {
    return <ul className={classNames(styles.list, className)} style={style}>
        {children}
    </ul>
})


export default List