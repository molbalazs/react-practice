export function getRepositories(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => data.map(repository => {
                return {
                    name: repository.full_name,
                    commitsUrl: repository.commits_url.split('{')[0],
                };
            })
        )
}

export function getCommits(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok || response.message === 'Not Found') {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json());
}