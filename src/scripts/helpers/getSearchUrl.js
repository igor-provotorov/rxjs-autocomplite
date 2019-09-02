import { BASE_SEARCH_URL, TOKEN, PER_PAGE } from '../constants';

const getSearchUrl = searchValue => {
    return `${BASE_SEARCH_URL}${searchValue}+in%3Alogin&access_token=${TOKEN}&per_page=${PER_PAGE}`;
};

const getReposSearchUrl = user => {
    return `${BASE_SEARCH_URL}users/${user}/repos?access_token=${TOKEN}&per_page=${MAX_REPOS_PER_PAGE}`;
};

export { getUsersSearchUrl, getReposSearchUrl };
