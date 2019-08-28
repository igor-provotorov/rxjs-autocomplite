import { fromEvent, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { debounceTime, distinctUntilChanged, map, switchMap, tap, catchError } from 'rxjs/operators';

import { getSearchUrl } from './helpers/getSearchUrl';
import '../styles/materialize.min.css';
import '../styles/style.css';


const searchBox = document.querySelector('input');
const resultsList = document.querySelector('ul');

const renderUsers = (name) => {
    const node = document.createElement('li');
    const textnode = document.createTextNode(name);
    node.appendChild(textnode);
    resultsList.appendChild(node);
}

const fetchUsers = (query) => fromFetch(getSearchUrl(query))
    .pipe(
        switchMap(response => {
            if (response.ok) {
                return response.json();
            } else {
                return of({ error: true, message: `Error ${response.status}` });
            }
        }),
        catchError(err => {
            return of({ error: true, message: err.message })
        })
    )
 
const inputObservable = fromEvent(searchBox, 'input')
    .pipe(
        debounceTime(500),
        map(event => event.target.value),
        distinctUntilChanged(),
        tap(() => resultsList.innerHTML = ''),
        switchMap(query => query ? fetchUsers(query) : of({ error: true }))
    )

inputObservable.subscribe(
    data => {
        if (data.total_count === 0) {
            renderUsers('There are no such users');
        } else if (!data.error) {
            data.items.forEach(item => {
                renderUsers(item.login);
            });
        } else {
            renderUsers('You must enter something to search');
        }        
    }
)
