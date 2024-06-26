let data = [
    {
        id: 1,
        name: 'Ginger Bread',
        countInStore: 400,
        pricePerOne: 2.50,
        currency: 'GBP',
        onDisplay: true,
        countOnDisplay: 50,
        category: 'food'
    },
    {
        id: 2,
        name: 'Jamaican Cookie ',
        countInStore: 20,
        pricePerOne: 1.20,
        currency: 'GBP',
        onDisplay: false,
        countOnDisplay: 0,
        category: 'biscuit'
    },
]

dataDisplay = localStorage.getItem('object');

console.log(dataDisplay, 'data')
const displayInventory = () => {
    localStorage.setItem('object', JSON.stringify(data))
    console.log(data, 'data')

    let dataDisplay = document.querySelector(".table-display")

    if (!dataDisplay) {
        alert('No Data Available');
        return;
    }

    let object = localStorage.getItem('object')
    let objectData = JSON.parse(object);
    let elements = '';

    objectData.map(record => (
        elements += `
        <tr> 
            <td>${record.name}</td>
            <td>${record.countInStore}</td>
            <td>${record.pricePerOne}</td>
            <td>${record.onDisplay === true ? 'Yes' : 'No'}</td>
            <td>${record.countOnDisplay}</td>
            <td>${record.category}</td>
            <td class='action'>
                <button onclick="showEditModal(${record.id})" id="edit-btn" class="edit" type='button'>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button onclick="deleteRec(${record.id})" class="delete">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
        `
    ))
    dataDisplay.innerHTML = elements

    dataDisplay = localStorage.getItem('object');


    // localStorage.setItem('object', JSON.stringify(data));
}

const saveData = () => {
    localStorage.setItem('productData', JSON.stringify(data));

};

const add = () => {
    let productName = document.querySelector('.productname').value;
    let productCount = document.querySelector('.productcount').value;
    let onShelf = document.querySelector('.onshelf').value === 'true';
    let shelfCount = document.querySelector('.shelfcount').value;
    let price = document.querySelector('.price').value;
    let category = document.querySelector('.category').value;

    let newObj = {
        id: data.length + 1,
        name: productName,
        countInStore: productCount,
        pricePerOne: price,
        currency: 'GBP',
        onDisplay: onShelf,
        countOnDisplay: shelfCount,
        category: category
    }

    data.push(newObj);
    saveData();
    document.querySelector('.modal').style.display = 'none'
    displayInventory();
}

const showEditModal = (id) => {
    console.log('fired', id)
    editModal.style.display = 'block'

    let obj = data.find(rec => rec.id === id);

    document.querySelector('.editproductname').value = obj.name;
    document.querySelector('.editproductcount').value = obj.countInStore;
    document.querySelector('.editonshelf').value = obj.onDisplay;
    document.querySelector('.editshelfcount').value = obj.countOnDisplay;
    document.querySelector('.editprice').value = obj.pricePerOne;
    document.querySelector('.editcategory').value = obj.category;
    document.querySelector('.id').value = obj.id;


}

function edit() {
    let id = parseInt(document.querySelector('.id').value)
    let name = document.querySelector('.editproductname').value;
    let productCount = document.querySelector('.editproductcount').value;
    let onShelf = document.querySelector('.editonshelf').value;
    let shelfCount = document.querySelector('.editshelfcount').value
    let price = document.querySelector('.editprice').value
    let category = document.querySelector('.editcategory').value

    let obj = data.findIndex(rec => rec.id === id)
    data[obj] = {
        id,
        name,
        countInStore: productCount,
        onDisplay: onShelf,
        countOnDisplay: shelfCount,
        pricePerOne: price,
        category
    }

    closeEditModal();
    saveData();
    displayInventory();

}

function deleteRec(id) {
    data = data.filter(rec => rec.id !== id);
    saveData();
    displayInventory();

}

let modal = document.querySelector(".modal");
let modalButton = document.getElementById("create-btn-modal")
let closeModal = document.getElementsByClassName('close')[0];

modalButton.onclick = function () {
    modal.style.display = 'block'
}

closeModal.onclick = function () {
    modal.style.display = 'none';
}
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = 'none'
    }
}

let editModal = document.querySelector(".modal-edit");
let editModalButton = document.getElementById("edit-btn");

function closeEditModal() {
    console.log('fired')
    editModal.style.display = 'none'
}

window.onclick = function (e) {
    if (e.target == editModal) {
        editModal.style.display = 'none'
    }
}

