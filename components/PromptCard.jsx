'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [copy, setCopy] = useState('');
    const handleCopy = () => {
        setCopy(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => {
            setCopy('');
        }, 3000);
    };
    return (
        <div className="prompt_card">
            <div className="flex items-start justify-between gap-5">
                <div className="flex-1 cursor-pointer items-center justify-start gap-3">
                    <Image
                        src={post.creator.image}
                        alt="user_name"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                        onClick={() =>
                            router.push(`/profile/${post.creator._id}`)
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="font-satoshi font-semibold text-gray-900">
                        {post.creator.username}
                    </h3>
                    <p className="font-inter text-sm text-gray-500">
                        {post.creator.email}
                    </p>
                </div>
                <div className="copy_btn" onClick={handleCopy}>
                    <Image
                        src={
                            copy === post.prompt
                                ? '/assets/icons/tick.svg'
                                : '/assets/icons/copy.svg'
                        }
                        width={12}
                        height={12}
                        alt={'icon'}
                    />
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">
                {post.prompt}
            </p>
            <p
                className="blue_gradient cursor-pointer font-inter text-sm"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                {post.tag}
            </p>
            {session?.user.id === post.creator._id &&
                pathname === '/profile' && (
                    <div className="flex-center mt-5 gap-4 border-t border-gray-100 pt-3">
                        <p
                            onClick={() => handleEdit && handleEdit(post)}
                            className="green_gradient cursor-pointer  font-inter text-sm"
                        >
                            Edit
                        </p>
                        <p
                            onClick={() => handleDelete && handleDelete(post)}
                            className="orange_gradient cursor-pointer font-inter text-sm"
                        >
                            Delete
                        </p>
                    </div>
                )}
        </div>
    );
};

export default PromptCard;
