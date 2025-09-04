/**
 * API Service for HGN Tourist Registration Form
 * Handles all CTG platform API interactions
 */
class CTGAPIService {
    constructor() {
        this.baseURL = 'https://ctg.hgn.com.np/api';
        this.isDevelopment = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
        this.headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'YmDate': '22242342',
            'Authorization': 'web::21721c80d45544d9a8904b6f639714e3',
            'Userkey': '0g7oywz58fbjjmc0'
        };
        
        // Dictionary IDs from API documentation
        this.dictionaryIds = {
            gender: '963255a34ea64a2584c5d1ba269c1fe6',
            motherTongue: '1929470605271371776',
            bloodType: '1930919506201415680',
            yesNo: '1929427715954446336',
            medicalHistory: '1930150000369733632'
        };
        
        // Cache for dictionary data to avoid repeated API calls
        this.cache = {
            dictionaries: {},
            countries: null
        };
    }

    /**
     * 1. Data Dictionary API - Fetch dropdown options
     * @param {string} dictionaryType - Type of dictionary (gender, motherTongue, etc.)
     * @returns {Promise<Array>} Array of dictionary items with fullName and enCode
     */
    async fetchDictionaryData(dictionaryType) {
        // Check cache first
        if (this.cache.dictionaries[dictionaryType]) {
            return this.cache.dictionaries[dictionaryType];
        }

        const dicId = this.dictionaryIds[dictionaryType];
        if (!dicId) {
            throw new Error(`Unknown dictionary type: ${dictionaryType}`);
        }

        console.log(`Fetching ${dictionaryType} dictionary with dicId: ${dicId}`);
        try {
            const response = await fetch(`${this.baseURL}/system/DataInterface/1962707984421359616/Actions/Response`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ dicId })
            });

            console.log(`${dictionaryType} API response status:`, response.status, response.statusText);

            // Check if response is ok and has content
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Check if response has content before parsing JSON
            const text = await response.text();
            console.log(`${dictionaryType} API response text length:`, text.length);
            
            if (!text) {
                throw new Error('Empty response from server');
            }

            const result = JSON.parse(text);
            console.log(`${dictionaryType} API parsed result:`, result);
            
            if (result.code === 200) {
                // Dictionary API returns data in result.data.data structure
                const dictionaryData = result.data?.data || result.data;
                console.log(`${dictionaryType} data received:`, dictionaryData?.length || 0, 'items');
                
                // Check if we have valid data with fullName values
                if (Array.isArray(dictionaryData) && dictionaryData.length > 0) {
                    console.log(`${dictionaryType} first few items:`, dictionaryData.slice(0, 3));
                    
                    // Special case for motherTongue - use the API data regardless of fullName values
                    // since we've confirmed the data is coming back correctly from Postman
                    if (dictionaryType === 'motherTongue') {
                        // For mother tongue, we'll transform the data to ensure it has the expected structure
                        const processedData = dictionaryData.map(item => {
                            // Use either fullName or name or id as the display value
                            // This ensures we always have something to display
                            return {
                                id: item.id || item.ID || '',
                                fullName: item.fullName || item.name || item.id || item.ID || `Language ${item.enCode || ''}`,
                                enCode: item.enCode || item.id || '',
                                enabledMark: item.enabledMark || 0,
                                sortCode: item.sortCode || 0
                            };
                        });
                        
                        this.cache.dictionaries[dictionaryType] = processedData;
                        console.log(`Using processed API data for ${dictionaryType} with ${processedData.length} items`);
                        return processedData;
                    }
                    
                    // For other dictionary types, check for valid fullName values
                    const hasValidData = dictionaryData.some(item => item.fullName && item.fullName.trim() !== '');
                    
                    console.log(`${dictionaryType} hasValidData check:`, hasValidData);
                    console.log(`${dictionaryType} sample fullName values:`, dictionaryData.slice(0, 3).map(item => item.fullName));
                    
                    if (hasValidData) {
                        // Cache the valid result
                        this.cache.dictionaries[dictionaryType] = dictionaryData;
                        console.log(`Using API data for ${dictionaryType}`);
                        return dictionaryData;
                    } else {
                        console.log(`${dictionaryType} API data has null/empty fullName values, using fallback data`);
                        const fallbackData = this.getFallbackDictionaryData(dictionaryType);
                        this.cache.dictionaries[dictionaryType] = fallbackData;
                        return fallbackData;
                    }
                } else {
                    console.log(`${dictionaryType} API returned empty or invalid data, using fallback`);
                    const fallbackData = this.getFallbackDictionaryData(dictionaryType);
                    this.cache.dictionaries[dictionaryType] = fallbackData;
                    return fallbackData;
                }
            } else {
                throw new Error(`Failed to fetch ${dictionaryType}: ${result.msg || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(`Error fetching ${dictionaryType} dictionary:`, error);
            throw error;
        }
    }

    /**
     * 2. Country API - Fetch all countries
     * @returns {Promise<Array>} Array of countries with F_Id and F_Name
     */
    async fetchCountries() {
        // Check cache first
        if (this.cache.countries) {
            console.log('Using cached countries data');
            return this.cache.countries;
        }

        console.log('Fetching countries from API...');
        try {
            const response = await fetch(`${this.baseURL}/system/DataInterface/1962716955202949120/Actions/Response`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({})
            });

            console.log('Countries API response status:', response.status, response.statusText);

            // Check if response is ok and has content
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Check if response has content before parsing JSON
            const text = await response.text();
            console.log('Countries API response text length:', text.length);
            console.log('Countries API response preview:', text.substring(0, 200));
            
            if (!text) {
                throw new Error('Empty response from server');
            }

            const result = JSON.parse(text);
            console.log('Countries API parsed result:', result);
            
            if (result.code === 200) {
                // Cache the result - Country API returns data directly in result.data
                console.log('Countries data received:', result.data.length, 'items');
                this.cache.countries = result.data;
                return result.data;
            } else {
                throw new Error(`Failed to fetch countries: ${result.msg || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            throw error;
        }
    }

    /**
     * 3. File Upload API - Upload individual files
     * @param {File} file - The file to upload
     * @returns {Promise<Object>} File metadata object
     */
    async uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${this.baseURL}/file/Uploader/furniture`, {
                method: 'POST',
                body: formData // Don't set Content-Type header for FormData
            });

            const result = await response.json();
            
            if (response.ok) {
                return result;
            } else {
                throw new Error(`File upload failed: ${result.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    /**
     * 4. Tourist Submission API - Submit complete form data
     * @param {Object} formData - The mapped form data object
     * @returns {Promise<Object>} Submission result
     */
    async submitTouristData(formData) {
        try {
            console.log('Submitting tourist data to API...');
            console.log('Form data being sent:', formData);
            
            // Debug the formatted JSON to make sure it's valid
            try {
                const jsonString = JSON.stringify(formData);
                console.log('JSON data to send:', jsonString);
                
                // Validate the JSON structure
                JSON.parse(jsonString);
                console.log('JSON is valid');
            } catch (jsonError) {
                console.error('Invalid JSON data:', jsonError);
                throw new Error('Invalid JSON data for submission');
            }
            
            const endpointUrl = `${this.baseURL}/system/DataInterface/196273737912610816/Actions/Response`;
            console.log('Using tourist submission endpoint URL:', endpointUrl);
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(formData)
            });

            console.log('Tourist submission API response status:', response.status, response.statusText);

            // Check if response is ok and has content
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Check if response has content before parsing JSON
            const text = await response.text();
            console.log('Tourist submission API response text:', text);
            
            if (!text) {
                throw new Error('Empty response from server');
            }

            const result = JSON.parse(text);
            console.log('Tourist submission API parsed result:', result);
            
            // Extract the correct response code and message based on the API structure
            const responseCode = result.data?.code || result.code;
            const responseMessage = result.data?.info || result.msg || 'No message provided';
            
            console.log('Extracted response code:', responseCode);
            console.log('Extracted response message:', responseMessage);
            
            return {
                success: result.code === 200,
                code: responseCode,
                message: responseMessage,
                data: result.data?.rows || result.data,
                rawResponse: result
            };
        } catch (error) {
            console.error('Error submitting tourist data:', error);
            
            // Return a structured error response instead of throwing
            return {
                success: false,
                code: 500,
                message: `Submission failed: ${error.message}`,
                error: error
            };
        }
    }

    /**
     * Helper method to populate a select element with dictionary data
     * @param {string} selectId - The ID of the select element
     * @param {Array} data - The dictionary data array
     * @param {string} valueField - The field to use as option value (usually 'enCode')
     * @param {string} textField - The field to use as option text (usually 'fullName')
     */
    populateSelect(selectId, data, valueField = 'enCode', textField = 'fullName') {
        console.log(`Attempting to populate ${selectId} with data:`, data);
        
        const selectElement = document.getElementById(selectId);
        console.log(`Found element for ${selectId}:`, selectElement);
        
        if (!selectElement) {
            console.error(`Element with ID '${selectId}' not found!`);
            return;
        }
        
        if (!data) {
            console.error(`No data provided for ${selectId}`);
            return;
        }

        console.log(`Populating ${selectId} with ${data.length} items using ${valueField}/${textField}`);

        // Store the original placeholder option
        const existingPlaceholder = selectElement.querySelector('option[value=""]');
        const placeholderText = existingPlaceholder ? existingPlaceholder.textContent : 'Please select...';

        // Clear all options
        selectElement.innerHTML = '';
        
        // Add placeholder option first
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.disabled = true;
        placeholder.selected = true;
        placeholder.textContent = placeholderText;
        selectElement.appendChild(placeholder);

        // Add new options
        let validOptionsCount = 0;
        
        data.forEach((item, index) => {
            // Skip items without the required fields
            if (item[valueField] === undefined || item[textField] === undefined) {
                console.log(`Skipping item at index ${index} due to missing ${valueField} or ${textField}:`, item);
                return;
            }
            
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[textField];
            selectElement.appendChild(option);
            validOptionsCount++;
            
            // Log for debugging - more details for mother-tone
            if (selectId === 'mother-tone' && (index < 3 || index === data.length - 1)) {
                console.log(`Mother tongue option ${index}:`, option.value, '=', option.textContent);
                console.log(`Mother tongue raw item ${index}:`, item);
            } else if (index < 3) { // Log first 3 items for debugging
                console.log(`Added option ${index}:`, option.value, '=', option.textContent);
                console.log(`Raw item ${index}:`, item);
            }
        });
        
        console.log(`Successfully populated ${selectId} with ${validOptionsCount} valid options out of ${data.length} data items`);
        
        console.log(`Successfully populated ${selectId} with ${data.length} options`);
    }

    /**
     * Helper method to handle API response codes for tourist submission
     * @param {number} code - The response code
     * @returns {Object} Response interpretation
     */
    interpretResponseCode(code) {
        console.log('Interpreting response code:', code);
        
        switch (code) {
            case 200:
                return { success: true, message: 'Registration successful!' };
            case 201:
                return { success: false, message: 'Registration failed. Please try again.' };
            case 202:
                return { success: false, message: 'This passport number is already registered.' };
            case 400:
                return { success: false, message: 'Invalid data provided. Please check your information.' };
            case 401:
                return { success: false, message: 'Authentication failed. Please refresh and try again.' };
            case 403:
                return { success: false, message: 'Access denied. Please contact support.' };
            case 404:
                return { success: false, message: 'Service not found. Please contact support.' };
            case 500:
                return { success: false, message: 'Server error. Please try again later.' };
            default:
                return { success: false, message: `An unexpected error occurred. Response code: ${code}` };
        }
    }

    /**
     * Initialize all form data - call this when the page loads
     * @returns {Promise<Object>} Object containing all loaded data
     */
    async initializeFormData() {
        try {
            console.log('Loading form data...');
            
            // If APIs fail, try with fallback data
            let genderData, motherTongueData, bloodTypeData, yesNoData, medicalHistoryData, countriesData;
            
            try {
                // Load all data in parallel for better performance
                [
                    genderData,
                    motherTongueData,
                    bloodTypeData,
                    yesNoData,
                    medicalHistoryData,
                    countriesData
                ] = await Promise.all([
                    this.fetchDictionaryData('gender'),
                    this.fetchDictionaryData('motherTongue'),
                    this.fetchDictionaryData('bloodType'),
                    this.fetchDictionaryData('yesNo'),
                    this.fetchDictionaryData('medicalHistory'),
                    this.fetchCountries()
                ]);
            } catch (apiError) {
                console.warn('API calls failed, using fallback data:', apiError.message);
                genderData = this.getFallbackDictionaryData('gender');
                motherTongueData = this.getFallbackDictionaryData('motherTongue');
                bloodTypeData = this.getFallbackDictionaryData('bloodType');
                yesNoData = this.getFallbackDictionaryData('yesNo');
                medicalHistoryData = this.getFallbackDictionaryData('medicalHistory');
                countriesData = this.getFallbackCountryData();
            }

            // Sort mother tongue data alphabetically by fullName for better usability
            if (motherTongueData && motherTongueData.length > 0) {
                motherTongueData.sort((a, b) => {
                    const nameA = (a.fullName || '').toString().toUpperCase();
                    const nameB = (b.fullName || '').toString().toUpperCase();
                    return nameA.localeCompare(nameB);
                });
            }
            
            // Log the number of options in each dictionary
            console.log('Dictionary option counts:', {
                gender: genderData.length,
                motherTongue: motherTongueData.length,
                bloodType: bloodTypeData.length,
                yesNo: yesNoData.length,
                medicalHistory: medicalHistoryData.length,
                countries: countriesData.length
            });
            
            // Populate form selects
            this.populateSelect('gender', genderData);
            this.populateSelect('mother-tone', motherTongueData);
            this.populateSelect('blood-group', bloodTypeData);
            this.populateSelect('english-service', yesNoData);
            this.populateSelect('medical-history', medicalHistoryData);
            this.populateSelect('nationality', countriesData, 'F_Id', 'F_Name');
            this.populateSelect('residence', countriesData, 'F_Id', 'F_Name');

            console.log('Form data loaded successfully');
            
            return {
                gender: genderData,
                motherTongue: motherTongueData,
                bloodType: bloodTypeData,
                yesNo: yesNoData,
                medicalHistory: medicalHistoryData,
                countries: countriesData
            };
        } catch (error) {
            console.error('Error initializing form data:', error);
            throw error;
        }
    }

    /**
     * Map form data to API field format
     * @param {FormData} formData - The form data
     * @param {Object} uploadedFiles - Object containing uploaded file JSON strings
     * @returns {Object} Mapped data object for API submission
     */
    mapFormDataToAPI(formData, uploadedFiles) {
        console.log('Mapping form data to API format...');
        console.log('Raw form data entries:', [...formData.entries()]);
        console.log('Uploaded files:', uploadedFiles);
        
        // Helper function to format date to YYYY-MM-DD
        const formatDate = (dateString) => {
            if (!dateString) return '';
            try {
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            } catch (e) {
                console.error('Error formatting date:', e);
                return '';
            }
        };

        // Helper function to handle medical history array
        const formatMedicalHistory = (value) => {
            if (!value) return '[]';
            try {
                // If it's already an array, stringify it; otherwise wrap single value in array
                const valueArray = Array.isArray(value) ? value : [value];
                return JSON.stringify(valueArray);
            } catch (e) {
                console.error('Error formatting medical history:', e);
                return '[]';
            }
        };

        // Create the API data object
        const apiData = {
            F_Name: formData.get('tourist-name') || '',
            F_Gender: formData.get('gender') || '',
            F_BirthDate: formatDate(formData.get('dob')),
            F_Nationality: formData.get('nationality') || '',
            F_PassportNum: formData.get('passport') || '',
            F_NativeLanguage: formData.get('mother-tone') || '',
            F_Email: formData.get('email') || '',
            F_Phone: formData.get('phone') || '',
            F_IsEnglish: formData.get('english-service') || '',
            F_MedicalHistory: formatMedicalHistory(formData.get('medical-history')),
            F_EmergencyContact: formData.get('emergency-contact-name') || '',
            F_EmergencyPhone: formData.get('emergency-tel') || '',
            F_EmergencyEmail: formData.get('emergency-email') || '',
            F_Blood: formData.get('blood-group') || '',
            F_Height: parseFloat(formData.get('height')) || 0,
            F_Weight: parseFloat(formData.get('weight')) || 0,
            F_MedicalHistoryOther: formData.get('other-medical-history') || '',
            F_Permanent: formData.get('residence') || '',
            F_Allergens: formData.get('allergy') || '',
            F_ContraindicatedDrugs: formData.get('constrained-medicines') || '',
            
            // File fields - these should be JSON strings from uploaded files
            F_PpassportPhoto: uploadedFiles.passportPhoto || '[]',
            F_VisaPhoto: uploadedFiles.visaPhoto || '[]',
            F_Image: uploadedFiles.profilePhoto || '[]',
            F_QianZhiImg: uploadedFiles.signature || '[]',
            
            // Agency ID - this will come from QR code later, hardcoded for now
            organizeId: "1961351104793022464"
        };
        
        console.log('Mapped API data:', apiData);
        
        // Validate required fields
        const requiredFields = ['F_Name', 'F_Gender', 'F_BirthDate', 'F_Nationality', 'F_PassportNum'];
        const missingFields = requiredFields.filter(field => !apiData[field]);
        
        if (missingFields.length > 0) {
            console.warn('Missing required fields:', missingFields);
        }
        
        return apiData;
    }

    /**
     * Fallback data methods for when APIs are not available
     */
    getFallbackDictionaryData(dicType) {
        const fallbackData = {
            gender: [
                { id: "1", fullName: "Male", enCode: "1", enabledMark: 0, sortCode: 1 },
                { id: "2", fullName: "Female", enCode: "2", enabledMark: 0, sortCode: 2 }
            ],
            bloodType: [
                { id: "1", fullName: "A+", enCode: "1", enabledMark: 0, sortCode: 1 },
                { id: "2", fullName: "A-", enCode: "2", enabledMark: 0, sortCode: 2 },
                { id: "3", fullName: "B+", enCode: "3", enabledMark: 0, sortCode: 3 },
                { id: "4", fullName: "B-", enCode: "4", enabledMark: 0, sortCode: 4 },
                { id: "5", fullName: "AB+", enCode: "5", enabledMark: 0, sortCode: 5 },
                { id: "6", fullName: "AB-", enCode: "6", enabledMark: 0, sortCode: 6 },
                { id: "7", fullName: "O+", enCode: "7", enabledMark: 0, sortCode: 7 },
                { id: "8", fullName: "O-", enCode: "8", enabledMark: 0, sortCode: 8 }
            ],
            yesNo: [
                { id: "1", fullName: "Yes", enCode: "1", enabledMark: 0, sortCode: 1 },
                { id: "2", fullName: "No", enCode: "0", enabledMark: 0, sortCode: 2 }
            ],
            motherTongue: [
                { id: "1", fullName: "English", enCode: "1", enabledMark: 0, sortCode: 1 },
                { id: "2", fullName: "Nepali", enCode: "2", enabledMark: 0, sortCode: 2 },
                { id: "3", fullName: "Hindi", enCode: "3", enabledMark: 0, sortCode: 3 },
                { id: "4", fullName: "Chinese", enCode: "4", enabledMark: 0, sortCode: 4 },
                { id: "5", fullName: "Spanish", enCode: "5", enabledMark: 0, sortCode: 5 }
            ],
            medicalHistory: [
                { id: "1", fullName: "None", enCode: "1", enabledMark: 0, sortCode: 1 },
                { id: "2", fullName: "Hypertension", enCode: "2", enabledMark: 0, sortCode: 2 },
                { id: "3", fullName: "Diabetes", enCode: "3", enabledMark: 0, sortCode: 3 },
                { id: "4", fullName: "Heart Disease", enCode: "4", enabledMark: 0, sortCode: 4 },
                { id: "5", fullName: "Asthma", enCode: "5", enabledMark: 0, sortCode: 5 },
                { id: "6", fullName: "Other", enCode: "6", enabledMark: 0, sortCode: 6 }
            ]
        };
        
        return fallbackData[dicType] || [];
    }

    getFallbackCountryData() {
        return [
            { F_Id: "gj01", F_Name: "Afghanistan" },
            { F_Id: "gj02", F_Name: "Albania" },
            { F_Id: "gj03", F_Name: "Algeria" },
            { F_Id: "gj04", F_Name: "Andorra" },
            { F_Id: "gj05", F_Name: "Nepal" },
            { F_Id: "gj06", F_Name: "India" },
            { F_Id: "gj07", F_Name: "China" },
            { F_Id: "gj08", F_Name: "United States" },
            { F_Id: "gj09", F_Name: "United Kingdom" },
            { F_Id: "gj10", F_Name: "Canada" },
            { F_Id: "gj11", F_Name: "Australia" },
            { F_Id: "gj12", F_Name: "Germany" },
            { F_Id: "gj13", F_Name: "France" },
            { F_Id: "gj14", F_Name: "Japan" },
            { F_Id: "gj15", F_Name: "South Korea" },
            { F_Id: "gj16", F_Name: "Thailand" },
            { F_Id: "gj17", F_Name: "Singapore" },
            { F_Id: "gj18", F_Name: "Malaysia" },
            { F_Id: "gj19", F_Name: "Philippines" },
            { F_Id: "gj20", F_Name: "Indonesia" }
        ];
    }
}

// Export for use in other files
window.CTGAPIService = CTGAPIService;
