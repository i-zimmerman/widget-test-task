import React, {useCallback, useEffect, useMemo, useState} from 'react';
import List from "../List";
import ListItem from "../ListItem";
import SocialPost from "../SocialPost";
import {useHttpClient} from "../../hooks/use-http";
import {DEFAULT_NUM_OF_POSTS, DEFAULT_UPDATE_INTERVAL, SOCIAL_FEED_API} from "../../constants/socialFeed";
import {useQuery} from "../../hooks/use-query";
import styles from './SocialFeed.module.css'

type IPost = {
    id: number,
    author: string,
    created_at: string,
    text: string,
    user: {
        name: string
    }
}

const SocialFeed = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const { sendRequest, isLoading, errorMessage, clearError } = useHttpClient();
    const query = useQuery()

    const { updateInterval, numberOfPosts } = useMemo(() => {
        return {
            updateInterval: +(query.get('updateIntervalMinutes') || DEFAULT_UPDATE_INTERVAL) * 60000,
            numberOfPosts: +(query.get('numberOfPosts') || DEFAULT_NUM_OF_POSTS)
        }
    }, [])

    const getPosts = useCallback(async () => {
        try {
            // number of posts go into send request (api is not working properly now, website is down)
            const posts = await sendRequest(SOCIAL_FEED_API);
            setPosts(posts);
        } catch (e) {}
    }, [numberOfPosts])

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await getPosts()
        }, updateInterval)

        return () => {
            clearInterval(intervalId)
        }

    }, [updateInterval, getPosts]);


    useEffect(() => {
        getPosts()
    }, [])

    return <>
        {isLoading && <div>LOADING...</div>}
        {errorMessage &&
        <div>
            <div>{errorMessage}</div>
            <button onClick={clearError}>Close error message</button>
        </div>}
        {!isLoading && !errorMessage && <List className={styles.socialFeedList}>
        {posts.map((post) => {
                return <ListItem key={post.id} className={styles.socialFeedListItem}>
                    <SocialPost author={post.user.name} date={post.created_at} message={post.text} />
                </ListItem>
            })}
            </List>}
        </>
}

export default SocialFeed