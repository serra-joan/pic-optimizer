import imageCompression from 'browser-image-compression';

/**
 * Compresses an image file and downloads it in WebP format.
 * @param {File} file - The image file to compress.
 * @param {string} fileName - The name for the downloaded file, without extension.
 * @returns {Promise<void>}
 */
export async function resizeImage(file, fileName) {
    const options = {
        maxSizeMB: 3, // MB
        maxWidthOrHeight: 1920, // Width or height max
        useWebWorker: true, // Use web worker for compression
        fileType: 'image/webp' // Output file type
    };

    const resizedImage = await imageCompression(file, options);
    downloadImage(resizedImage, fileName);
}

function downloadImage(file, fileName = 'compressed_image') {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName + '.webp';
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}
