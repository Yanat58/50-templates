const IMAGE0 =
  "https://images.unsplash.com/photo-1713453054079-7231d9c7d521?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8"
const IMAGE1 =
  "https://images.unsplash.com/photo-1713184355726-d3a31d822fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D"
const IMAGE2 =
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGRlc2luZyUyMHJvb218ZW58MHx8MHx8fDA%3D"
const IMAGE3 =
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRlc2luZyUyMHJvb218ZW58MHx8MHx8fDA%3D"

const images = [IMAGE0, IMAGE1, IMAGE2, IMAGE3]

const image0 = document.getElementById("image0")
const image1 = document.getElementById("image1")
const image2 = document.getElementById("image2")
const image3 = document.getElementById("image3")

const lightbox = document.getElementById("lightbox")

const previewImg = document.getElementById("preview-image")

const modalImagesBlock = document.getElementById(
  "modal-images-block"
)

image0.src = IMAGE0
image1.src = IMAGE1
image2.src = IMAGE2
image3.src = IMAGE3

let activeId = null
previewImg.src = images[0]

const modalImagesElements =
  modalImagesBlock.getElementsByTagName("img")

const modalImages = Object.values(modalImagesElements)

modalImages.forEach((imageElement, i) => {
  console.log(imageElement)
  imageElement.src = images[i]
})

function openModal(imgId) {
  if (activeId !== null) {
    modalImages[activeId].classList.remove("active")
  }

  activeId = imgId

  lightbox.classList.add("visible")

  previewImg.src = images[imgId]

  modalImages[imgId].classList.add("active")
}

function closeModal() {
  lightbox.classList.remove("visible")
}

function control(direction) {
  const prevId = activeId
  if (direction === 1) {
    // next
    activeId =
      activeId + 1 > images.length - 1
        ? // then go to the beginning
          (activeId = 0)
        : (activeId = activeId + 1)
  } else {
    // previous
    activeId =
      activeId - 1 < 0
        ? // then go to the end
          (activeId = images.length - 1)
        : activeId - 1
  }

  previewImg.src = images[activeId]
  modalImages[activeId].classList.add("active")
  modalImages[prevId].classList.remove("active")
}

