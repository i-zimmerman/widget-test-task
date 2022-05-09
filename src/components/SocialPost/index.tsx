import React, {memo} from "react";
import styles from './SocialPost.module.css';

interface ISocialPost {
  author: string,
  date: string,
  message: string
}

const SocialPost = memo<ISocialPost>(({ date, author, message  }) => {
  return <div className={styles.post}>
    <h5>{author}</h5>
    <span>{date}</span>
    <p>{message}</p>
  </div>
})

export default SocialPost