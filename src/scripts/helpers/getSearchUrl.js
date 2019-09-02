import { BASE_SEARCH_URL, TOKEN, PER_PAGE, MAX_REPOS_PER_PAGE } from '../constants';

const getUsersSearchUrl = searchValue => {
    return `${BASE_SEARCH_URL}search/users?q=${searchValue}+in%3Alogin&access_token=${TOKEN}&per_page=${PER_PAGE}`;
};

const getReposSearchUrl = user => {
    return `${BASE_SEARCH_URL}users/${user}/repos?access_token=${TOKEN}&per_page=${MAX_REPOS_PER_PAGE}`;
};

export { getUsersSearchUrl, getReposSearchUrl };
