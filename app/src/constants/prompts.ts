const subjects = [
  {
    subject: "Javascript",
    roadmap: [
      {
        level: "Beginner",
        topics: [
          {
            name: "Introduction",
            concepts: [
              "What is JavaScript?",
              "How JavaScript runs in the browser and Node.js",
              "Setting up a development environment",
            ],
          },
          {
            name: "Basic Syntax & Data Types",
            concepts: [
              "Variables (let, const, var)",
              "Data Types (string, number, boolean, null, undefined, symbol, bigint)",
              "Type coercion and conversions",
            ],
          },
          {
            name: "Operators & Expressions",
            concepts: [
              "Arithmetic (+, -, *, /, %, **)",
              "Comparison (==, ===, !=, !==, >, <, >=, <=)",
              "Logical (&&, ||, !)",
              "Ternary (condition ? trueValue : falseValue)",
            ],
          },
        ],
      },
      {
        level: "Intermediate",
        topics: [
          {
            name: "Advanced Functions & Closures",
            concepts: [
              "First-class functions & higher-order functions",
              "Callbacks",
              "Closures & lexical scope",
            ],
          },
          {
            name: "ES6+ Features",
            concepts: [
              "Template literals",
              "Destructuring (arrays & objects)",
              "Spread (...) and rest parameters",
              "Modules (import/export)",
            ],
          },
        ],
      },
      {
        level: "Advanced",
        topics: [
          {
            name: "Object-Oriented Programming (OOP)",
            concepts: [
              "this keyword",
              "Prototype chain & inheritance",
              "Constructor functions & classes",
              "Static methods and properties",
            ],
          },
          {
            name: "Functional Programming",
            concepts: [
              "Pure functions & immutability",
              "map, filter, reduce",
              "Composition & currying",
            ],
          },
        ],
      },
      /*
            {
              level: "Expert",
              topics: [
                {
                  name: "Performance Optimization",
                  concepts: [
                    "Memory leaks & garbage collection",
                    "Debouncing & throttling",
                    "Web workers",
                  ],
                },
                {
                  name: "Security Best Practices",
                  concepts: [
                    "Cross-site scripting (XSS) prevention",
                    "Cross-site request forgery (CSRF) protection",
                    "Secure authentication (JWT, OAuth)",
                  ],
                },
              ],
            },
            */
    ],
  },
];

export default subjects;

/*
{
  javascript: {
    
  },
  react: {
    roadmap: [
      {
        level: "Beginner",
        topics: [
          {
            name: "Introduction to React",
            concepts: [
              "What is React?",
              "Why use React?",
              "React vs. Vanilla JavaScript vs. Other frameworks",
              "Setting up a React project (Vite, Create React App)",
            ],
          },
          {
            name: "JSX (JavaScript XML)",
            concepts: [
              "JSX Syntax and Rules",
              "Embedding JavaScript in JSX",
              "JSX vs. HTML",
            ],
          },
          {
            name: "React Components",
            sconcepts: [
              "Functional Components vs. Class Components",
              "Props (Passing Data to Components)",
              "Default and Required Props",
              "Reusing Components",
            ],
          },
          {
            name: "State & Lifecycle",
            concepts: [
              "useState Hook (Managing State)",
              "Handling Events in React",
              "Lifting State Up",
              "Component Lifecycle (Class Components vs. Hooks)",
            ],
          },
          {
            name: "React Rendering & Reconciliation",
            concepts: [
              "Virtual DOM & Diffing Algorithm",
              "Controlled vs. Uncontrolled Components",
              "Keys in Lists",
              "Performance Considerations",
            ],
          },
        ],
      },
      {
        level: "Intermediate",
        topics: [
          {
            name: "Handling Forms in React",
            concepts: [
              "Controlled Components (useState)",
              "Handling Inputs and Form Events",
              "Validation (Formik, Zod, Yup)",
              "File Uploads & Drag-and-Drop Inputs",
            ],
          },
          {
            name: "React Hooks",
            concepts: [
              "useEffect (Side Effects)",
              "useContext (Context API)",
              "useRef (Referencing DOM Elements)",
              "useReducer (Alternative to useState)",
            ],
          },
          {
            name: "React Routing",
            concepts: [
              "react-router-dom Basics",
              "Dynamic Routes & URL Parameters",
              "Nested Routes",
              "Programmatic Navigation",
            ],
          },
          {
            name: "State Management Beyond useState",
            concepts: [
              "Context API (useContext)",
              "Zustand (Lightweight state management)",
              "Redux Toolkit (Global State)",
              "Recoil / Jotai / MobX",
            ],
          },
          {
            name: "Fetching & Managing Data",
            concepts: [
              "Fetch API & Axios (GET, POST, PUT, DELETE)",
              "Handling API Responses & Errors",
              "Querying Data with react-query or SWR",
              "Caching and Optimistic Updates",
            ],
          },
        ],
      },
      {
        level: "Advanced",
        topics: [
          {
            name: "React Performance Optimization",
            concepts: [
              "Memoization (useMemo, useCallback)",
              "Code Splitting & Lazy Loading (React.lazy, Suspense)",
              "Avoiding Unnecessary Re-Renders",
              "Virtualized Lists (react-window, react-virtual)",
            ],
          },
          {
            name: "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
            concepts: [
              "Next.js Fundamentals",
              "getServerSideProps, getStaticProps",
              "ISR (Incremental Static Regeneration)",
              "API Routes in Next.js",
            ],
          },
          {
            name: "Advanced Forms & Authentication",
            concepts: [
              "JWT Authentication",
              "OAuth (Google, GitHub, etc.)",
              "Session Management with Cookies",
              "Protected Routes & Role-Based Access",
            ],
          },
          {
            name: "Testing in React",
            concepts: [
              "Unit Testing with Jest & React Testing Library",
              "End-to-End Testing with Cypress or Playwright",
              "Mocking API Calls (msw)",
            ],
          },
        ],
      },
      {
        level: "Expert",
        topics: [
          {
            name: "Building Scalable React Apps",
            concepts: [
              "Monorepos (Turborepo, Nx)",
              "Microfrontends (Module Federation)",
              "Component-Driven Development (Storybook)",
            ],
          },
          {
            name: "React & Web3",
            concepts: [
              "Connecting React with Blockchain",
              "Using ethers.js or web3.js",
              "Building dApps with Smart Contracts",
            ],
          },
          {
            name: "Progressive Web Apps (PWA) & Native Development",
            concepts: [
              "Making React Apps Offline-First (service workers)",
              "React Native for Mobile App Development",
              "Expo Router (Navigation in React Native)",
            ],
          },
        ],
      },
    ],
  },
  next: {
    roadmap: [
      {
        level: "Beginner",
        topics: [
          {
            name: "Introduction to Next.js",
            concepts: [
              "What is Next.js?",
              "Why use Next.js over React?",
              "Next.js vs. Create React App (CRA)",
              "Setting up a Next.js project (npx create-next-app)",
            ],
          },
          {
            name: "Pages & Routing",
            concepts: [
              "Pages as Routes (pages/ directory)",
              "Dynamic Routes ([id].js)",
              "Catch-All Routes ([...slug].js)",
              "Linking Between Pages (next/link)",
              "API Routes (pages/api/)",
            ],
          },
          {
            name: "Layouts & Components",
            concepts: [
              "Creating Shared Layouts (_app.js)",
              "Custom _document.js for global styles",
              "Using Components across pages",
            ],
          },
          {
            name: "Styling in Next.js",
            concepts: [
              "CSS Modules (module.css)",
              "Global Styles (globals.css)",
              "Styled Components & Emotion",
              "Tailwind CSS with Next.js",
            ],
          },
          {
            name: "Fetching Data (Client-Side)",
            concepts: [
              "Fetching data using useEffect",
              "Fetching with SWR for caching",
              "Calling APIs from the frontend",
            ],
          },
        ],
      },
      {
        level: "Intermediate",
        topics: [
          {
            name: "Pre-Rendering Strategies",
            concepts: [
              "Static Site Generation (SSG) with getStaticProps",
              "Server-Side Rendering (SSR) with getServerSideProps",
              "Incremental Static Regeneration (ISR)",
            ],
          },
          {
            name: "Image Optimization",
            concepts: [
              "Using next/image for optimized loading",
              "Lazy loading images",
            ],
          },
          {
            name: "SEO Optimization",
            concepts: [
              "Meta Tags with next/head",
              "Open Graph & Twitter Cards",
              "Sitemap & Robots.txt",
            ],
          },
          {
            name: "Middleware in Next.js",
            concepts: [
              "Adding Middleware for authentication & redirects",
              "API route middlewares",
            ],
          },
          {
            name: "Fetching Data (Server-Side)",
            concepts: [
              "Using getStaticProps & getServerSideProps",
              "Handling API calls in pages/api/",
              "Fetching from databases (MongoDB, PostgreSQL)",
            ],
          },
        ],
      },
      {
        level: "Advanced",
        topics: [
          {
            name: "Authentication & Authorization",
            concepts: [
              "JWT Authentication",
              "OAuth with Google, GitHub, etc.",
              "Using next-auth for easy authentication",
            ],
          },
          {
            name: "State Management in Next.js",
            concepts: [
              "Context API (useContext)",
              "Zustand (Minimal state management)",
              "Redux Toolkit (Global state)",
            ],
          },
          {
            name: "Internationalization (i18n)",
            concepts: [
              "Setting up multiple languages",
              "Using next-intl or next-translate",
            ],
          },
          {
            name: "Performance Optimization",
            concepts: [
              "Code Splitting & Lazy Loading",
              "Reducing Bundle Size",
              "Edge Functions for performance",
            ],
          },
        ],
      },
      {
        level: "Expert",
        topics: [
          {
            name: "API Integrations & Databases",
            concepts: [
              "Connecting Next.js with MongoDB, PostgreSQL, Firebase",
              "Using Prisma ORM",
              "Calling external APIs",
            ],
          },
          {
            name: "Next.js & Web3",
            concepts: [
              "Connecting Next.js with blockchain",
              "Using ethers.js or wagmi",
            ],
          },
          {
            name: "Deployment Strategies",
            concepts: [
              "Deploying to Vercel",
              "Deploying to AWS, DigitalOcean, or self-hosted",
              "CI/CD for Next.js apps",
            ],
          },
        ],
      },
    ],
  },
  relationalDatabases: {
    roadmap: [
      {
        level: "Beginner",
        topics: [
          {
            name: "Introduction to Databases",
            concepts: [
              "What is a database?",
              "Types of databases (Relational vs. NoSQL)",
              "Popular relational databases (MySQL, PostgreSQL, SQL Server, SQLite)",
            ],
          },
          {
            name: "Database Design Basics",
            concepts: [
              "Tables, Rows, and Columns",
              "Primary Keys and Foreign Keys",
              "Data Types in SQL",
            ],
          },
          {
            name: "Basic SQL Commands",
            concepts: [
              "SELECT (Retrieving Data)",
              "INSERT (Adding Data)",
              "UPDATE (Modifying Data)",
              "DELETE (Removing Data)",
            ],
          },
          {
            name: "Filtering & Sorting Data",
            concepts: [
              "WHERE Clause (Filtering)",
              "ORDER BY (Sorting)",
              "LIMIT and OFFSET (Pagination)",
            ],
          },
        ],
      },
      {
        level: "Intermediate",
        topics: [
          {
            name: "Joins & Relationships",
            concepts: [
              "INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN",
              "Self Joins & Cross Joins",
              "Many-to-Many Relationships",
            ],
          },
          {
            name: "Aggregations & Grouping",
            concepts: [
              "GROUP BY and HAVING",
              "Aggregate functions (SUM, AVG, COUNT, MAX, MIN)",
            ],
          },
          {
            name: "Subqueries & Common Table Expressions (CTEs)",
            concepts: [
              "Nested Queries (Subqueries)",
              "Using WITH for readability",
            ],
          },
          {
            name: "Indexes & Performance Optimization",
            concepts: [
              "What are Indexes?",
              "Creating Indexes (CREATE INDEX)",
              "Pros & Cons of Indexing",
            ],
          },
          {
            name: "Transactions & ACID Properties",
            concepts: [
              "What is a Transaction?",
              "BEGIN, COMMIT, ROLLBACK",
              "ACID (Atomicity, Consistency, Isolation, Durability)",
            ],
          },
        ],
      },
      {
        level: "Advanced",
        topics: [
          {
            name: "Stored Procedures & Functions",
            concepts: [
              "What are Stored Procedures?",
              "Creating and Using Stored Procedures",
              "User-Defined Functions",
            ],
          },
          {
            name: "Triggers & Event Scheduling",
            concepts: [
              "Automating tasks with Triggers",
              "Scheduling Jobs (e.g., MySQL Event Scheduler)",
            ],
          },
          {
            name: "Views & Materialized Views",
            concepts: [
              "Creating & Using Views",
              "Difference Between Views and Materialized Views",
            ],
          },
          {
            name: "Database Normalization & Denormalization",
            concepts: [
              "Normal Forms (1NF, 2NF, 3NF, BCNF)",
              "When to Use Denormalization",
            ],
          },
          {
            name: "Security & Access Control",
            concepts: [
              "User Roles & Permissions (GRANT, REVOKE)",
              "SQL Injection & Prevention",
            ],
          },
        ],
      },
      {
        level: "Expert",
        topics: [
          {
            name: "Database Replication & Sharding",
            concepts: [
              "Master-Slave & Master-Master Replication",
              "Horizontal & Vertical Scaling",
              "Partitioning Data",
            ],
          },
          {
            name: "Backup & Recovery",
            concepts: ["Database Backup Strategies", "Point-in-Time Recovery"],
          },
          {
            name: "Using ORMs (Object-Relational Mappers)",
            concepts: [
              "Sequelize (Node.js)",
              "Prisma (TypeScript)",
              "Hibernate (Java)",
              "SQLAlchemy (Python)",
            ],
          },
          {
            name: "Integrating Databases with Applications",
            concepts: [
              "Connecting Databases with Backend Frameworks",
              "REST APIs & GraphQL with SQL",
            ],
          },
        ],
      },
    ],
  },
};
*/
