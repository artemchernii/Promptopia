export const searchFilter = (posts, searchTerm) => {
    let filteredPosts;
    const term = searchTerm.toLowerCase();
    const testCase = (value) => value.toLowerCase().includes(term);

    if (searchTerm.length > 0) {
        filteredPosts = posts.filter(
            ({ tag, prompt, creator }) =>
                testCase(tag) || testCase(prompt) || testCase(creator.username)
        );
    }
    return filteredPosts;
};
export const searchByTag = (posts, tag) => {
    console.log(posts);
    return posts.filter((post) => post.tag === tag);
};
