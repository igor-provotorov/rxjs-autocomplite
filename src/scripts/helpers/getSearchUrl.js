import { BASE_SEARCH_URL, TOKEN, PER_PAGE, MAX_REPOS_PER_PAGE } from '../constants';

const getSearchUrl = searchValue => {
    return `${BASE_SEARCH_URL}${searchValue}+in%3Alogin&access_token=${TOKEN}&per_page=${PER_PAGE}`;
};

export { getSearchUrl };
