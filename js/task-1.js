'use strict';


import images from '../js/gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  bigImg: document.querySelector('.lightbox__image'),
  img: document.querySelector('.gallery__image'),
};

function galleryItem({ preview, original, description }) {
  const li = `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;

  return li;
}

function createGallery(images) {
  return images.map(image => galleryItem(image)).join('');
}

const createList = createGallery(images);

refs.gallery.insertAdjacentHTML('afterbegin', createList);



refs.gallery.addEventListener('click', openImage);

function openImage(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }

  refs.lightbox.classList.add('is-open');

  const imgUrl = e.target.dataset.source;
  refs.bigImg.src = imgUrl;
}

const closeButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);

closeButton.addEventListener('click', closeLightbox);

function closeLightbox() {
  refs.bigImg.src = '';
  refs.lightbox.classList.remove('is-open');
}