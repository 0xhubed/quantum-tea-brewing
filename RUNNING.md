# Running the Quantum Tea Brewing Application

## Prerequisites

- Node.js 18.14.2 or higher
- npm 9.5.0 or higher

## Installation

1. Install dependencies:
```bash
npm install
```

## Starting the Application

### Development Mode

To start the application in development mode with hot-reload:

```bash
npm run dev
```

The application will be available at: http://localhost:3000

### Production Mode

1. First, build the application:
```bash
npm run build
```

2. Then start the production server:
```bash
npm start
```

The production server will also run on: http://localhost:3000

## Stopping the Application

### Method 1: Keyboard Interrupt (Recommended)

While the terminal window is active, press:
```
Ctrl + C (Windows/Linux)
or
Cmd + C (Mac)
```

### Method 2: Finding and Killing the Process

If the application is running in the background or you've lost the terminal:

1. Find the process:
```bash
# On Linux/Mac
ps aux | grep "next"

# On Windows
tasklist | findstr "node"
```

2. Kill the process:
```bash
# On Linux/Mac
kill -9 [PID]

# On Windows
taskkill /PID [PID] /F
```

### Method 3: Kill by Port

If you know the application is running on port 3000:

```bash
# On Linux/Mac
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

## Other Useful Commands

### Linting
Check code for errors:
```bash
npm run lint
```

### Type Checking
Check TypeScript types:
```bash
npm run typecheck
```

### Clean Install
If you encounter issues, try a clean install:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Common Issues

### Port Already in Use
If you see "Port 3000 is already in use":
1. Either stop the process using port 3000 (see stopping methods above)
2. Or run on a different port:
```bash
PORT=3001 npm run dev
```

### Permission Denied
If you get permission errors:
```bash
sudo npm install
```

### Node Version Issues
Ensure you're using Node.js 18.14.2 or higher:
```bash
node --version
```