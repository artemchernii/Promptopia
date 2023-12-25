'use client';

import Profile from '@components/Profile';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
    const router = useRouter();
    const [userPosts, setUserPosts] = useState([]);
    const { data: session } = useSession();
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user.id}/posts`
            );
            const data = await response.json();

            if (data) {
                setUserPosts(data);
            }
        };

        if (session) {
            fetchPosts();
        }
    }, [session]);

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
        console.log(`/updated-prompt?id=${post._id}`);
        router.push(`/updated-prompt?id=${post._id}`);
    };

    return (
        <>
            <Profile
                name={'My'}
                desc={'Welcome to your personalized profile'}
                data={userPosts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default MyProfile;
