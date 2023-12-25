'use client';

import Profile from '@components/Profile';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

const UserProfile = () => {
    const { id } = useParams();
    const router = useRouter();
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();

            setUser(data);
        };
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${id}/posts`);
            const data = await response.json();

            if (data) {
                setUserPosts(data);
            }
        };
        fetchUser();
        fetchPosts();
    }, [id]);
    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            'Are you sure you want to delete this prompt?'
        );

        if (hasConfirmed) {
            try {
                const response = await fetch(
                    `/api/prompt/${post._id.toString()}`,
                    { method: 'DELETE' }
                );
                console.log(response);
                const filteredPosts = userPosts.filter(
                    (p) => p._id !== post._id
                );

                setUserPosts(filteredPosts);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleEdit = async (post) => {
        router.push(`/updated-prompt?id=${post._id}`);
    };

    return (
        <>
            {user ? (
                <Profile
                    name={`${user.username[0].toUpperCase()}${user.username.slice(
                        1
                    )}`}
                    desc={`This is ${user.username} personalized profile.`}
                    data={userPosts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ) : null}
        </>
    );
};

export default UserProfile;
