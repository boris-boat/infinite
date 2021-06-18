const imageContainer = document.getElementById('image-container')
//const loader = document.getElementById('loader')
let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []


//Unsplash api
const count = 30
const apiKey = 'PUlI6kK5qS0IbeKjFQRH9BUHNUmWSLGg1w2weCKsHNA'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
// Check if all images are loaded

function imageLoaded() {
    
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
        console.log('ready = ', ready)
    }
       
    
}

//helper function 
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key , attributes[key])
    }
}

function displayPhotos(){
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('total images ' , totalImages)
photosArray.forEach((photo) => {
    //create <a> to lin to unsplash
    const item = document.createElement('a')
    // item.setAttribute('href',photo.links.html)
    // item.setAttribute('target','_blank')
    setAttributes(item, {
     href:photo.links.html,
     target : '_blank',   
    })
    //create img for photo
    const img = document.createElement('img')
    // img.setAttribute('src',photo.urls.regular)
    // img.setAttribute('alt',photo.alt_description)
    // img.setAttribute('title',photo.alt_description)
    setAttributes(img,{
        src: photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description,
    })
    // event listener , check when each is finished loading

img.addEventListener('load', imageLoaded)

    //put img inside a , then put both inside image container element
    item.appendChild(img)
    imageContainer.appendChild(item)
    

})
}


// create elements for links and photos add to dom



// Get photos from Unsplashed
async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        console.log(photosArray)
        displayPhotos()
    }catch (error){
//cath error here
    }
    
}

// check to see if scroilling near bottom of page , load more photos
window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()

    }
})
//on load
getPhotos()
