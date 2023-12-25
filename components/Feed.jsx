'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import PromptCard from './PromptCard';
import { searchByTag, searchFilter } from '@utils/search';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="prompt_layout mt-16">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const [posts, setPosts] = useState([]);
    console.log(posts);

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchText(value);
    };

    const filteredPosts =
        searchText.length > 0
            ? searchFilter(posts, searchText)
            : searchTag.length > 0
              ? searchByTag(posts, searchTag)
              : posts;

    const handleTagClick = (tag) => {
        setSearchTag(tag);
    };
    return (
        <section className="feed">
            <form className="flex-center relative w-full">
                <input
                    type="text"
                    className="search_input peer"
                    value={searchText}
                    onChange={(e) => handleSearchChange(e)}
                    placeholder="Search for prompts"
                    required
                />
                <button
                    type="button"
                    value="reset"
                    onClick={() => {
                        setSearchTag('');
                        setSearchText('');
                    }}
                    className="ml-2"
                >
                    <Image
                        src="/assets/icons/undo.png"
                        width={20}
                        height={20}
                        alt="undo"
                    />
                </button>
            </form>
            {filteredPosts.length > 0 ? (
                <PromptCardList
                    data={
                        filteredPosts &&
                        filteredPosts.length > 0 &&
                        filteredPosts
                    }
                    handleTagClick={handleTagClick}
                />
            ) : null}
        </section>
    );
};

export default Feed;
