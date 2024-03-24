# QuillAI

QuillAI is an innovative project inspired by the functionality of telegra.ph, focusing on content moderation and enhanced search capabilities. The goal of this repository is to explore full-stack development utilizing **FastAPI** for the backend and **React** for the frontend, all while integrating **MongoDB** for data storage. 

This project is a learning endeavor aimed at addressing common issues in content management systems by leveraging generative AI for assistance and improvement.

## Table of Contents
- [Requirements](#requirements)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Installation and Usage](#installation-and-usage)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Development Practices](#development-practices)
- [License](#license)
- [Author](#author)

## Requirements

### Backend
- **Python**: Minimal version `^3.10`
- **Poetry**: Dependency management tool
- **FastAPI**: Async API backend (`^0.111.0`)
- **fastapi-cors**: For HTTP operations (`^0.0.6`)
- **Motor**: Async MongoDB driver (`^3.4.0`)
- **Faker**: Generate test data (`^25.2.0`)
- **NLTK**: Natural Language Toolkit for moderation data (`^3.8.1`)
- **Pandas**: Data processing library (`^2.2.2`)
- **Better Profanity**: Library for content moderation (`^0.7.0`)

### Frontend
- **Node.js**: To install all frontend dependencies
- **Axios**: For HTTP requests (`^1.6.8`)
- **React**: Base front-end framework (`^18.3.1`)
- **React-DOM**: For rendering DOM elements (`^18.3.1`)
- **React Router DOM**: For managing front-end routes (`^6.23.1`)
- **React Scripts**: Project tools (`^5.0.1`)
- **Snyk**: Security testing tool for code (`^1.1291.0`)

## Installation and Usage

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/Pirate-Emperor/QuillAI.git
   cd QuillAI
   ```

2. Install Poetry for Python dependencies:
   ```bash
   pip install poetry
   ```

3. Install Python dependencies:
   ```bash
   poetry install
   ```

4. Run the backend using Uvicorn in a Poetry shell:
   ```bash
   poetry shell
   py backend/main.py
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install React/JS dependencies:
   ```bash
   npm install
   ```

3. Compile styles from Sass to CSS:
   ```bash
   npm run compile:sass
   ```

4. Run the React frontend (as a separate server):
   ```bash
   npm start
   ```

**Note**: It is advisable to start with the frontend, followed by the backend, to ensure smooth integration.

## Development Practices

For clarity and convenience, tasks and reminders are documented directly in the code via `TODO` comments. While the code may not adhere to the highest standards, it is functional and serves its purpose effectively. Continuous improvement is a priority.

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. Contributions are welcome!

## License

This project is licensed under the Pirate-Emperor License. See the [LICENSE](LICENSE) file for details.

## Author

**Pirate-Emperor**

[![Twitter](https://skillicons.dev/icons?i=twitter)](https://twitter.com/PirateKingRahul)
[![Discord](https://skillicons.dev/icons?i=discord)](https://discord.com/users/1200728704981143634)
[![LinkedIn](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/piratekingrahul)

[![Reddit](https://img.shields.io/badge/Reddit-FF5700?style=for-the-badge&logo=reddit&logoColor=white)](https://www.reddit.com/u/PirateKingRahul)
[![Medium](https://img.shields.io/badge/Medium-42404E?style=for-the-badge&logo=medium&logoColor=white)](https://medium.com/@piratekingrahul)

- GitHub: [Pirate-Emperor](https://github.com/Pirate-Emperor)
- Reddit: [PirateKingRahul](https://www.reddit.com/u/PirateKingRahul/)
- Twitter: [PirateKingRahul](https://twitter.com/PirateKingRahul)
- Discord: [PirateKingRahul](https://discord.com/users/1200728704981143634)
- LinkedIn: [PirateKingRahul](https://www.linkedin.com/in/piratekingrahul)
- Skype: [Join Skype](https://join.skype.com/invite/yfjOJG3wv9Ki)
- Medium: [PirateKingRahul](https://medium.com/@piratekingrahul)

---
