const products = [
    {
        id: 1,
        category_id: 2,
        name: "Apple",
        description:
            "Overprice phones.",
    },
    {
        id: 2,
        category_id: 5,
        name: "Sven",
        description:
            "MS-2050.",
    },
    {
        id: 3,
        category_id: 2,
        name: "Google pixel",
        description:
            "Best camera phone.",
    },

    {
        id: 4,
        category_id: 3,
        name: "Lenues",
        description:
            "Bla bla for Lenues.",
    },
    {
        id: 5,
        category_id: 3,
        name: "Powercase",
        description:
            "Bla bla for Powercase.",
    },
    {
        id: 6,
        category_id: 2,
        name: "Xiaomi",
        description:
            "Low price phones.",
    },
    {
        id: 7,
        category_id: 4,
        name: "Sony",
        description:
            "WH-1000XM3B.",
    },
    {
        id: 8,
        category_id: 1,
        name: "Samsung",
        description: "Smart on your hand.",
    },
    {
        id: 9,
        category_id: 4,
        name: "B & O",
        description:
            "Bang & Olufsen Beoplay Portal PC PS Black Anthracite.",
    },
    {
        id: 10,
        category_id: 3,
        name: "Lenovo",
        description:
            "Bla bla for Lenovo.",
    },
    {
        id: 11,
        category_id: 1,
        name: "Garmin",
        description:
            "Survival watches.",
    },
    {
        id: 12,
        category_id: 4,
        name: "Bose",
        description:
            "QuietComfort 45.",
    },
    {
        id: 13,
        category_id: 2,
        name: "One plus",
        description:
            "Phones for geeks.",
    },
    {
        id: 14,
        category_id: 5,
        name: "JBL",
        description:
            "Flip.",
    },
    {
        id: 15,
        category_id: 5,
        name: "Philips",
        description:
            "TAR-2506.",
    },
];

const container = document.querySelector(".container");
const productsUl = document.querySelector("#products");
const description = document.querySelector("#description");
const buyButton = document.querySelector("#buy-button");
const form = document.querySelector('.form');
const formMy = document.forms.myForm;
const userInput = document.querySelector('.user-input');
const userInputContainerBtn = document.querySelector('.user-input__container-btn');
const table = document.querySelector("#table");
const elements = formMy.elements;
const [name, lastName, secondName, city, post, quantity, comment, card, cash] = elements;
const infoArgs = [name, lastName, secondName, city, post, quantity, comment, card, cash]
let productsByCategory;

container.addEventListener("click", (e) => {
    const target = e.target;

    if (target.closest("#categories")) {
        showProductList(productsByCategory, target);
        productsUl.classList.remove('invisible');
        description.classList.remove('visible');
        buyButton.classList.remove('visible');
        form.classList.add('invisible');
    }

    if (target.closest("#products")) {
        showProductInfo(target, products);
        form.classList.add('invisible');
        description.classList.remove('invisible');
        buyButton.classList.remove('invisible');
    }
});

function createArrayByCategory(categoryId) {
    return products.filter((el) => {
        return el.category_id === categoryId;
    });
}

function showProductList(list, target) {
    list = createArrayByCategory(Number(target.dataset.categoryId));
    let productsList = productsUl.querySelectorAll("li");

    if (list.length > productsList.length) {
        const countIteration = list.length - productsList.length;

        for (let i = 0; i < countIteration; i++) {
            const li = document.createElement("li");
            productsUl.appendChild(li);
            console.log(productsUl.length);
        }
        productsList = productsUl.querySelectorAll("li");
    }

    productsList.forEach((el) => {
        el.innerText = "";
    });

    list.forEach((el, index) => {
        productsList[index].innerText = el.name;
    });

    productsUl.classList.add('visible')
}

function showProductInfo(target, listProduct) {
    const product = listProduct.find((el) => el.name === target.innerText);
    description.innerText = product.description;
    description.classList.add('visible')
    buyButton.classList.add('visible')
}

function formDrop() {
    buyButton.addEventListener('click', () => {
        form.classList.remove('invisible')
    })
}
formDrop()

form.onchange = ({target: input}) => {
    const { value, required, minLength} = input;
    const validationMassage = input.nextElementSibling;

    if (required && value === '') {
        input.classList.add('is-invalid');
        validationMassage.classList.add('invalid-feedback');
        validationMassage.innerText = 'This field is required';
        return;
    }

    if (minLength && value.length < minLength) {
        input.classList.add('is-invalid');
        validationMassage.classList.add('invalid-feedback');
        validationMassage.innerText = `You need write here ${minLength} symbols`;
        return;
    }

    validationMassage.innerText = '';
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    userInput.classList.remove('invisible')
    container.classList.add('invisible')
    form.classList.add('invisible');
    productsUl.classList.add('invisible');
    description.classList.add('invisible');
    buyButton.classList.add('invisible');


    console.log(elements);
    for (const arg of infoArgs) {
        if (arg.name !== 'money') {
            const row = table.insertRow();
            const cell = row.insertCell();
            cell.innerText = `${arg.name}: ${arg.value}`;
        }
    }
    for (const arg of infoArgs) {
        if (arg.checked === true) {
            const row = table.insertRow();
            const cell = row.insertCell();
            cell.innerText = `${arg.name}: ${arg.value}`;
        }
    }
})

userInputContainerBtn.addEventListener('click', () => {
    userInput.classList.add('invisible');
    container.classList.remove('invisible');
    location.reload();
})