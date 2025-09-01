/**
 * Mobile File Upload Fix
 * This file addresses the issue with file uploads on mobile devices
 * where clicking the camera icon opens the camera directly instead of 
 * showing the gallery/camera options.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Apply to all devices for consistency
    setupMobileFileInputs();
    
    // Log device information for debugging
    console.log('Device info:', navigator.userAgent);
    console.log('Is Mobile:', isMobileDevice());
    console.log('Is iOS:', isIOSDevice());
    console.log('Is Android:', isAndroidDevice());
});

/**
 * Device detection utilities
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isIOSDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isAndroidDevice() {
    return /Android/i.test(navigator.userAgent);
}

/**
 * Set up all file inputs for proper mobile behavior
 */
function setupMobileFileInputs() {
    console.log('Setting up file inputs for all devices');
    
    // Get all file inputs within file-upload containers
    const fileInputs = document.querySelectorAll('.file-upload input[type="file"]');
    
    fileInputs.forEach(function(input) {
        console.log(`Setting up file input: ${input.id}`);
        
        // CRITICAL: Remove any capture attributes
        if (input.hasAttribute('capture')) {
            input.removeAttribute('capture');
            console.log(`Removed capture attribute from ${input.id}`);
        }
        
        // Find the label with the camera icon
        const fileLabel = input.parentNode.querySelector('.file-label');
        if (fileLabel) {
            // Create a completely transparent overlay that covers the entire label
            // This ensures that tapping anywhere on the icon triggers the file input
            const overlay = document.createElement('div');
            overlay.className = 'file-label-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.zIndex = '20';
            overlay.style.cursor = 'pointer';
            
            // Insert the overlay as the first child of the label
            if (fileLabel.firstChild) {
                fileLabel.insertBefore(overlay, fileLabel.firstChild);
            } else {
                fileLabel.appendChild(overlay);
            }
            
            // Add click handler to overlay
            overlay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`Overlay clicked for ${input.id}`);
                
                // Use a small delay to ensure proper behavior
                setTimeout(function() {
                    input.click();
                    console.log(`Input clicked: ${input.id}`);
                }, 50);
            });
        }
    });
    
    // Apply platform-specific fixes
    if (isIOSDevice()) {
        applyIOSFixes();
    } else if (isAndroidDevice()) {
        applyAndroidFixes();
    }
}

/**
 * Apply iOS-specific fixes
 */
function applyIOSFixes() {
    console.log('Applying iOS-specific fixes');
    
    // For iOS, make sure labels have proper dimensions and are clickable
    const fileLabels = document.querySelectorAll('.file-label');
    fileLabels.forEach(function(label) {
        label.style.zIndex = '10';
        label.style.position = 'relative'; // Ensure positioned for z-index
        
        // Make sure the tap area is large enough
        if (parseFloat(getComputedStyle(label).width) < 44) {
            label.style.minWidth = '44px';
        }
        if (parseFloat(getComputedStyle(label).height) < 44) {
            label.style.minHeight = '44px';
        }
    });
    
    // Add a special class to the body for iOS-specific CSS
    document.body.classList.add('ios-device');
}

/**
 * Apply Android-specific fixes
 */
function applyAndroidFixes() {
    console.log('Applying Android-specific fixes');
    
    // For Android, add touch event handlers
    document.querySelectorAll('.file-label').forEach(function(label) {
        label.addEventListener('touchstart', function(e) {
            // This helps with the touch response
            this.style.transform = 'scale(0.96)';
        });
        
        label.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add a special class to the body for Android-specific CSS
    document.body.classList.add('android-device');
}
