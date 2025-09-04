# Project Overview

This is a web-based tourist registration form for HGN Agency, designed for tourists to fill in personal, medical, and document details after scanning an agency-specific QR code. The form is built with HTML, CSS, and JavaScript, and upon submission, the data should be sent to the CTG platform's API to store in the agency's dashboard under the Tourist Management section.

## Key Features
- **Form Sections**: 
  - Personal Information: name, gender, DOB, email, phone, nationality, residence, mother tongue, passport/ID, blood group, English service.
  - Medical Information: emergency contact, height, weight, medical history, allergies, constrained medicines.
  - Document Upload: passport/ID photo, visa validity, tourist avatar, signature.
- **Validation**: Client-side validation for required fields, email format, etc.
- **Signature**: Canvas-based signature drawing with undo, clear, and save functionality.
- **File Uploads**: Images/PDFs for documents, with previews.
- **Submission**: Currently simulated; needs real API integration.
- **Dynamic Data**: Options for gender, mother tongue, blood group, English service, medical history, and countries should be fetched from APIs to use correct codes (enCode or F_Id).
- **Agency Association**: Agency ID (organizeId) will come from QR code URL param later; for now, hardcode a placeholder like "1961351104793022464" from the example.
- **API Integration Requirements**:
  - Fetch data dictionaries for select options (gender, etc.) using the Data Dictionary API.
  - Fetch countries for nationality and residence using the Country API.
  - Upload files individually to the Upload Image API, get file info, stringify as array of objects, and include in main payload.
  - Submit all data to the New Tourist Information API as JSON with specific field names (e.g., F_Name, F_Gender).
- **Tech Stack**: HTML5, CSS3, Vanilla JavaScript (with fetch for API calls), no external libraries except Font Awesome.
- **Mobile Compatibility**: Includes fixes for iOS/Android file uploads and canvas drawing.
- **Current Status**: Form UI and basic JS are complete; submission is simulated with a success overlay. Need to replace with real API calls.

## Files in Project
- `index.html`: Main form HTML.
- `script.js`: Form logic, validation, signature canvas, submission handler.
- `style.css`: Styling for form.
- `mobile-fixes.js`: Mobile-specific file upload fixes.
- `logo.png`: HGN logo (assumed present).

## Implementation Notes
- Map form values to API codes (e.g., gender "male" -> "1").
- Handle file uploads as multipart/form-data to get file info.
- Stringify file info arrays for fields like F_PpassportPhoto.
- For medical history, if multiple, use JSON array of codes; form is single select.
- Error handling: Show messages for API failures.
- Testing: Use placeholder organizeId; later integrate QR param.