# System Diagram

Let's breakdown the system as a whole which has:
1. Frontend: view and interact with logs
2. Backend: serves up the database layer with a RESTFUL interface
3. DB: the database itself

```mermaid
graph TD
  subgraph Ingress
    ingress[Ingress<br/>www.dbeelogs.me]
  end

  subgraph Frontend
    frontend_deploy[Deployment<br/>frontend]
    frontend_svc[Service<br/>frontend]
  end

  subgraph Backend
    backend_deploy[Deployment<br/>backend]
    backend_svc[Service<br/>backend]
  end

  subgraph Database
    db_deploy[Deployment<br/>db]
    db_svc[Service<br/>db]
  end

  ingress -- "/" --> frontend_svc
  ingress -- "/api/" --> backend_svc

  frontend_svc -- ClusterIP --> frontend_deploy
  backend_svc -- ClusterIP --> backend_deploy
  db_svc -- ClusterIP --> db_deploy

  backend_deploy -- "POSTGRES_HOST" --> db_svc
  frontend_deploy -- "VITE_API_URL" --> backend_svc
```