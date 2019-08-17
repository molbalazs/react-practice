export function getRepositories() {
    const url = 'https://api.github.com/users/molbalazs/repos';
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((data) => data.map(repository => {
                return {
                    name: repository.full_name,
                    commitsUrl: repository.commits_url
                };
            })
        )
}

export function getCommits() {
    const url = 'https://api.github.com/users/molbalazs/webshop/commits';
    return fetch(url)
        .then((response) => response.json())
        .then(response => {
            console.log(response);
            return response;
        });
}