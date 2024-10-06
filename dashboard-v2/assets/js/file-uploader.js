/**
 * @description
 * This function formats bytes to respective formats
 */
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * @description
 * This function handles choosing files, showing and hiding inputs, showing preview
 */
function handleFileChoose(event) {
  let removeBtn, parent, file, fileSrc, vidElement, imgElement, nameElement, sizeElement;
  parent = event.target.closest(".custom-uploader");

  vidElement = parent.querySelector(".custom-uploader-preview video");
  imgElement = parent.querySelector(".custom-uploader-preview img");
  nameElement = parent.querySelector(".uploader-file-name");
  sizeElement = parent.querySelector(".uploader-file-size");

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  const validVideoTypes = ["video/mp4"];

  file = event.target.files[0];
  fileSrc = URL.createObjectURL(file);

  removeBtn = parent.querySelector(".uploader-cancel-btn");
  removeBtn.addEventListener("click", function () {
    event.target.value = "";
    vidElement.classList.add("d-none");
    imgElement.classList.add("d-none");
    URL.revokeObjectURL(fileSrc);
    imgElement.src = "";
    vidElement.src = "";
    vidElement.load();

    parent.querySelector(".uploader-empty").classList.remove("d-none");
    parent.querySelector(".uploader-content").classList.add("d-none");
  });

  if (validImageTypes.includes(file.type)) {
    parent.querySelector(".uploader-empty").classList.add("d-none");
    parent.querySelector(".uploader-content").classList.remove("d-none");

    vidElement.classList.add("d-none");
    imgElement.classList.remove("d-none");
    imgElement.src = fileSrc;
    nameElement.innerText = file.name;
    sizeElement.innerText = formatBytes(file.size);
  } else if (validVideoTypes.includes(file.type)) {
    file = event.target.files[0];
    fileSrc = URL.createObjectURL(file);

    parent.querySelector(".uploader-empty").classList.add("d-none");
    parent.querySelector(".uploader-content").classList.remove("d-none");

    imgElement.classList.add("d-none");
    vidElement.classList.remove("d-none");
    vidElement.src = fileSrc;
    nameElement.innerText = file.name;
    sizeElement.innerText = formatBytes(file.size);
    vidElement.load();
  } else {
    return false;
  }
}

const uploadersInputsList = document.querySelectorAll(".custom-uploader input");
uploadersInputsList.forEach((uploaderInput) =>
  uploaderInput.addEventListener("change", function (e) {
    handleFileChoose(e);
  })
);
