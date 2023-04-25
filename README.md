# aws-codecommit-clone-url-modifier
This is a userscript that modifies the clone URL for AWS CodeCommit repositories to include the profile name displayed by Extend Switch Roles. When you click on the "Clone URL GRC" button in CodeCommit, the modified URL will be copied to your clipboard.

## Installation
To use this userscript, you need to have a userscript manager installed in your browser. Here are a few popular options:

- [Tampermonkey](https://www.tampermonkey.net/)
- [Violentmonkey](https://violentmonkey.github.io/)
- [Greasemonkey](https://www.greasespot.net/)

Once you have a userscript manager installed, you can install the `aws-codecommit-clone-url-modifier` userscript by clicking on this link: [aws-codecommit-clone-url-modifier.user.js](https://github.com/xargsuk/aws-codecommit-clone-url-modifier/raw/main/aws-codecommit-clone-url-modifier.user.js)

## Usage
1. Go to the CodeCommit repository you want to clone.
2. Click on the "Clone URL" button, followed by Clone HTTPS GRC
3. Wait for the modified URL to be copied to your clipboard.

That's it! You can now paste the modified URL into your Git client to clone the repository.

## How it works
The userscript listens for changes in the DOM and looks for the flash message that appears when you click on the "Clone URL" button. It then extracts the clone URL from the banner, your profile name from Extend Switch Roles in the top right, modifies the URL to include the profile name, and copies the modified URL to your clipboard.

Note that the profile name specified in Extend Switch Roles much match what is in you AWS CLI config.

## Compatibility
- Google Chrome
- Mozilla Firefox
- Microsoft Edge

If you encounter any issues with the userscript, please let us know by opening an issue in this repository. You can enable [debugmode](https://github.com/XargsUK/aws-codecommit-clone-url-modifier/blob/aaf4c72153f74204a0a553dfbba9ac9803abca4d/aws-codecommit-clone-url-modifier.user.js#L14) by changing to true and checking the browser console.

## Contributing

I welcome contributions to this project! To get started, please follow these steps:

1. Fork the repository and clone it locally.
2. Create a new branch for your changes.
3. Make your changes and test them thoroughly.
4. Push your changes to your forked repository.
5. Open a pull request against the main repository's `main` branch.

Before submitting a pull request, please ensure that your code has been linted with [JavaScript Standard Style](https://standardjs.com/). You can use the command `npx standard`. This will check your code for any potential errors or style violations. Pull requests are automatically linted once opened.

If you have any questions or run into any issues while contributing, please feel free to [create an issue](https://github.com/XargsUK/aws-codecommit-clone-url-modifier/issues/new).
