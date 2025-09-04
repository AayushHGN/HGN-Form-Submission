# Interface Call Instructions

## Table of Contents {#catalogue .TOC-标题1}

1. [New Tourist Information](#new-tourist-information)
2. [Data Dictionary](#data-dictionary)
3. [Country Specific Information](#country-specific-information)
4. [Upload Image](#upload-image)

## Overview

| **Serial Number** | **Interface**                | **Instructions** | **Date**   |
|-------------------|------------------------------|------------------|------------|
| **1.1**           | New Tourist Information      |                  | 2025-09-03 |
| **1.2**           | Data Dictionary              |                  | 2025-09-03 |
| **1.3**           | Country Specific Information |                  | 2025-09-03 |
| **1.4**           | Upload Image                 |                  | 2025-09-03 |

**Note**: Images must be uploaded using the image upload interface first, and the obtained data (`data`) must be converted into a string format. Fields include:  
- **F2 PassportPhoto**: Passport page photo  
- **F2 VisaPhoto**: Visa page photo  
- **F2 Image**: Tourist profile picture  
- **F2 QianZhiImg**: Tourist information signature  

**Dictionary Display Value**: `fullName`  
**Save Value**: `enCode`  

**Dictionary IDs**:  
- **Gender**: `963255a34ea64a2584c5d1ba269c1fe6`  
- **Mother Tongue**: `1929470605271371776`  
- **Blood Type**: `1930919506201415680`  
- **Whether**: `1929427715954446336`  
- **Past Medical History**: `1930150000369733632`

## New Tourist Information {#new-tourist-information}

### Return Parameters

| **Parameter** | **Description**                                      |
|---------------|------------------------------------------------------|
| `data.info`   | Returns correct/incorrect information                |
| `data.rows`   | Request success return value                        |
| `data.code`   | **200**: Interface returned successfully; **201**: Interface request failed; **202**: Passport number already exists |

### Request Details

| **Field**         | **Value**                                                                 |
|-------------------|---------------------------------------------------------------------------|
| **Request Method**| POST                                                                      |
| **API Endpoint**  | `https://ctg.hgn.com.np/api/system/DataInterface/196273737912610816/Actions/Response` |

### Headers

```json
{
  "Content-Type": "application/json; charset=utf-8",
  "YmDate": "22242342",
  "Authorization": "web::21721c80d45544d9a8904b6f639714e3",
  "Userkey": "0g7oywz58fbjjmc0"
}
```

### Body Parameters

| **Parameter**            | **Type**   | **Description**                  |
|--------------------------|------------|----------------------------------|
| `F_Name`                 | String     | Name                             |
| `F_Gender`               | String     | Gender                           |
| `F_BirthDate`            | DateTime   | Date of Birth                    |
| `F_Nationality`          | String     | Nationality                      |
| `F_PassportNum`          | String     | Passport Number                  |
| `F_NativeLanguage`       | String     | Native Language                  |
| `F_Email`                | String     | Email                            |
| `F_Phone`                | String     | Phone Number                     |
| `F_IsEnglish`            | String     | English Service Required         |
| `F_MedicalHistory`       | String     | Medical History                  |
| `F_EmergencyContact`     | String     | Emergency Contact                |
| `F_EmergencyPhone`       | String     | Emergency Contact Phone          |
| `F_EmergencyEmail`       | String     | Emergency Contact Email          |
| `F_PpassportPhoto`       | String     | Passport Photo                   |
| `F_VisaPhoto`            | String     | Visa Photo                      |
| `F_Blood`                | String     | Blood Type                      |
| `F_Height`               | Decimal    | Height (cm)                     |
| `F_Weight`               | Decimal    | Weight (kg)                     |
| `F_MedicalHistoryOther`  | String     | Other Medical History            |
| `F_Image`                | String     | Profile Photo                   |
| `F_Permanent`            | String     | Permanent Residence             |
| `F_QianZhiImg`           | String     | Tourist Signature               |
| `organizeId`             | String     | Travel Agency ID                |

### Example Request Body

```json
{
  "F_Name": "WEBCS",
  "F_Gender": "1",
  "F_BirthDate": "2000-05-18",
  "F_Nationality": "1929473651896356864",
  "F_PassportNum": "WEBCS123456",
  "F_NativeLanguage": "4",
  "F_Email": "123456@qq.com",
  "F_Phone": "18777777777",
  "F_IsEnglish": "0",
  "F_MedicalHistory": "[\"1934549575767560192\"]",
  "F_EmergencyContact": "cs",
  "F_EmergencyPhone": "123456@qq.com",
  "F_EmergencyEmail": "123456@qq.com",
  "F_PpassportPhoto": "[{\"name\":\"cs.png\",\"fileId\":\"admin,20250830,20250830E019O.png\",\"url\":\"/api/File/Image/annexpic/admin,20250830,20250830E019O.png\",\"fileSize\":null,\"fileExtension\":null,\"fileName\":null,\"thumbUrl\":\"/api/File/Image/annexpic/admin,20250830,sl_20250830E019O.png\"}]",
  "F_VisaPhoto": "[{\"name\":\"cs.png\",\"fileId\":\"admin,20250830,20250830E019O.png\",\"url\":\"/api/File/Image/annexpic/admin,20250830,20250830E019O.png\",\"fileSize\":null,\"fileExtension\":null,\"fileName\":null,\"thumbUrl\":\"/api/File/Image/annexpic/admin,20250830,sl_20250830E019O.png\"}]",
  "F_Image": "[{\"name\":\"cs.png\",\"fileId\":\"admin,20250830,20250830E019O.png\",\"url\":\"/api/File/Image/annexpic/admin,20250830,20250830E019O.png\",\"fileSize\":null,\"fileExtension\":null,\"fileName\":null,\"thumbUrl\":\"/api/File/Image/annexpic/admin,20250830,sl_20250830E019O.png\"}]",
  "F_Blood": "1",
  "F_Height": 180.00,
  "F_Weight": 85.00,
  "F_MedicalHistoryOther": "cs1",
  "F_Permanent": "1929473651896356864",
  "organizeId": "1961351104793022464",
  "F_QianZhiImg": "[{\"name\":\"cs.png\",\"fileId\":\"admin,20250830,20250830E019O.png\",\"url\":\"/api/File/Image/annexpic/admin,20250830,20250830E019O.png\",\"fileSize\":null,\"fileExtension\":null,\"fileName\":null,\"thumbUrl\":\"/api/File/Image/annexpic/admin,20250830,sl_20250830E019O.png\"}]"
}
```

### Response Format (JSON)

```json
{
  "code": 200,
  "msg": "Operation successful",
  "data": {
    "code": 200,
    "info": "Success",
    "rows": {
      "id": "1962736980026593280",
      "F_Name": "WEBCS",
      "F_Gender": "1",
      "F_BirthDate": 958579200000,
      "F_Nationality": "1929473651896356864",
      "F_PassportNum": "WEBCS123456",
      "F_NativeLanguage": "4",
      "F_Email": "123456@qq.com",
      "F_Phone": "18777777777",
      "F_IsEnglish": "0",
      "F_Allergens": null,
      "F_ContraindicatedDrugs": null,
      "F_MedicalHistory": "[\"1934549575767560192\"]",
      "F_EmergencyContact": "cs",
      "F_EmergencyPhone": "18777777777",
      "F_EmergencyEmail": "123456@qq.com",
      "F_PpassportPhoto": "[{\"name\":\"cs.png\",\"fileId\":\"admin,20250830,20250830E019O.png\",\"url\":\"/api/File/Image/annexpic/admin,20250830,20250830E019O.png\",\"fileSize\":null,\"fileExtension\":null,\"fileName\":null,\"thumbUrl\":\"/api/File/Image/annexpic/admin,20250830,sl_20250830E019O.png\"}]",
      "F_VisaPhoto": "[{\"name\":\"cs.png\",\"fileId\":\"admin,20250830,20250830E019O.png\",\"url\":\"/api/File/Image/annexpic/admin,20250830,20250830E019O.png\",\"fileSize\":null,\"fileExtension\":null,\"fileName\":null,\"thumbUrl\":\"/api/File/Image/annexpic/admin,20250830,sl_20250830E019O.png\"}]",
      "F_CreatorUserId": "1961351104897880064",
      "F_CreatorTime": 1756787936000,
      "F_Blood": "1",
      "F_Height": 180,
      "F_Weight": 85,
      "F_MedicalHistoryOther": "cs1",
      "F_Image": "[{\"name\":\"cs.png\",\"fileId\":\"admin,20250830,20250830E019O.png\",\"url\":\"/api/File/Image/annexpic/admin,20250830,20250830E019O.png\",\"fileSize\":null,\"fileExtension\":null,\"fileName\":null,\"thumbUrl\":\"/api/File/Image/annexpic/admin,20250830,sl_20250830E019O.png\"}]",
      "F_Permanent": "1929473651896356864",
      "F_QianZhiImg": "[{\"name\":\"cs.png\",\"fileId\":\"admin,20250830,20250830E019O.png\",\"url\":\"/api/File/Image/annexpic/admin,20250830,20250830E019O.png\",\"fileSize\":null,\"fileExtension\":null,\"fileName\":null,\"thumbUrl\":\"/api/File/Image/annexpic/admin,20250830,sl_20250830E019O.png\"}]",
      "DeleteMark": null,
      "DeleteTime": null,
      "DeleteUserId": null,
      "FlowId": null,
      "TenantId": "0"
    },
    "extras": null,
    "timestamp": 1756787936
  }
}
```

## Data Dictionary {#data-dictionary}

### Return Parameters

| **Parameter** | **Description**                          |
|---------------|------------------------------------------|
| `data.data`   | Request success return value             |
| `data.code`   | **200**: Interface returned successfully |

### Request Details

| **Field**         | **Value**                                                                 |
|-------------------|---------------------------------------------------------------------------|
| **Request Method**| POST                                                                      |
| **API Endpoint**  | `https://ctg.hgn.com.np/api/system/DataInterface/1962707984421359616/Actions/Response` |

### Headers

```json
{
  "Content-Type": "application/json; charset=utf-8",
  "YmDate": "22242342",
  "Authorization": "web::21721c80d45544d9a8904b6f639714e3",
  "Userkey": "0g7oywz58fbjjmc0"
}
```

### Body Parameters

| **Parameter** | **Value**                                                                 |
|---------------|---------------------------------------------------------------------------|
| `dicId`       | `963255a34ea64a2584c5d1ba269c1fe6`                                        |

**Dictionary IDs**:  
- **Gender**: `963255a34ea64a2584c5d1ba269c1fe6`  
- **Mother Tongue**: `1929470605271371776`  
- **Blood Type**: `1930919506201415680`  
- **Whether**: `1929427715954446336`  
- **Past Medical History**: `1930150000369733632`  

**Display Value**: `fullName`  
**Save Value**: `enCode`

### Response Format (JSON)

```json
{
  "code": 200,
  "msg": "操作成功",
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

## Country Specific Information {#country-specific-information}

### Return Parameters

| **Parameter** | **Description**                          |
|---------------|------------------------------------------|
| `data.data`   | Request success return value             |
| `data.code`   | **200**: Interface returned successfully |

### Request Details

| **Field**         | **Value**                                                                 |
|-------------------|---------------------------------------------------------------------------|
| **Request Method**| POST                                                                      |
| **API Endpoint**  | `https://ctg.hgn.com.np/api/system/DataInterface/1962716955202949120/Actions/Response` |

### Headers

```json
{
  "Content-Type": "application/json; charset=utf-8",
  "YmDate": "22242342",
  "Authorization": "web::21721c80d45544d9a8904b6f639714e3",
  "Userkey": "0g7oywz58fbjjmc0"
}
```

### Body Parameters

- None

### Response Format (JSON)

```json
{
  "code": 200,
  "msg": "Operation successful",
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
    {
      "F_Id": "gj04",
      "F_Name": "Andorra"
    }
  ]
}
```

## Upload Image {#upload-image}

### Request Details

| **Field**         | **Value**                                                                 |
|-------------------|---------------------------------------------------------------------------|
| **Request Method**| POST                                                                      |
| **API Endpoint**  | `https://ctg.hgn.com.np/api/file/Uploader/furniture`                      |

![Image Upload Example](media/image1.png)