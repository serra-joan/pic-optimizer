let globalFile;
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const btnAddOption = document.getElementById('btnAddOption');
const btnStartResize = document.getElementById('btnStartResize');
const optionsContainer = document.getElementById('optionsContainer');

dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('bg-gray-800');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('bg-gray-800');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('bg-gray-800');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Start resize button and the download
btnStartResize.addEventListener('click', () => {
    // Download the images resized
    const options = document.querySelectorAll('.options-container');

    options.forEach(option => {
        const device = option.querySelector('h3').textContent.toLowerCase();
        const initialQuality = document.getElementById('inpQualityRange').value || 80;
        const fileName = option.querySelector('input[name="inpFileName"]').value || `${device}_image`;
        const maxWidthOrHeight = parseInt(option.querySelector('input[name="inpWidth"]').value, 10) || 0;

        const optionsParams = {
        device,
        fileName,
        initialQuality,
        maxWidthOrHeight
        };

        // Init process
        if (globalFile && maxWidthOrHeight > 0) {
        resizeImage(globalFile, optionsParams);
        }
    });
});

// Add new option button
btnAddOption.addEventListener('click', () => {
    const newOption = document.createElement('div');
    newOption.classList.add('mt-6');
    newOption.innerHTML = `
        <div class="grid grid-cols-2 gap-2 options-container" data-device="custom">
        <div class="col-span-full flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3.5C0 2.67157 0.671573 2 1.5 2H14.5C15.3284 2 16 2.67157 16 3.5V12.5C16 13.3284 15.3284 14 14.5 14H1.5C0.671572 14 0 13.3284 0 12.5V3.5ZM1.5 3C1.22386 3 1 3.22386 1 3.5V12.5C1 12.7761 1.22386 13 1.5 13H14.5C14.7761 13 15 12.7761 15 12.5V3.5C15 3.22386 14.7761 3 14.5 3H1.5Z" fill="currentColor"/>
                    <path d="M2 4.5C2 4.22386 2.22386 4 2.5 4H5.5C5.77614 4 6 4.22386 6 4.5C6 4.77614 5.77614 5 5.5 5H3V7.5C3 7.77614 2.77614 8 2.5 8C2.22386 8 2 7.77614 2 7.5V4.5Z" fill="currentColor"/>
                    <path d="M14 11.5C14 11.7761 13.7761 12 13.5 12H10.5C10.2239 12 10 11.7761 10 11.5C10 11.2239 10.2239 11 10.5 11H13V8.5C13 8.22386 13.2239 8 13.5 8C13.7761 8 14 8.22386 14 8.5V11.5Z" fill="currentColor"/>
                </svg>

                <h3 class="text-3xl">Custom</h3>
            </div>
            <div class="btnRemoveOption text-red-600 cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5C5.77614 5.5 6 5.72386 6 6V12C6 12.2761 5.77614 12.5 5.5 12.5C5.22386 12.5 5 12.2761 5 12V6C5 5.72386 5.22386 5.5 5.5 5.5Z" fill="currentColor"/>
                    <path d="M8 5.5C8.27614 5.5 8.5 5.72386 8.5 6V12C8.5 12.2761 8.27614 12.5 8 12.5C7.72386 12.5 7.5 12.2761 7.5 12V6C7.5 5.72386 7.72386 5.5 8 5.5Z" fill="currentColor"/>
                    <path d="M11 6C11 5.72386 10.7761 5.5 10.5 5.5C10.2239 5.5 10 5.72386 10 6V12C10 12.2761 10.2239 12.5 10.5 12.5C10.7761 12.5 11 12.2761 11 12V6Z" fill="currentColor"/>
                    <path d="M14.5 3C14.5 3.55228 14.0523 4 13.5 4H13V13C13 14.1046 12.1046 15 11 15H5C3.89543 15 3 14.1046 3 13V4H2.5C1.94772 4 1.5 3.55228 1.5 3V2C1.5 1.44772 1.94772 1 2.5 1H6C6 0.447715 6.44772 0 7 0H9C9.55229 0 10 0.447715 10 1H13.5C14.0523 1 14.5 1.44772 14.5 2V3ZM4.11803 4L4 4.05902V13C4 13.5523 4.44772 14 5 14H11C11.5523 14 12 13.5523 12 13V4.05902L11.882 4H4.11803ZM2.5 3H13.5V2H2.5V3Z" fill="currentColor"/>
                </svg>
            </div>
        </div>

        <div class="col-span-full sm:col-span-1 text-gray-300">
            <label for="format" class="block text-md ">Nom del fitxer</label>
            <input 
                    type="text" 
                    id="inpFileName" 
                    name="inpFileName" 
                    class="mt-1 p-2 block w-full border bg-gray-950 border-primary rounded-md shadow-sm focus:ring-primary focus:border-primary" 
                    placeholder="Nom del fitxer" value="custom_image"
            >
        </div>
        <div class="col-span-full sm:col-span-1 text-gray-300">
            <label for="format" class="block text-md">Max width or height (px)</label>
            <input 
                    type="number" 
                    id="inpMaxWidthOrHeight" 
                    name="inpWidth" 
                    class="mt-1 p-2 block w-full border bg-gray-950 border-primary rounded-md shadow-sm focus:ring-primary focus:border-primary" 
                    value="0"
            >
        </div>
        </div>
    `;
    optionsContainer.appendChild(newOption);
});

// Remove option button
optionsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnRemoveOption') || e.target.closest('.btnRemoveOption')) {
        const option = e.target.closest('.options-container');
        if (option) {
        option.remove();
        }
    }
});

// handleFiles function to process the file input and display the preview and names
function handleFiles(files) {
    if (!files.length) return;
    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();

    // Set preview
    reader.onload = (e) => {
        const iconUpload = document.getElementById('iconUpload');
        iconUpload.classList.add('hidden'); // Hide the upload icon
        preview.classList.add('w-full', 'h-full')
        preview.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-center object-contain" />`;

        // Set file names
        const options = document.querySelectorAll('.options-container input[name="inpFileName"]');
        options.forEach(option => {
        const device = option.closest('.options-container').dataset.device;
        option.value = file.name.split('.')[0] + `_${device}` || `image_${device || ''}`;
        });
    };
    reader.readAsDataURL(file);

    globalFile = file; // Save the file for later use
}