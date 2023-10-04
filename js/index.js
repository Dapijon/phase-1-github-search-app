document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value;

    // Make a request to the User Search Endpoint
    searchUsers(searchInput);
});

function searchUsers(username) {
    const apiUrl = `https://api.github.com/search/users?q=${username}`;
    const headers = new Headers({
        'Accept': 'application/vnd.github.v3+json'
    });

    fetch(apiUrl, { headers })
        .then(response => response.json())
        .then(data => {
            // Display user information
            displayUsers(data.items);
        })
        .catch(error => console.error('Error searching users:', error));
}

function displayUsers(users) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50">
            <p>${user.login}</p>
            <a href="${user.html_url}" target="_blank">Profile</a>
        `;

        // Add click event to fetch and display user repos
        userDiv.addEventListener('click', function () {
            getUserRepos(user.login);
        });

        resultsDiv.appendChild(userDiv);
    });
}

function getUserRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    const headers = new Headers({
        'Accept': 'application/vnd.github.v3+json'
    });

    fetch(apiUrl, { headers })
        .then(response => response.json())
        .then(data => {
            // Display user repos
            displayRepos(data);
        })
        .catch(error => console.error('Error fetching user repos:', error));
}

function displayRepos(repos) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `
            <p>${repo.name}</p>
            <p>${repo.description}</p>
        `;

        resultsDiv.appendChild(repoDiv);
    });
}
