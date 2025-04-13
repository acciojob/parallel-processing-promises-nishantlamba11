//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");


const  imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Could not load ${url}`);
    img.src = url;
  });
}

// Function to load all images
function loadAllImages(urlObjects) {
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const output = document.getElementById('output');

  // Show loading spinner
  loading.style.display = 'block';
  error.textContent = '';
  output.innerHTML = '';

	 const promises = urlObjects.map(obj => loadImage(obj.url));

  Promise.all(promises)
    .then(images => {
      loading.style.display = 'none';
      images.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loading.style.display = 'none';
      error.textContent = err;
    });
}

// Start downloading
window.onload = () => {
  loadAllImages(imageUrls);
};
