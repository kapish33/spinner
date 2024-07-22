```mermaid
flowchart TD
    A[User Uploads CSV File] --> B[Receive File with Express]
    B --> C[File Validation (MIME Type Check)]
    C -->|Valid CSV| D[Save File to Temporary Location]
    C -->|Invalid File| E[Return Error Response]

    D --> F[Read and Parse CSV]
    F --> G[Extract Image URLs]
    
    G --> H[Download Images]
    H --> I[Process Images]
    I --> J[Save Images to Output Folder]
    I --> K[Store Image Data in Database]
    
    J --> L[Generate Output CSV]
    K --> L[Generate Output CSV]

    L --> M[Send Success Response]
    M --> N[Provide Download Link for Output CSV]
    
    E --> N[Provide Error Response]


### Explanation:

1. **User Uploads CSV File**: Initiates the file upload process.
2. **Receive File with Express**: The file is received by the Express server.
3. **File Validation (MIME Type Check)**: Validates that the file is a CSV.
4. **Save File to Temporary Location**: Saves the uploaded file temporarily.
5. **Read and Parse CSV**: Parses the CSV file to extract data.
6. **Extract Image URLs**: Extracts image URLs from the CSV data.
7. **Download Images**: Downloads the images from the extracted URLs.
8. **Process Images**: Processes the downloaded images (e.g., resize).
9. **Save Images to Output Folder**: Saves the processed images to the output folder.
10. **Store Image Data in Database**: Stores image metadata in the database.
11. **Generate Output CSV**: Creates a new CSV file with the processed data.
12. **Send Success Response**: Sends a success response with a download link for the output CSV.
13. **Provide Error Response**: Provides an error response if validation fails.

This Mermaid diagram will help visualize the architecture and workflow of your file upload and processing system.
