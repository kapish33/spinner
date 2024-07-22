# spinner

spinner is a project designed to handle and process image data from CSV files, offering functionalities for uploading, processing, and retrieving image data. 

[For Architure](https://drive.google.com/file/d/1EQgqP9gmhiZXDYNOhGjkeOJTFs79AQ8O/view?usp=drive_link)

## Getting Started

These instructions will help you set up and run Raechiture locally.

### Prerequisites

- Node.js (version 18 or later)
- Yarn or npm (for managing dependencies)
- `tsup`, `tsx`, `biome`, `vitest`, `husky`, and other development tools

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/kapish33/spinner.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd spinner
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

The server is configured to run on port `8080`. Ensure this port is available on your local machine.

### Usage

#### Upload CSV File

To upload a CSV file containing image URLs, use the following `curl` command:

```bash
curl --location 'http://localhost:8080/csv/upload' \
--form 'file=@"/path/to/your/file.csv"'


