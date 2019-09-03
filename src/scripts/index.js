import { fromEvent, of, forkJoin } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { debounceTime, distinctUntilChanged, map, switchMap, tap, catchError } from 'rxjs/operators';

import { getUsersSearchUrl, getReposSearchUrl } from './helpers/getSearchUrl';
import { HALF_SECOND_DELAY } from './constants';
import '../styles/materialize.min.css';
import '../styles/style.css';

const searchBox = document.querySelector('input');
const resultsList = document.querySelector('ul');

const renderException = name => {
    const node = document.createElement('li');
    node.innerText = `${name}`;
    resultsList.appendChild(node);
};

const renderUsersWithRepos = users => {
    const make = ({ login, reposCount }) => {
        const liElement = document.createElement('li');
        const spanElement = document.createElement('span');
        liElement.innerText = `${login}`;
        spanElement.innerText = `${reposCount} repositories`;
        liElement.appendChild(spanElement);
        resultsList.appendChild(liElement);
    };

    users.forEach(user => make(user));
};

const fetchUsers = query => {
    if (query.trim() === '') {
        resultsList.innerHTML = '';
        renderException('You must enter something to search');
        return [];
    }
    return fromFetch(getUsersSearchUrl(query)).pipe(
        switchMap(response => response.json()),
        catchError(err => of({ error: true, message: err.message }))
    );
};

const fetchRepositories = user =>
    fromFetch(getReposSearchUrl(user)).pipe(
        switchMap(response => response.json()),
        catchError(err => of({ error: true, message: err.message }))
    );

const checkEmptyUsers = users => {
    if (users.total_count === 0) {
        resultsList.innerHTML = '';
        renderException('There are no such users');
    }
    return users.items;
};

const inputObservable = fromEvent(searchBox, 'input').pipe(
    debounceTime(HALF_SECOND_DELAY),
    map(event => event.target.value),
    distinctUntilChanged(),
    tap(() => (resultsList.innerHTML = 'Loading...')),
    switchMap(query => fetchUsers(query.trim())),
    map(users => checkEmptyUsers(users)),
    switchMap(
        users => forkJoin(users.map(user => fetchRepositories(user.login))),
        (users, repos) => users.map((user, index) => ({ login: user.login, reposCount: repos[index].public_repos }))
    ),
    tap(() => (resultsList.innerHTML = ''))
);

inputObservable.subscribe({
    next: data => renderUsersWithRepos(data),
    error: error => console.log(error.message),
});
