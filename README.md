# <p align="center">AI Workflow Orchestrator</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></a>
  <a href="#"><img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"></a>
</p>

## Introduction

This project is a visual workflow orchestration tool, empowering users to design and automate complex processes through an intuitive drag-and-drop interface. It allows you to create workflows comprised of interconnected nodes, representing various tools, models, and triggers. The platform is designed for developers and non-developers alike, enabling automation without extensive coding knowledge.

## Table of Contents

1.  [Key Features](#key-features)
2.  [Installation Guide](#installation-guide)
3.  [Usage](#usage)
4.  [Environment Variables](#environment-variables)
5.  [Project Structure](#project-structure)
6.  [Technologies Used](#technologies-used)
7.  [License](#license)

## Key Features

-   **Visual Workflow Editor:**  Create and manage workflows using a drag-and-drop interface powered by React Flow.
-   **Node-Based Architecture:**  Compose workflows from a variety of node types, including triggers, agents, tools, and models.
-   **Asynchronous Execution:**  Workflows are executed asynchronously using BullMQ for improved performance and reliability.
-   **User Authentication:** Secure user authentication and authorization using JWT.
-   **Extensible Node System:** Easily add new node types and integrations to extend the platform's capabilities.
-   **Tool and Model Integration:** Seamlessly integrate various tools and language models (e.g., Gemini) into your workflows.
-   **Email Integration:** Send emails directly from your workflows using the Email Node.

## Installation Guide

Follow these steps to get the project up and running:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies using pnpm:**

    ```bash
    pnpm install
    ```


3.  **Run the backend server:**

    ```bash
    cd apps/backend
    pnpm dev
    ```

4.  **Run the frontend application:**

    ```bash
    cd apps/web
    pnpm dev
    ```

## Usage

1.  **Access the application:**

    Open your web browser and navigate to `http://localhost:3000` (or the appropriate port if different).

2.  **Sign up or sign in:**

    Create a new user account or log in with an existing one.

3.  **Create a new workflow:**

    Click the "Create Workflow" button on the home page.

4.  **Design your workflow:**

    Use the drag-and-drop interface to add nodes to the canvas.  Connect nodes to define the flow of data.

5.  **Configure nodes:**

    Select a node to configure its parameters and credentials.

6.  **Execute the workflow:**

    Click the "Execute" button to run the workflow.


## Project Structure

```
/
├── pnpm-lock.yaml
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── packages
│   ├── ui                  # Reusable UI components
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── code.tsx
│   │   │   ├── card.tsx
│   │   │   └── button.tsx
│   ├── typescript-config   # Shared TypeScript configurations
│   │   ├── base.json
│   │   ├── react-library.json
│   │   ├── nextjs.json
│   │   └── package.json
│   └── eslint-config       # Shared ESLint configurations
│       ├── README.md
│       ├── next.js
│       ├── react-internal.js
│       ├── base.js
│       └── package.json
└── apps
    ├── backend             # Backend application (Node.js, Express.js)
    │   ├── tsconfig.json
    │   ├── package.json
    │   ├── src
    │   │   ├── server.ts       # Main server file
    │   │   ├── middlewares
    │   │   │   └── jwt.ts      # JWT middleware
    │   │   ├── routes
    │   │   │   ├── auth.ts     # Authentication routes
    │   │   │   ├── workflow.ts # Workflow routes
    │   │   │   └── credentials.ts # Credentials routes
    │   │   ├── nodes
    │   │   │   ├── types.ts
    │   │   │   ├── AgentNode.ts
    │   │   │   ├── EmailNode.ts
    │   │   │   ├── manualTrigger.ts
    │   │   │   └── tools
    │   │   │       ├── MultiplyTool.ts
    │   │   │       └── AdditionTool.ts
    │   │   ├── services
    │   │   │   ├── executionService.ts
    │   │   │   ├── queue.ts       # BullMQ queue setup
    │   │   │   └── nodeRegistry.ts
    │   │   └── database
    │   │       ├── schema.ts     # Mongoose schema definitions
    │   │       ├── config.ts     # Database connection configuration
    │   │       └── model.ts      # Mongoose models
    └── web                 # Frontend application (Next.js, React)
        ├── eslint.config.js
        ├── README.md
        ├── tsconfig.json
        ├── next.config.js
        ├── package.json
        ├── lib
        │   ├── auth.ts
        │   └── config.ts
        ├── app
        │   ├── globals.css
        │   ├── page.tsx      # Home page
        │   ├── layout.tsx    # Layout component
        │   ├── workflow
        │   │   └── [id]
        │   │       ├── page.tsx  # Workflow detail page
        │   │       ├── components
        │   │       │   ├── Graph.tsx         # React Flow graph component
        │   │       │   ├── panels
        │   │       │   │   ├── TriggersAndNodes.tsx # Node selection panel
        │   │       │   │   ├── parameterForm.tsx   # Parameter form component
        │   │       │   │   ├── modelsPanel.tsx      # Model selection panel
        │   │       │   │   └── ToolsPanel.tsx       # Tool selection panel
        │   │       │   ├── utils
        │   │       │   │   ├── storeSaveWF.ts
        │   │       │   │   └── graphData.ts
        │   │       │   ├── nodes
        │   │       │   │   ├── ToolNode.tsx
        │   │       │   │   ├── DarkNode.tsx
        │   │       │   │   ├── ModelNode.tsx
        │   │       │   │   ├── AgentNode.tsx
        │   │       │   │   └── TriggerNode.tsx
        │   │       │   └── styles
        │   │       │       └── style.css
        │   ├── home
        │   │   ├── types.ts
        │   │   ├── page.tsx      # Home page
        │   │   ├── components
        │   │   │   ├── createWF.tsx
        │   │   │   └── workflows.tsx  # Workflow list component
        │   ├── signin
        │   │   └── page.tsx      # Sign-in page
        │   └── signup
        │       └── page.tsx      # Sign-up page
```

## Technologies Used

<p align="left">
  <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="#"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></a>
  <a href="#"><img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"></a>
  <a href="#"><img src="https://img.shields.io/badge/React_Flow-4B1CAC?style=for-the-badge&>" alt="React Flow"></a>
  <a href="#"><img src="https://img.shields.io/badge/bullmq-blue?style=for-the-badge" alt="BullMQ"></a>
</p>

-   **Frontend:** React, Next.js, React Flow, axios
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Authentication:** JWT
-   **Queue:** BullMQ

## License

MIT License
