document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItemButton");
    const shoppingList = document.getElementById("shoppingList");
    const clearListButton = document.getElementById("clearListButton");

    // Initialize shopping list array
    let shoppingItems = [];

    // Load items from local storage if available
    if (localStorage.getItem('shoppingItems')) {
        shoppingItems = JSON.parse(localStorage.getItem('shoppingItems'));
        shoppingItems.forEach(addItemToDOM);
    }

    // Add item to the list
    addItemButton.addEventListener("click", () => {
        const itemText = itemInput.value.trim();
        if (itemText) {
            const item = {
                text: itemText,
                purchased: false
            };
            shoppingItems.push(item);
            addItemToDOM(item);
            itemInput.value = '';
            saveToLocalStorage();
        }
    });

    // Mark item as purchased or edit item
    shoppingList.addEventListener("click", (e) => {
        if (e.target.tagName === 'LI') {
            const index = Array.from(shoppingList.children).indexOf(e.target);
            const item = shoppingItems[index];

            if (e.ctrlKey || e.metaKey) {
                // Edit item
                const newText = prompt("Edit item:", item.text);
                if (newText !== null && newText.trim() !== '') {
                    item.text = newText.trim();
                    e.target.textContent = newText.trim();
                    if (item.purchased) {
                        e.target.classList.add('purchased');
                    } else {
                        e.target.classList.remove('purchased');
                    }
                    saveToLocalStorage();
                }
            } else {
                // Toggle purchased
                item.purchased = !item.purchased;
                e.target.classList.toggle('purchased');
                saveToLocalStorage();
            }
        }
    });

    // Clear the list
    clearListButton.addEventListener("click", () => {
        shoppingItems = [];
        shoppingList.innerHTML = '';
        localStorage.removeItem('shoppingItems');
    });

    // Function to add item to DOM
    function addItemToDOM(item) {
        const li = document.createElement("li");
        li.textContent = item.text;
        if (item.purchased) {
            li.classList.add('purchased');
        }
        shoppingList.appendChild(li);
    }

    // Save items to local storage
    function saveToLocalStorage() {
        localStorage.setItem('shoppingItems', JSON.stringify(shoppingItems));
    }
});

       