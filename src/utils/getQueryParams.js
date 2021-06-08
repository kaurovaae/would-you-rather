const getQueryParams = (searchQuery) => {
    if (typeof searchQuery !== 'string' || searchQuery.length === 0) {
        return {}
    }

    const search = searchQuery.substring(1);
    const queries = search.split('&');

    return queries.reduce((acc, currentQuery) => {
        const [queryKey, queryValue] = currentQuery.split('=');
        return {
            ...acc,
            [queryKey]: decodeURIComponent(queryValue)
        }
    }, {});
};

export default getQueryParams;
