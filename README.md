# Next.js Supabase API Connector

A minimal Next.js application that demonstrates database connectivity with Supabase PostgreSQL, featuring a clean frontend interface and robust API endpoints. Create a cron job that calls the root directory `/` at every interval, example every day. This will prevent Supabase from pausing your project due to inactivity

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Supabase account with PostgreSQL database

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd nextjs-supabase-api

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase connection string
```

### Environment Setup
Create a `.env.local` file with your Supabase connection string:
```bash
SUPABASE_CONNECTION_STRING="postgresql://username:password@host:port/database?pgbouncer=true"
```

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
nextjs-supabase-api/
├── pages/
│   ├── index.js              # Frontend component
│   └── api/
│       └── test-db-connection.js  # API endpoint
├── .env.local               # Environment variables
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🔧 Technology Stack

- **Frontend**: Next.js 14.2.3, React 18.3.1
- **Database**: Supabase PostgreSQL
- **Database Driver**: `pg` library (node-postgres)
- **Environment**: dotenv for configuration management

## 📊 Features

- ✅ **Database Connectivity Test**: Automatically checks connection on page load
- ✅ **Real-time Status Display**: Shows connection status and server time
- ✅ **Error Handling**: Comprehensive error handling with user-friendly messages
- ✅ **Connection Pooling**: Efficient database connection management
- ✅ **Responsive Design**: Clean, mobile-friendly interface

## 🔍 API Endpoints

### GET `/api/test-db-connection`
Tests database connectivity and returns server time.

**Response:**
```json
{
  "message": "Database connection successful!",
  "serverTime": "2024-01-01T12:00:00.000Z"
}
```

**Error Response:**
```json
{
  "message": "Failed to connect to the database.",
  "error": "Connection timeout"
}
```

## 🛡️ Security Considerations

### ⚠️ Current Issues
- **Database credentials exposed** in environment file
- **No authentication** required for API access
- **No rate limiting** implemented
- **Publicly accessible** endpoints

### 🔒 Recommended Security Measures
1. **Secure Environment Variables**
   - Move credentials to secure vault
   - Use environment-specific configurations
   - Never commit credentials to version control

2. **Authentication & Authorization**
   - Implement JWT or session-based authentication
   - Add role-based access control (RBAC)
   - Use API keys for external access

3. **Rate Limiting**
   - Implement request throttling
   - Add IP-based rate limiting
   - Use middleware like `express-rate-limit`

4. **Input Validation**
   - Validate all incoming requests
   - Sanitize user inputs
   - Use schema validation libraries

## 🚀 Production Deployment

### Environment Variables
```bash
# Production
SUPABASE_CONNECTION_STRING="postgresql://prod_user:secure_password@prod-host:5432/prod_db?ssl=require"

# Development
SUPABASE_CONNECTION_STRING="postgresql://dev_user:dev_password@dev-host:5432/dev_db"
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

## 🧪 Testing

### Manual Testing
1. Start the development server
2. Visit `http://localhost:3000`
3. Verify database connection status displays
4. Check browser console for any errors

### API Testing
```bash
# Test database connection
curl http://localhost:3000/api/test-db-connection
```

## 📈 Performance Optimization

### Current Optimizations
- **Connection pooling** with `pg.Pool`
- **Efficient queries** using `SELECT NOW()`
- **Proper error handling** with try-catch blocks

### Future Improvements
- **Caching layer** with Redis
- **Database query optimization**
- **CDN integration** for static assets
- **Monitoring and alerting** setup

## 🐛 Troubleshooting

### Common Issues

**Connection Failed**
- Verify Supabase credentials in `.env.local`. It should in the format of something like `postgresql://postgres.wpdmwjyav:xxx0f9gs2@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
- Check network connectivity
- Ensure Supabase project is active

**Build Errors**
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check Node.js version compatibility

**Environment Variables Not Loading**
- Ensure `.env.local` exists in project root
- Restart development server after changes
- Check file permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node-postgres Documentation](https://node-postgres.com/)

---

**Note**: This project is intended for educational purposes. For production use, implement proper security measures and follow best practices for database management and API security.# nextjs-supabase-api
# nextjs-supabase-keep-alive
