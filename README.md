# HOSPITAL-MANAGEMENT-SYSTEM

## Overview
A complete Hospital Management System deployed on Kubernetes using Docker containers with two main components:
- **Frontend**: React-based user interface
- **Backend**: Node.js/Express API server

This project demonstrates enterprise-grade deployment practices using Kubernetes manifests with proper scaling, networking, and service management.

## Project Structure
```
HOSPITAL-MANAGEMENT-SYSTEM/
├── k8s/
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Key Features

### Kubernetes Deployment
- **Two Replicas**: Frontend and Backend deployments configured with multiple replicas for high availability
- **Service Exposure**: ClusterIP services for internal communication, can be extended to LoadBalancer/NodePort
- **Container Orchestration**: Full deployment lifecycle management
- **Scaling**: Horizontal pod autoscaling ready configuration

### Frontend (React)
- Modern responsive UI
- Patient management interface
- Doctor scheduling
- Appointment booking
- Real-time notifications

### Backend (Node.js/Express)
- RESTful API endpoints
- Patient management
- Doctor management
- Appointment scheduling
- Authentication & authorization
- Database integration

## Technology Stack

**Frontend:**
- React.js
- Axios for HTTP requests
- React Router for navigation
- Material-UI or Bootstrap for styling

**Backend:**
- Node.js
- Express.js
- MongoDB/MySQL for database
- Mongoose/Sequelize for ORM
- JWT for authentication

**DevOps:**
- Docker for containerization
- Kubernetes for orchestration
- YAML configuration manifests

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (minikube, Docker Desktop K8s, or cloud-based)
- kubectl CLI
- Docker images pushed to a container registry

### Files Overview

#### Frontend Deployment (`k8s/frontend-deployment.yaml`)
```yaml
- Service: Frontend-HMS
- Replicas: 2-3
- Container: React application on port 3000
- Image: your-registry/hospital-frontend:latest
```

#### Backend Deployment (`k8s/backend-deployment.yaml`)
```yaml
- Service: Backend-HMS
- Replicas: 2-3
- Container: Node.js/Express API on port 5000
- Image: your-registry/hospital-backend:latest
- Environment variables for database connection
```

#### Services
- **Frontend Service**: Exposes frontend on port 3000
- **Backend Service**: Exposes backend on port 5000

## Deployment Steps

### 1. Build Docker Images
```bash
# Build frontend image
cd frontend
docker build -t your-registry/hospital-frontend:latest .
docker push your-registry/hospital-frontend:latest

# Build backend image
cd ../backend
docker build -t your-registry/hospital-backend:latest .
docker push your-registry/hospital-backend:latest
```

### 2. Deploy to Kubernetes
```bash
# Create namespace (optional)
kubectl create namespace hospital-app

# Apply Kubernetes manifests
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
```

### 3. Verify Deployment
```bash
# Check deployments
kubectl get deployments

# Check pods
kubectl get pods

# Check services
kubectl get svc

# View logs
kubectl logs -f deployment/frontend-hms
kubectl logs -f deployment/backend-hms
```

### 4. Access the Application
```bash
# Port forward for frontend
kubectl port-forward svc/frontend-hms 3000:3000

# Port forward for backend
kubectl port-forward svc/backend-hms 5000:5000

# Access at http://localhost:3000
```

## Local Development

### Using Docker Compose
```bash
docker-compose up -d
```

### Without Docker
```bash
# Frontend
cd frontend
npm install
npm start

# Backend (in another terminal)
cd backend
npm install
npm start
```

## API Endpoints

### Patient Management
- `POST /api/patients` - Create patient
- `GET /api/patients` - List all patients
- `GET /api/patients/:id` - Get patient details
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctor Management
- `POST /api/doctors` - Create doctor
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - List appointments
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

## Kubernetes Scaling

```bash
# Scale frontend deployment
kubectl scale deployment frontend-hms --replicas=5

# Scale backend deployment
kubectl scale deployment backend-hms --replicas=5

# View current replicas
kubectl get deployments
```

## Health Checks

All deployments include:
- **Liveness Probe**: Ensures container is running
- **Readiness Probe**: Ensures container is ready to receive traffic

## Environment Variables

### Backend
```
DB_HOST=mongodb-host
DB_PORT=27017
DB_NAME=hospital_db
DB_USER=admin
DB_PASSWORD=secure_password
JWT_SECRET=your-secret-key
NODE_ENV=production
```

### Frontend
```
REACT_APP_API_URL=http://backend-hms:5000
REACT_APP_ENV=production
```

## Troubleshooting

### Pods not starting
```bash
# Check pod status
kubectl describe pod <pod-name>

# Check events
kubectl get events
```

### Service not accessible
```bash
# Check service endpoints
kubectl get endpoints

# Check service configuration
kubectl describe svc <service-name>
```

### Image pull errors
```bash
# Create docker registry secret
kubectl create secret docker-registry regcred \
  --docker-server=<your-registry> \
  --docker-username=<username> \
  --docker-password=<password>
```

## Monitoring & Logging

```bash
# View deployment logs
kubectl logs deployment/frontend-hms
kubectl logs deployment/backend-hms

# Stream logs
kubectl logs -f deployment/backend-hms

# View resource usage
kubectl top nodes
kubectl top pods
```

## Cleanup

```bash
# Delete all resources
kubectl delete deployment frontend-hms backend-hms
kubectl delete svc frontend-hms backend-hms

# Or delete everything in namespace
kubectl delete namespace hospital-app
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License - See LICENSE file for details

## Author
Developed for Hospital Management System project

## Support
For issues and questions, please create an issue in the GitHub repository.
