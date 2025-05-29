
/**
 * Compresses an image file and downloads it in WebP format.
 * @param {File} file - The image file to compress.
 * @param {string} fileName - The name for the downloaded file, without extension.
 * @returns {Promise<void>}
 */
async function resizeImage(file, optionsParams = {}) {
    const options = {
        maxSizeMB: 3, // MB
        useWebWorker: true, // Use web worker for compression
        fileType: 'image/webp', // Output file type
        libURL: '/assets/js/browser-image-compression.js',

        maxWidthOrHeight: optionsParams.maxWidthOrHeight || 1440, // Width or height max
        initialQuality: optionsParams.initialQuality || 0.8, // Initial quality
    };
console.log('Resizing image with options:', options);
    const resizedImage = await imageCompression(file, options);
    downloadImage(resizedImage, optionsParams.fileName || 'compressed_image');
}

function downloadImage(file, fileName = 'compressed_image') {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName + '.webp';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}
