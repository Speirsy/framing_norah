# Framing Norah Web Application

This repository contains the source code for **Framing Norah**, a web application designed to support a professional picture hanging service in Glasgow. The site allows users to explore services, read a blog, view a gallery, and get in touch through the contact page. The application integrates Firebase for authentication and Firestore for blog content management.

## Key Features

- **Responsive Web Design**: Optimized for mobile, tablet, and desktop usage.
- **Google Maps Integration**: Displays service areas around Glasgow West End.
- **Blog System**: Managed through Firestore, allowing for content creation and updates.
- **Authentication**: Firebase authentication is used to manage access to certain administrative functions such as posting new blog content.
- **Image and Video Gallery**: A dynamic gallery that allows users to view various projects and portfolio items.

## Installation and Setup

To set up and run this project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/Speirsy/framing_norah.git
    ```

2. Navigate to the project directory:

    ```bash
    cd framing_norah
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file based on `.env.example` and configure your Firebase and API keys.

5. Start the development server:

    ```bash
    npm start
    ```

The app will run locally at `http://localhost:3000`.

## Firebase Integration

This project integrates Firebase for authentication, Firestore for blog data storage, and hosting. To deploy the project on Firebase Hosting:

1. Make sure Firebase CLI is installed.
2. Run the following command to deploy the app:

    ```bash
    firebase deploy
    ```

Ensure your Firebase project is correctly configured, including Firestore and authentication settings.

## Contributions

We welcome contributions! If you'd like to contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out via [your contact information].



