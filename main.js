document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://randomuser.me/api/?results=100';
    let users = [];

    const userList = document.getElementById('user-list');
    const loader = document.getElementById('loader');
    const sortSelect = document.getElementById('sort');
    const filterInput = document.getElementById('filter');

    function showLoader() {
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    function fetchUsers() {
        showLoader();
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                users = data.results;
                hideLoader();
                displayUsers(users);
            })
            .catch(error => {
                hideLoader();
                console.error('Error fetching users:', error);
            });
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        if (users.length === 0) {
            userList.innerHTML = '<li>Bunaqa user yoq</li>';
            return;
        }
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name.first} ${user.name.last},
             Age: ${user.dob.age}`;
            userList.appendChild(listItem);
        });
    }

    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        if (sortBy === 'name-asc') {
            users.sort((a, b) => a.name.first.localeCompare(b.name.first));
        } else if (sortBy === 'name-desc') {
            users.sort((a, b) => b.name.first.localeCompare(a.name.first));
        } else if (sortBy === 'age-asc') {
            users.sort((a, b) => a.dob.age - b.dob.age);
        } else if (sortBy === 'age-desc') {
            users.sort((a, b) => b.dob.age - a.dob.age);
        }
        displayUsers(users);
    });

    filterInput.addEventListener('input', () => {
        const query = filterInput.value.toLowerCase();
        const filteredUsers = users.filter(user =>
            user.name.first.toLowerCase().includes(query) ||
            user.name.last.toLowerCase().includes(query)
        );
        displayUsers(filteredUsers);
    });

    fetchUsers();
});
