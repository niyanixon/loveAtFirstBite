document.querySelector('button').addEventListener('click', getResturant)

function getResturant(){
    const city = document.querySelector('.resturantInput').value.toLowerCase()
    const url = `/api/${city}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector('img').src = data.url
    })
}

restaurants.asian["Double Knot"]