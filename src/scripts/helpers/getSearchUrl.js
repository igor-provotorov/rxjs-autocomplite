import { BASE_SEARCH_URL, TOKEN, PER_PAGE } from '../constants';

const getUsersSearchUrl = searchValue => {
    return `${BASE_SEARCH_URL}search/users?q=${searchValue}+in%3Alogin&access_token=${TOKEN}&per_page=${PER_PAGE}`;
};

const getReposSearchUrl = user => {
    return `${BASE_SEARCH_URL}users/${user}?access_token=${TOKEN}`;
};

export { getUsersSearchUrl, getReposSearchUrl };
