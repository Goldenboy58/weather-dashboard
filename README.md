##  Weather Dashboard 

A Kubernetes-based weather dashboard project that provides real-time weather data through a backend API and a frontend UI. Designed for scalability, portability, and cloud-native deployment.

---

## 🏗️ Architecture
Client → Frontend (React/Vue) → FastAPI Backend → External Weather API  
Stack:
- **Frontend** — User interface for weather visualization
- **FastAPI** — REST API for serving weather data
- **Kubernetes** — Orchestrates all containers
- **Secrets** — API keys stored securely in `weather-secret.yaml`
- **HPA** — Autoscaling based on CPU/memory usage

---

## 📂 Project Structure


weather-dashboard/
├── frontend/                # UI code
│   ├── src/
│   └── Dockerfile
├── backend/                 # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── k8s-manifests/           # Kubernetes YAML files
│   ├── frontend.yaml
│   ├── backend.yaml
│   └── weather-secret.yaml
└── README.md                # Project documentation


---

##  Getting Started
1. **Build and push Docker images**
   ```bash
   docker build -t <your-registry>/weather-frontend ./frontend
   docker build -t <your-registry>/weather-backend ./backend
   docker push <your-registry>/weather-frontend
   docker push <your-registry>/weather-backend

2.**Deploy to Kubernetes**

```bash
kubectl apply -f k8s-manifests/backend.yaml
kubectl apply -f k8s-manifests/frontend.yaml
kubectl apply -f k8s-manifests/weather-secret.yaml

3.** Verify pods and services**
```bash
kubectl get pods
kubectl get svc

4. **Test the API**
```bash
curl -X GET http://<backend-service>:8000/weather?city=Lagos

       **API Endpoints**

| Endpoint | Method | Description |
| --- | --- | --- |
| ``/health`` | GET | Health check |
| ``/weather`` | GET | Get weather by city |

       **Access URLs**

| Service | URL |
| --- | --- |
| Frontend | http://localhost:30080 |
| Backend | http://localhost:30081 |

        **Skills Practiced**

Containerizing web apps

Autoscaling with HPA

Secure secret management

REST API with FastAPI

Kubernetes deployments and services
