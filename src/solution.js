import galleryItems from "../gallery-items.js";
const lenGallery = galleryItems.length - 1; // длинна массива картинок
let currentIndex = 0; // текущая позиция картинки

const listItemsEl = document.querySelector(".js-gallery");

const modalEl = document.querySelector(".js-lightbox");

const contentModalEl = document.querySelector(".lightbox__image");

listItemsEl.addEventListener("click", onModalOpen);

modalEl.addEventListener("click", onModalClose);

const listMarkup = createListMarkup(galleryItems);

listItemsEl.innerHTML = listMarkup;

function createListMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class='gallery__item'>
        <a
            class='gallery__link'
            href='${original}'
        >
            <img
                class='gallery__image'
                src='${preview}'
                data-source='${original}'
                alt='${description}'
            />
        </a>
      </li>`;
    })
    .join("");
  //
}

function onModalOpen(event) {
  event.preventDefault(); //  отмена перезагрузки страница или переход по ссылке
  if (event.target.nodeName !== "IMG") return;

  window.addEventListener("keydown", onEscapePress);

  const atrSrcCont = event.target.dataset.source;
  const atrAltCont = event.target.alt;

  showAndAddDataToModal(atrSrcCont, atrAltCont);
}

function onModalClose(event) {
  const action = event.target;
  if (
    action.dataset.action === "close-lightbox" ||
    action.className === "lightbox__overlay"
  ) {
    hideAndRemoveDataToModal();
  }
}

function showAndAddDataToModal(atrSrc, atrAlt) {
  modalEl.classList.add("is-open");

  contentModalEl.src = atrSrc;
  contentModalEl.alt = atrAlt;
}

function hideAndRemoveDataToModal() {
  window.removeEventListener("keydown", onEscapePress);
  modalEl.classList.remove("is-open");

  contentModalEl.src = "";
  contentModalEl.alt = "";
}

function onEscapePress(event) {
  console.log(event.code);
  const ESC_KEY_CODE = "Escape";
  const LEFT_KEY_CODE = "ArrowLeft";
  const RIGHT_KEY_CODE = "ArrowRight";

  const isKeyEsc = event.code === ESC_KEY_CODE;
  const isKeyLeft = event.code === LEFT_KEY_CODE;
  const isKeyRight = event.code === RIGHT_KEY_CODE;

  if (isKeyEsc) hideAndRemoveDataToModal();
  if (isKeyLeft) prevItem();
  if (isKeyRight) nextItem();
}
function prevItem() {
  findCurrentIndexItem();
  if (currentIndex > 0) {
    currentIndex -= 1;
  }

  contentModalEl.src = galleryItems[currentIndex].original;
  contentModalEl.alt = galleryItems[currentIndex].description;
}

function nextItem() {
  findCurrentIndexItem();

  if (currentIndex < lenGallery) {
    currentIndex += 1;
  }

  contentModalEl.src = galleryItems[currentIndex].original;
  contentModalEl.alt = galleryItems[currentIndex].description;
}

function findCurrentIndexItem() {
  galleryItems.find(({ original }, index) => {
    currentIndex = index;
    return original === contentModalEl.src;
  });
}
