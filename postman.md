# HGN Tourist Registration API Testing Guide

This document provides comprehensive testing instructions for all CTG Platform APIs used in the HGN-Form-Submission project. Use Postman to test these endpoints and verify data quality.

## Table of Contents
1. [Setup](#setup)
2. [Common Headers](#common-headers)
3. [Dictionary API](#dictionary-api)
   - [Gender Dictionary](#gender-dictionary)
   - [Mother Tongue Dictionary](#mother-tongue-dictionary)
   - [Blood Type Dictionary](#blood-type-dictionary)
   - [Yes/No Dictionary](#yesno-dictionary)
   - [Medical History Dictionary](#medical-history-dictionary)
4. [Countries API](#countries-api)
5. [File Upload API](#file-upload-api)
6. [Tourist Submission API](#tourist-submission-api)
7. [Troubleshooting](#troubleshooting)

## Setup

1. **Install Postman**: Download and install from [postman.com](https://www.postman.com/downloads/)
2. **Create a Collection**: 
   - Click "New" > "Collection"
   - Name it "HGN Tourist Registration APIs"
3. **Create Environment**:
   - Click "New" > "Environment" 
   - Name it "CTG Platform"
   - Add the following variables:
     - `baseUrl`: `https://ctg.hgn.com.np/api`
     - `ymDate`: `22242342`
     - `authToken`: `web::21721c80d45544d9a8904b6f639714e3`
     - `userKey`: `0g7oywz58fbjjmc0`

## Common Headers

All requests require these headers:

```
Content-Type: application/json; charset=utf-8
YmDate: {{ymDate}}
Authorization: {{authToken}}
Userkey: {{userKey}}
```

## Dictionary API

The Dictionary API provides dropdown options for various form fields.

### Base Request Details

- **URL**: `{{baseUrl}}/system/DataInterface/1962707984421359616/Actions/Response`
- **Method**: `POST`
- **Headers**: Common headers (see above)

### Gender Dictionary

Test the gender dropdown values:

1. Create a new request in the collection
2. Name it "Get Gender Dictionary"
3. Set method to `POST`
4. Set URL to `{{baseUrl}}/system/DataInterface/1962707984421359616/Actions/Response`
5. Add common headers
6. Add body (raw JSON):
   ```json
   {
     "dicId": "963255a34ea64a2584c5d1ba269c1fe6"
   }
   ```
7. Click "Send"

**Expected Response**:
```json
{
  "code": 200,
  "msg": "Successful operation",
  "data": {
    "code": 200,
    "data": [
      {
        "id": "84ff10b322d74ac3a653e3176724f909",
        "fullName": "Male",
        "enCode": "1",
        "enabledMark": 0,
        "sortCode": 1
      },
      {
        "id": "d06778318f894c4b914050601897effe",
        "fullName": "Female",
        "enCode": "2",
        "enabledMark": 0,
        "sortCode": 2
      }
    ],
    "extras": null,
    "timestamp": 1756871869
  }
}
```

### Mother Tongue Dictionary

Test the mother tongue dropdown values:

1. Create a new request in the collection
2. Name it "Get Mother Tongue Dictionary"
3. Set method to `POST`
4. Set URL to `{{baseUrl}}/system/DataInterface/1962707984421359616/Actions/Response`
5. Add common headers
6. Add body (raw JSON):
   ```json
   {
     "dicId": "1929470605271371776"
   }
   ```
7. Click "Send"

**Expected Response**: A JSON array containing language options with fields like `id`, `fullName`, and `enCode`.

**Analysis Steps**:
1. Check how many language options are returned
2. Verify if all options have valid `fullName` values
3. Check for null/empty values in `fullName` field
4. Note the exact response structure for debugging the application

### Blood Type Dictionary

Test the blood type dropdown values:

1. Create a new request in the collection
2. Name it "Get Blood Type Dictionary"
3. Set method to `POST`
4. Set URL to `{{baseUrl}}/system/DataInterface/1962707984421359616/Actions/Response`
5. Add common headers
6. Add body (raw JSON):
   ```json
   {
     "dicId": "1930919506201415680"
   }
   ```
7. Click "Send"

**Expected Response**: A JSON array containing blood type options.

### Yes/No Dictionary

Test the yes/no dropdown values (used for English service field):

1. Create a new request in the collection
2. Name it "Get Yes/No Dictionary"
3. Set method to `POST`
4. Set URL to `{{baseUrl}}/system/DataInterface/1962707984421359616/Actions/Response`
5. Add common headers
6. Add body (raw JSON):
   ```json
   {
     "dicId": "1929427715954446336"
   }
   ```
7. Click "Send"

### Medical History Dictionary

Test the medical history dropdown values:

1. Create a new request in the collection
2. Name it "Get Medical History Dictionary"
3. Set method to `POST`
4. Set URL to `{{baseUrl}}/system/DataInterface/1962707984421359616/Actions/Response`
5. Add common headers
6. Add body (raw JSON):
   ```json
   {
     "dicId": "1930150000369733632"
   }
   ```
7. Click "Send"

## Countries API

Test the countries dropdown values:

1. Create a new request in the collection
2. Name it "Get Countries"
3. Set method to `POST`
4. Set URL to `{{baseUrl}}/system/DataInterface/1962716955202949120/Actions/Response`
5. Add common headers
6. Add empty body (raw JSON):
   ```json
   {}
   ```
7. Click "Send"

**Expected Response**:
```json
{
  "code": 200,
  "msg": "Successful operation",
  "data": [
    {
      "F_Id": "gj03",
      "F_Name": "Algeria"
    },
    {
      "F_Id": "gj02",
      "F_Name": "Albania"
    },
    {
      "F_Id": "gj01",
      "F_Name": "Afghanistan"
    },
    // ... more countries
  ]
}
```

## File Upload API

Test the file upload functionality:

1. Create a new request in the collection
2. Name it "Upload File"
3. Set method to `POST`
4. Set URL to `{{baseUrl}}/File/Upload?fileModule=annexpic&_=1756872139761`
   - Note: The `_` parameter is a timestamp; update as needed
5. Remove the `Content-Type` header (will be set by form-data)
6. Add the other common headers
7. In the "Body" tab, select "form-data"
8. Add a key named "file" (type: File) and select a test image file
9. Click "Send"

**Expected Response**:
```json
{
  "name": "test.png",
  "fileId": "admin,20250904,20250904ABCD0.png",
  "url": "/api/File/Image/annexpic/admin,20250904,20250904ABCD0.png",
  "thumbUrl": "/api/File/Image/annexpic/admin,20250904,sl_20250904ABCD0.png"
}
```

## Tourist Submission API

Test the tourist registration form submission:

1. Create a new request in the collection
2. Name it "Submit Tourist Data"
3. Set method to `POST`
4. Set URL to `{{baseUrl}}/system/DataInterface/196273737912610816/Actions/Response`
5. Add common headers
6. Add body (raw JSON) - example with minimum required fields:
   ```json
   {
     "F_Name": "Test User",
     "F_Gender": "1",
     "F_BirthDate": "2000-01-01",
     "F_Nationality": "gj05",
     "F_PassportNum": "TEST123456",
     "F_NativeLanguage": "1",
     "F_Email": "test@example.com",
     "F_Phone": "1234567890",
     "F_IsEnglish": "1",
     "F_MedicalHistory": "[]",
     "F_EmergencyContact": "Emergency Contact",
     "F_EmergencyPhone": "0987654321",
     "F_EmergencyEmail": "emergency@example.com",
     "F_Blood": "1",
     "F_Height": 175.0,
     "F_Weight": 70.0,
     "F_MedicalHistoryOther": "",
     "F_Permanent": "gj05",
     "F_Allergens": "",
     "F_ContraindicatedDrugs": "",
     "F_PpassportPhoto": "[]",
     "F_VisaPhoto": "[]",
     "F_Image": "[]",
     "F_QianZhiImg": "[]",
     "organizeId": "1961351104793022464"
   }
   ```
7. Click "Send"

**Expected Response**:
```json
{
  "code": 200,
  "msg": "Operation successful",
  "data": {
    "code": 200,
    "info": "Success",
    "rows": {
      "id": "1962736980026593280",
      "F_Name": "Test User",
      // ... more fields with submitted data
    },
    "extras": null,
    "timestamp": 1756787936
  }
}
```

## Troubleshooting

### Common Issues

1. **Authentication Failures**:
   - Check that all headers are correctly set
   - Verify that the authorization token is still valid

2. **Empty or Null Values in API Response**:
   - Check response structure carefully
   - Look for nested data objects (`data.data` vs just `data`)
   - Check for `null` or empty string values in key fields

3. **404 Errors**:
   - Verify the endpoint URL (especially the numeric ID)
   - Check for typos in URL path

4. **Response Structure Discrepancies**:
   - Compare the actual response with what your code expects
   - Check field naming (`fullName` vs other alternatives)

### API Response Analysis Tips

When testing APIs, pay special attention to:

1. **Response Structure**: Is the data in `result.data` or `result.data.data`?
2. **Field Names**: Are the field names consistent (`fullName`, `name`, etc.)?
3. **Empty Values**: Are there null or empty values in important fields?
4. **Data Types**: Are numbers, strings, and dates in the expected format?
5. **Array Structure**: For arrays, check the first few and last few items

### Testing All Dropdown Options

To verify all dropdown options are available:

1. Test each dictionary API and save the response
2. Count the number of items in each response
3. Compare with what's displayed in your form
4. Check for items with missing or null display values

### Saving Test Results

For each API response:
1. Click the "Save Response" button in Postman
2. Choose "Save as example"
3. Give it a descriptive name
4. These saved examples help with debugging and documentation
