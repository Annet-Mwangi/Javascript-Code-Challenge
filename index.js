document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const clearListButton = document.getElementById('clearListButton');
    const shoppingList = document.getElementById('shoppingList');
    
    let items = [];

    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', clearList);

    function addItem() {
        const itemText = itemInput.value.trim();
        if (itemText === '') return;
        
        items.push(itemText);
        updateList();
        itemInput.value = '';
    }

    function updateList() {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.addEventListener('click', () => markPurchased(index));
            shoppingList.appendChild(listItem);
        });
    }
}
