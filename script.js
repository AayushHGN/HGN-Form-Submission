
        // Function to check if the device is iOS
        function isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        }
        
        // Set up form functionality once the DOM is fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('hgn-form');
            const submitBtn = form.querySelector('.submit-btn');
            const formGrid = document.getElementById('formGrid');
            
            // Add staggered animations to form sections
            if (formGrid) {
                const formSections = formGrid.querySelectorAll('.form-section');
                formSections.forEach((section, index) => {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    section.style.transitionDelay = `${index * 0.15}s`;
                    
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 100);
                });
            }
            
            // Populate country dropdowns with all countries
            function populateCountryDropdowns() {
                const countries = [
                    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
                    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
                    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
                    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", 
                    "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
                    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", 
                    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", 
                    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
                    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", 
                    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", 
                    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
                    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
                    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
                    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
                    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
                    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
                    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", 
                    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", 
                    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", 
                    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", 
                    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", 
                    "Yemen", "Zambia", "Zimbabwe"
                ];
                
                // Find all country selects
                const nationalitySelect = document.getElementById('nationality');
                const residenceSelect = document.getElementById('residence');
                
                if (nationalitySelect) {
                    // Clear existing options (keeping only the default)
                    const defaultOption = nationalitySelect.querySelector('option[disabled]');
                    nationalitySelect.innerHTML = '';
                    if (defaultOption) {
                        nationalitySelect.appendChild(defaultOption);
                    }
                    
                    // Add all countries
                    countries.forEach(country => {
                        const option = document.createElement('option');
                        option.value = country.toLowerCase().replace(/\s+/g, '-');
                        option.textContent = country;
                        nationalitySelect.appendChild(option);
                    });
                }
                
                if (residenceSelect) {
                    // Clear existing options (keeping only the default)
                    const defaultOption = residenceSelect.querySelector('option[disabled]');
                    residenceSelect.innerHTML = '';
                    if (defaultOption) {
                        residenceSelect.appendChild(defaultOption);
                    }
                    
                    // Add all countries
                    countries.forEach(country => {
                        const option = document.createElement('option');
                        option.value = country.toLowerCase().replace(/\s+/g, '-');
                        option.textContent = country;
                        residenceSelect.appendChild(option);
                    });
                }
            }
            
            // Call the function to populate countries
            populateCountryDropdowns();
            
            // Handle the "Other Diseases" dropdown selection to show/hide the "Other Medical History" field
            const medicalHistorySelect = document.getElementById('medical-history');
            const otherMedicalHistoryField = document.getElementById('other-medical-history').closest('.input-field');
            
            if (medicalHistorySelect && otherMedicalHistoryField) {
                // Initially hide the Other Medical History field if Other Diseases is not selected
                otherMedicalHistoryField.style.display = medicalHistorySelect.value === 'other' ? 'block' : 'none';
                
                // Add event listener for dropdown change
                medicalHistorySelect.addEventListener('change', function() {
                    otherMedicalHistoryField.style.display = this.value === 'other' ? 'block' : 'none';
                });
            }
            
            // File input handling is now managed by mobile-fixes.js
            // We're not setting any capture attributes here to ensure proper mobile behavior
            
            // Update file name display when a file is selected
            document.querySelectorAll('.file-upload input[type="file"]').forEach(input => {
                input.addEventListener('change', function(e) {
                    const fileUploadDiv = input.parentNode;
                    const fileNameDisplay = fileUploadDiv.querySelector('.file-name');
                    
                    // Remove any existing previews
                    const existingPreview = fileUploadDiv.querySelector('.file-preview, .file-preview-pdf');
                    if (existingPreview) {
                        existingPreview.remove();
                    }
                    
                    if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        const fileName = file.name;
                        
                        if (fileNameDisplay) {
                            fileNameDisplay.textContent = fileName;
                        }
                        
                        // Add visual indicator for selected file
                        fileUploadDiv.classList.add('has-file');
                        
                        // Get file label for preview positioning
                        const fileLabel = fileUploadDiv.querySelector('.file-label');
                        
                        // Change background gradient for successful upload
                        fileLabel.style.background = 'linear-gradient(to right, #34a853, #4285f4)';
                        
                        // Change icon to checkmark for all file uploads
                        const icon = fileUploadDiv.querySelector('.file-label i');
                        if (icon) {
                            icon.className = '';
                            icon.classList.add('fas', 'fa-check');
                        }
                        
                        // Check file type and create appropriate preview
                        if (file.type.startsWith('image/')) {
                            // For image files, create an image preview
                            const reader = new FileReader();
                            
                            reader.onload = function(e) {
                                const preview = document.createElement('img');
                                preview.src = e.target.result;
                                preview.className = 'file-preview';
                                fileLabel.appendChild(preview);
                            };
                            
                            reader.readAsDataURL(file);
                        } else if (file.type === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
                            // For PDF files, show a PDF icon
                            const pdfPreview = document.createElement('div');
                            pdfPreview.className = 'file-preview-pdf';
                            
                            const pdfIcon = document.createElement('i');
                            pdfIcon.className = 'fas fa-file-pdf pdf-icon';
                            
                            pdfPreview.appendChild(pdfIcon);
                            fileLabel.appendChild(pdfPreview);
                        } else {
                            // For other files, just keep the checkmark icon (already set above)
                        }
                    } else {
                        if (fileNameDisplay) {
                            fileNameDisplay.textContent = 'No file chosen';
                        }
                        
                        // Remove indicator when no file
                        fileUploadDiv.classList.remove('has-file');
                        
                        // Reset to plus icon
                        const icon = fileUploadDiv.querySelector('.file-label i');
                        if (icon) {
                            icon.className = '';
                            icon.classList.add('fas', 'fa-plus');
                        }
                    }
                });
                
                // Basic event handling - advanced handling in mobile-fixes.js
                input.addEventListener('click', function(e) {
                    // Handle signature canvas opening
                    if (this.id === 'signature-upload') {
                        e.preventDefault();
                        e.stopPropagation();
                        openSignatureModal();
                        return false;
                    }
                    // Base handling, extended by mobile-fixes.js
                    e.stopPropagation();
                });
            });
            
            // Signature Canvas Functionality
            const signatureModal = document.getElementById('signatureModal');
            const closeModalBtn = document.querySelector('.close-modal');
            const canvas = document.getElementById('signatureCanvas');
            const ctx = canvas.getContext('2d');
            const clearBtn = document.getElementById('clearSignature');
            const undoBtn = document.getElementById('undoSignature');
            const saveBtn = document.getElementById('saveSignature');
            
            // Signature drawing state variables
            let isDrawing = false;
            let lastX = 0;
            let lastY = 0;
            let signaturePaths = [];
            let currentPath = [];
            
            // Setup canvas and context
            function setupCanvas() {
                // Get the canvas dimensions from its computed style
                const rect = canvas.getBoundingClientRect();
                
                // Set canvas dimensions to match its display size
                canvas.width = rect.width;
                canvas.height = rect.height;
                
                // Reset any transformations
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                
                // Set line style
                ctx.lineWidth = 2.5;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = '#000';
                
                clearCanvas();
            }
            
            // Open signature modal
            function openSignatureModal() {
                signatureModal.style.display = 'block';
                
                // Need a small delay to ensure the modal is visible before calculating dimensions
                setTimeout(function() {
                    setupCanvas(); // Setup canvas when modal opens
                }, 10);
            }
            
            // Close signature modal
            function closeSignatureModal() {
                signatureModal.style.display = 'none';
            }
            
            // Clear canvas
            function clearCanvas() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                currentPath = [];
            }
            
            // Start drawing
            function startDrawing(e) {
                e.preventDefault(); // Prevent default actions like scrolling on touch devices
                isDrawing = true;
                const pos = getPosition(e);
                lastX = pos.x;
                lastY = pos.y;
                currentPath = [{x: lastX, y: lastY}];
                
                // Start a new path
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                
                // Draw a small dot at the starting point (for single taps/clicks)
                ctx.arc(lastX, lastY, 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw
            function draw(e) {
                e.preventDefault(); // Prevent default actions
                if (!isDrawing) return;
                
                const pos = getPosition(e);
                
                // Only draw if there's actual movement
                if (pos.x === lastX && pos.y === lastY) return;
                
                // Draw the line
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                
                // Add point to current path for undo functionality
                currentPath.push({x: pos.x, y: pos.y});
                
                // Update last position
                lastX = pos.x;
                lastY = pos.y;
            }
            
            // Stop drawing
            function stopDrawing() {
                if (isDrawing) {
                    isDrawing = false;
                    
                    // Save the current path for undo functionality
                    if (currentPath.length > 1) {
                        signaturePaths.push([...currentPath]);
                        currentPath = [];
                    }
                }
            }
            
            // Undo last stroke
            function undoLastStroke() {
                if (signaturePaths.length === 0) return;
                
                signaturePaths.pop(); // Remove the last path
                redrawPaths(); // Redraw all remaining paths
            }
            
            // Redraw all paths
            function redrawPaths() {
                clearCanvas();
                
                for (let path of signaturePaths) {
                    if (path.length < 2) continue;
                    
                    // Draw a small dot for the first point
                    ctx.beginPath();
                    ctx.arc(path[0].x, path[0].y, 0.5, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw the path
                    ctx.beginPath();
                    ctx.moveTo(path[0].x, path[0].y);
                    
                    for (let i = 1; i < path.length; i++) {
                        ctx.lineTo(path[i].x, path[i].y);
                    }
                    
                    ctx.stroke();
                }
            }
            
            // Get pointer position
            function getPosition(event) {
                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                
                // For touch events
                if (event.touches && event.touches[0]) {
                    return {
                        x: (event.touches[0].clientX - rect.left) * scaleX,
                        y: (event.touches[0].clientY - rect.top) * scaleY
                    };
                }
                
                // For mouse events
                return {
                    x: (event.clientX - rect.left) * scaleX,
                    y: (event.clientY - rect.top) * scaleY
                };
            }
            
            // Save signature
            function saveSignature() {
                if (signaturePaths.length === 0) {
                    alert('Please draw your signature before saving');
                    return;
                }
                
                // Convert canvas to image data URL
                const dataURL = canvas.toDataURL('image/png');
                
                // Create a file object from the data URL
                const blobBin = atob(dataURL.split(',')[1]);
                const array = [];
                for (let i = 0; i < blobBin.length; i++) {
                    array.push(blobBin.charCodeAt(i));
                }
                const file = new Blob([new Uint8Array(array)], {type: 'image/png'});
                
                // Create a File object for the input
                const signatureFile = new File([file], 'signature.png', {type: 'image/png'});
                
                // Create a FileList object
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(signatureFile);
                
                // Set the file to the input
                const signatureInput = document.getElementById('signature-upload');
                signatureInput.files = dataTransfer.files;
                
                // Trigger the change event
                const changeEvent = new Event('change', { bubbles: true });
                signatureInput.dispatchEvent(changeEvent);
                
                // Close the modal
                closeSignatureModal();
            }
            
            // Event Listeners for signature canvas
            canvas.addEventListener('mousedown', function(e) {
                e.preventDefault();
                startDrawing(e);
            });
            canvas.addEventListener('mousemove', function(e) {
                e.preventDefault();
                draw(e);
            });
            canvas.addEventListener('mouseup', function(e) {
                e.preventDefault();
                stopDrawing();
            });
            canvas.addEventListener('mouseout', function(e) {
                e.preventDefault();
                stopDrawing();
            });
            
            // Touch Events for mobile
            canvas.addEventListener('touchstart', function(e) {
                e.preventDefault();
                startDrawing(e);
            }, { passive: false });
            canvas.addEventListener('touchmove', function(e) {
                e.preventDefault();
                draw(e);
            }, { passive: false });
            canvas.addEventListener('touchend', function(e) {
                e.preventDefault();
                stopDrawing();
            });
            
            // Button event listeners
            clearBtn.addEventListener('click', function() {
                clearCanvas();
                signaturePaths = [];
            });
            undoBtn.addEventListener('click', undoLastStroke);
            saveBtn.addEventListener('click', saveSignature);
            closeModalBtn.addEventListener('click', closeSignatureModal);
            
            // Close modal when clicking outside of it
            window.addEventListener('click', function(e) {
                if (e.target === signatureModal) {
                    closeSignatureModal();
                }
            });
            
            // Handle window resize to adjust canvas
            window.addEventListener('resize', function() {
                if (signatureModal.style.display === 'block') {
                    // Store the paths
                    const tempPaths = [...signaturePaths];
                    
                    // Reset the canvas
                    setupCanvas();
                    
                    // Restore the paths
                    signaturePaths = tempPaths;
                    redrawPaths();
                }
            });
            
            // Add form submission handling with validation
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Reset previous validation states
                    resetValidationStates();
                    
                    // Validate the form
                    const isValid = validateForm();
                    
                    if (isValid) {
                        // Show loading state on button
                        submitBtn.classList.add('loading');
                        submitBtn.textContent = 'Processing...';
                        
                        // Simulate form submission (replace with actual API call)
                        setTimeout(() => {
                            // Show success message with completion animation
                            const formContainer = document.getElementById('form-container');
                            
                            // Create success overlay
                            const successOverlay = document.createElement('div');
                            successOverlay.className = 'success-overlay';
                            
                            const checkmarkContainer = document.createElement('div');
                            checkmarkContainer.className = 'checkmark-container';
                            
                            const checkmark = document.createElement('div');
                            checkmark.className = 'checkmark';
                            checkmark.innerHTML = '<i class="fas fa-check"></i>';
                            
                            const successMessage = document.createElement('div');
                            successMessage.className = 'success-message';
                            successMessage.innerHTML = '<h3>Application Submitted!</h3><p>Thank you for submitting your information. We will review your application shortly.</p>';
                            
                            checkmarkContainer.appendChild(checkmark);
                            successOverlay.appendChild(checkmarkContainer);
                            successOverlay.appendChild(successMessage);
                            
                            formContainer.appendChild(successOverlay);
                            
                            // Reset button state
                            submitBtn.classList.remove('loading');
                            submitBtn.textContent = 'Submit Application';
                            
                            // Add delay before allowing form reset
                            setTimeout(() => {
                                // Add event listener to reset form when clicking anywhere on the overlay
                                successOverlay.addEventListener('click', function() {
                                    // Remove overlay
                                    successOverlay.remove();
                                    
                                    // Reset the form
                                    form.reset();
                                    
                                    // Reset file upload displays
                                    document.querySelectorAll('.file-upload').forEach(upload => {
                                        upload.classList.remove('has-file');
                                        const fileNameDisplay = upload.querySelector('.file-name');
                                        if (fileNameDisplay) {
                                            fileNameDisplay.textContent = 'No file chosen';
                                        }
                                        
                                        // Remove any file previews
                                        const preview = upload.querySelector('.file-preview, .file-preview-pdf');
                                        if (preview) {
                                            preview.remove();
                                        }
                                        
                                        // Reset background gradient
                                        const fileLabel = upload.querySelector('.file-label');
                                        if (fileLabel) {
                                            fileLabel.style.background = 'linear-gradient(to right, #0844ff, #4d86f9)';
                                        }
                                        
                                        // Reset to plus icon
                                        const icon = upload.querySelector('.file-label i');
                                        if (icon) {
                                            icon.className = '';
                                            icon.classList.add('fas', 'fa-plus');
                                        }
                                    });
                                });
                                
                                // Add tap/click instructions
                                const tapInstruction = document.createElement('p');
                                tapInstruction.className = 'tap-instruction';
                                tapInstruction.textContent = 'Tap anywhere to continue';
                                successOverlay.appendChild(tapInstruction);
                                
                            }, 2000);
                        }, 1500);
                    } else {
                        showFormMessage('Please fill in all required fields correctly.', 'error');
                    }
                });
            }
            
            // Function to validate the form
            function validateForm() {
                let isValid = true;
                const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
                
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        markAsInvalid(input);
                        isValid = false;
                    }
                    
                    // Special validation for email
                    if (input.type === 'email' && input.value.trim()) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            markAsInvalid(input);
                            isValid = false;
                        }
                    }
                    
                    // Special validation for phone
                    if (input.type === 'tel' && input.value.trim()) {
                        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
                        if (!phoneRegex.test(input.value)) {
                            markAsInvalid(input);
                            isValid = false;
                        }
                    }
                });
                
                // Check required file uploads
                document.querySelectorAll('.upload-field input[type="file"][required]').forEach(input => {
                    if (!input.files || input.files.length === 0) {
                        markAsInvalid(input);
                        isValid = false;
                    }
                });
                
                return isValid;
            }
            
            // Mark an input as invalid
            function markAsInvalid(input) {
                const inputField = input.closest('.input-field') || input.closest('.upload-field');
                if (inputField) {
                    inputField.classList.add('error');
                    
                    // Add shake animation
                    inputField.classList.add('shake');
                    setTimeout(() => {
                        inputField.classList.remove('shake');
                    }, 500);
                    
                    // Add error message
                    let errorMessage = '';
                    if (!input.value.trim()) {
                        errorMessage = 'This field is required';
                    } else if (input.type === 'email') {
                        errorMessage = 'Please enter a valid email address';
                    } else if (input.type === 'tel') {
                        errorMessage = 'Please enter a valid phone number';
                    } else if (input.type === 'file') {
                        errorMessage = 'Please upload the required document';
                    }
                    
                    // Create or update error message element
                    let errorElement = inputField.querySelector('.validation-error');
                    if (!errorElement) {
                        errorElement = document.createElement('div');
                        errorElement.className = 'validation-error';
                        inputField.appendChild(errorElement);
                    }
                    
                    errorElement.textContent = errorMessage;
                    errorElement.style.display = 'block';
                }
            }
            
            // Reset all validation states
            function resetValidationStates() {
                document.querySelectorAll('.input-field, .upload-field').forEach(field => {
                    field.classList.remove('error');
                    
                    // Remove any validation error messages
                    const errorElement = field.querySelector('.validation-error');
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                });
                
                // Hide any form messages
                const formMessage = document.querySelector('.form-message');
                if (formMessage) {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('success', 'error');
                }
            }
            
            // Show form submission message
            function showFormMessage(message, type) {
                // Create form message element if it doesn't exist
                let formMessage = document.querySelector('.form-message');
                if (!formMessage) {
                    formMessage = document.createElement('div');
                    formMessage.className = 'form-message';
                    const formFooter = document.querySelector('.form-footer');
                    form.insertBefore(formMessage, formFooter);
                }
                
                formMessage.textContent = message;
                formMessage.className = 'form-message ' + type;
                formMessage.style.display = 'block';
                
                // Scroll to the message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });