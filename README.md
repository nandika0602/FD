## Your First App

This app displays the name of the requester of a freshdesk ticket in the ticket_sidebar placeholder

### Files and Folders
    .
    ├── README.md                 A file for your future self and developer friends to learn about app
    ├── app                       A folder to place all assets required for frontend components
    │   ├── index.html            A landing page for the user to use the app
    │   ├── scripts               JavaScript to place files frontend components business logic
    │   │   └── app.js
    │   └── styles                A folder to place all the styles for app
    │       ├── images
    │       │   └── icon.svg
    │       └── style.css
    ├── config                    A folder to place all the configuration files
    │   └── iparams.json
    └── manifest.json             A JSON file holding meta data for app to run on platform

Explore [more of app sample apps](https://community.developers.freshworks.com/t/freshworks-sample-apps/3604) on the Freshworks github respository.

## Overview

This project incorporates GitHub API integration to facilitate the addition of issues and the management of labels. Through the API, users can create issues and dynamically apply labels to indicate whether the ticket is in an open or closed state.

## Features

- **GitHub API Integration:** Leverage the GitHub API to add issues and manage labels.
- **Freshdesk API Integration:** Retrieve issues from the Freshdesk API to populate the GitHub issues list.
- **Issue Creation:** Users can create new GitHub issues, and the details are synchronized with Freshdesk for comprehensive issue tracking.
- **Labeling System:** Automatically apply labels to GitHub issues based on their Freshdesk status (open or closed).

