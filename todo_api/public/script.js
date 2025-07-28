// public/script.js

const todoForm = document.getElementById('todo-form');
const todoTitleInput = document.getElementById('todo-title');
const todoDescriptionInput = document.getElementById('todo-description');
const todoList = document.getElementById('todo-list');

const API_BASE_URL = '/api/todos'; // چون API روی همین لوکال هاست هست

// تابع برای واکشی همه وظایف و نمایش آنها
async function fetchTodos() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        todoList.innerHTML = '<li class="loading">خطا در بارگذاری وظایف. لطفا دوباره تلاش کنید.</li>';
    }
}

// تابع برای نمایش وظایف در DOM
function displayTodos(todos) {
    todoList.innerHTML = ''; // لیست رو پاک می‌کنیم تا دوباره بسازیم
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="loading">هنوز کاری برای انجام دادن وجود ندارد.</li>';
        return;
    }

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.dataset.id = todo._id || todo.id; // برای MongoDB از _id، برای حافظه از id
        listItem.classList.add('todo-item');
        if (todo.completed) {
            listItem.classList.add('completed');
        }

        listItem.innerHTML = `
            <div class="todo-text">
                <h3>${todo.title}</h3>
                <p>${todo.description || 'بدون توضیحات'}</p>
            </div>
            <div class="todo-actions">
                <button class="complete-btn" title="تغییر وضعیت">
                    <i class="fas ${todo.completed ? 'fa-check-square' : 'fa-square'}"></i>
                </button>
                <button class="delete-btn" title="حذف">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        // افزودن Event Listeners برای دکمه‌ها
        listItem.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(listItem.dataset.id, !todo.completed));
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(listItem.dataset.id));

        todoList.appendChild(listItem);
    });
}

// تابع برای اضافه کردن وظیفه جدید
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    const title = todoTitleInput.value.trim();
    const description = todoDescriptionInput.value.trim();

    if (!title) {
        alert('عنوان کار نمی‌تواند خالی باشد!');
        return;
    }

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        await response.json(); // نیازی به استفاده از این نیست، فقط برای مطمئن شدن از موفقیت
        todoTitleInput.value = ''; // پاک کردن فرم
        todoDescriptionInput.value = '';
        fetchTodos(); // رفرش لیست
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('خطا در اضافه کردن کار. لطفا دوباره تلاش کنید.');
    }
});

// تابع برای تغییر وضعیت (تکمیل شده / نشده)
async function toggleComplete(id, completedStatus) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: completedStatus })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchTodos(); // رفرش لیست
    } catch (error) {
        console.error('Error toggling todo status:', error);
        alert('خطا در تغییر وضعیت کار. لطفا دوباره تلاش کنید.');
    }
}

// تابع برای حذف وظیفه
async function deleteTodo(id) {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این کار را حذف کنید؟')) {
        return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchTodos(); // رفرش لیست
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert('خطا در حذف کار. لطفا دوباره تلاش کنید.');
    }
}

// هنگام بارگذاری صفحه، وظایف رو واکشی و نمایش بده
document.addEventListener('DOMContentLoaded', fetchTodos);