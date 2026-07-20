<div align="center">

# 💰 Econometrics — Personal Financial Self-Management System

**Comprehensive BI and Data Engineering solution for exact personal budget control**
*Mobile Capture · Cloud Storage · ETL Automation · Interactive Visualization*

[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com)
[![BigQuery](https://img.shields.io/badge/BigQuery-669DF6?style=for-the-badge&logo=googlebigquery&logoColor=white)](https://cloud.google.com/bigquery)
[![AppSheet](https://img.shields.io/badge/AppSheet-00897B?style=for-the-badge&logo=google&logoColor=white)](https://about.appsheet.com)
[![Apps Script](https://img.shields.io/badge/Apps_Script-4285F4?style=for-the-badge&logo=googleappsscript&logoColor=white)](https://developers.google.com/apps-script)
[![Looker Studio](https://img.shields.io/badge/Looker_Studio-4285F4?style=for-the-badge&logo=looker&logoColor=white)](https://lookerstudio.google.com)

</div>

---

## 📌 Project Description

**Econometrics** is a comprehensive Business Intelligence (BI) and Data Engineering solution designed to keep exact control of a personal budget. The system covers the entire data lifecycle: from capture via a custom mobile application to transformation, cloud storage, and interactive visualization.

The main objective is to solve the problem of personal finance tracking through an automated ecosystem. It allows recording expenses and income in real-time through a user-friendly interface (App) and transforming that raw data into actionable knowledge via an analytical dashboard, facilitating budget control, the prevention of micro-expenses, and the analysis of accounting closes.

> 💡 **Project status:** ✅ Completed

---

## 🖼️ Dashboard Preview

> 🔒 **Privacy Note:** Since the system handles real and personal financial data, the public link to the interactive dashboard is not available. Below are screenshots with data and figures blurred/masked to protect privacy, keeping the visual and analytical structure visible.

![Dashboard Preview 1](assets/Looker_1.png)
![Dashboard Preview 2](assets/Looker_2.png)

---

## 🏗️ Architecture Diagram

![Architecture Diagram](docs/Architecture_diagram.png)

## ⚙️ Data Flow Pipeline

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐     ┌─────────────┐     ┌─────────────┐
│    FRONTEND     │────▶│     STORAGE      │────▶│  ETL / BATCH   │────▶│  WAREHOUSE  │────▶│      BI     │
│   (AppSheet)    │     │(Google Workspace)│     │ (Apps Script)  │     │ (BigQuery)  │     │(Looker Studio)│
│                 │     │                  │     │                │     │             │     │             │
│ · Econometrics  │     │ · DB_config      │     │ · Batch Script │     │ · CTEs      │     │ · Dashboard │
│   App           │     │ · DB_prod        │     │   (closes)     │     │ · Spine     │     │ · KPIs      │
│ · Daily entry   │     │ · Google Sheets  │     │ · Backup Script│     │   Tables    │     │ · Dynamic   │
│                 │     │                  │     │                │     │ · OBT model │     │   controls  │
└─────────────────┘     └──────────────────┘     └────────────────┘     └─────────────┘     └─────────────┘
```

The information flow is divided into the following layers:

1. **Frontend / Data Entry (AppSheet):** Mobile interface ("Econometrics App") where the user enters their daily transactions.
2. **Storage (Google Workspace):** Operational database hosted on Google Sheets, logically separated into configuration tables (`DB_config`) and production data (`DB_prod`).
3. **Automation and ETL (Google Apps Script):** Scheduled scripts that transform the information.
   - *Batch Script:* Generates accounting closes and periodic transformations.
   - *Backup Script:* Creates automated security backups (`BACKUP`).
4. **Data Warehouse (Google BigQuery):** Workspace tables are connected to BigQuery, where through views and complex SQL queries (CTEs, Spine Tables), the information is consolidated into a `One Big Table (OBT)` analytical model.
5. **Business Intelligence (Looker Studio):** Consumption of materialized BigQuery views to feed the interactive dashboard.

---

## 📊 KPIs and Visualization

The dashboard is designed to offer a quick and clear reading of the financial status. The main Key Performance Indicators (KPIs) include:

| KPI | Description |
|-----|-------------|
| 💵 **Total Income** | Sum of capital inflows in the selected period |
| 💸 **Total Expense** | Sum of outflows and fixed/variable expenses |
| 📈 **Total Balance** | Net cash flow and financial health of the accounts (`Init_balance` + Income − Expenses) |

---

## 🛠️ Tech Stack and Data Modeling

| Categoría | Herramienta | Uso |
|-----------|-------------|-----|
| Data Capture | AppSheet | Mobile app for real-time transaction entry |
| Storage | Google Sheets (Workspace) | Operational database (`DB_config`, `DB_prod`) |
| Automation | Google Apps Script | Batch closes and automated backups |
| Data Warehouse | Google BigQuery | SQL transformation and analytical modeling |
| Modeling | CTEs / Spine Tables / OBT | Denormalized One Big Table for fast reads |
| BI | Looker Studio | Interactive dashboard and dynamic controls |

This project demonstrates the advanced use of various technologies to automate manual processes:

* **Advanced SQL:** Use of multiple `WITH` clauses (CTEs) for efficient joins.
* **Date Engineering:** Implementation of master calendar tables (Spine tables generated with `GENERATE_DATE_ARRAY`) to ensure temporal continuity in the charts, even on days without transactions.
* **OBT (One Big Table) Modeling:** Denormalization of multiple catalogs (Accounts, Categories, Alerts) into a single optimized read table to reduce the processing load in Looker Studio.
* **Dynamic Parameterization:** Use of controls and calculated fields with mathematical conditionals (`CASE WHEN`) to allow users to modify the temporal granularity of the charts live.

---

## 🗂️ Repository Structure

```
Econometrics/
│
├── 📁 sql/            # BigQuery queries and views
│   └── ...
│
├── 📁 scripts/         # Automation code (Google Apps Script) for closes and backups
│   └── ...
│
├── 📁 docs/            # Technical documentation (incl. Data Dictionary)
│   └── Architecture_diagram.png
│
├── 📁 assets/          # Dashboard images and screenshots
│   ├── Looker_1.png
│   └── Looker_2.png
│
└── README.md
```

---

## 👤 Autor

**Data Analyst | BI & Data Engineering**

---

<div align="center">
  <sub>⭐ Si este proyecto te fue útil, considera dejar una estrella en el repositorio</sub>
</div>

# ━

### Español

<div align="center">

# 💰 Econometrics — Sistema de Autogestión Financiera Personal

**Solución integral de BI e Ingeniería de Datos para llevar un control exacto del presupuesto personal**
*Captura Móvil · Almacenamiento en la Nube · Automatización ETL · Visualización Interactiva*

[![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com)
[![BigQuery](https://img.shields.io/badge/BigQuery-669DF6?style=for-the-badge&logo=googlebigquery&logoColor=white)](https://cloud.google.com/bigquery)
[![AppSheet](https://img.shields.io/badge/AppSheet-00897B?style=for-the-badge&logo=google&logoColor=white)](https://about.appsheet.com)
[![Apps Script](https://img.shields.io/badge/Apps_Script-4285F4?style=for-the-badge&logo=googleappsscript&logoColor=white)](https://developers.google.com/apps-script)
[![Looker Studio](https://img.shields.io/badge/Looker_Studio-4285F4?style=for-the-badge&logo=looker&logoColor=white)](https://lookerstudio.google.com)

</div>

---

## 📌 Descripción del Proyecto

**Econometrics** es una solución integral de Inteligencia de Negocios (BI) e Ingeniería de Datos diseñada para llevar un control exacto del presupuesto personal. El sistema abarca el ciclo de vida completo de los datos: desde la captura mediante una aplicación móvil personalizada, hasta la transformación, almacenamiento en la nube y visualización interactiva.

El objetivo principal es resolver el problema del seguimiento de finanzas personales mediante un ecosistema automatizado. Permite registrar gastos e ingresos en tiempo real a través de una interfaz amigable (App) y transformar esos datos crudos en conocimiento accionable mediante un dashboard analítico, facilitando el control de presupuestos, la prevención de gastos hormiga y el análisis de cierres contables.

> 💡 **Estado del proyecto:** ✅ Completado

---

## 🖼️ Vista del Dashboard

> 🔒 **Nota sobre Privacidad:** Dado que el sistema maneja datos financieros reales y personales, el enlace público al dashboard interactivo no está disponible. A continuación se muestran capturas de pantalla con los datos y cifras difuminadas/enmascaradas para proteger la privacidad, manteniendo visible la estructura visual y analítica.

![Dashboard Preview 1](assets/Looker_1.png)
![Dashboard Preview 2](assets/Looker_2.png)

---

## 🏗️ Diagrama de Arquitectura

![Diagrama de Arquitectura](docs/Architecture_diagram.png)

## ⚙️ Pipeline de Flujo de Datos

```
┌─────────────────┐     ┌──────────────────┐     ┌────────────────┐     ┌─────────────┐     ┌─────────────┐
│    FRONTEND     │────▶│    STORAGE       │────▶│  ETL / BATCH   │────▶│  WAREHOUSE  │────▶│      BI     │
│   (AppSheet)    │     │(Google Workspace)│     │ (Apps Script)  │     │ (BigQuery)  │     │(Looker Studio)│
│                 │     │                  │     │                │     │             │     │             │
│ · Econometrics  │     │ · DB_config      │     │ · Batch Script │     │ · CTEs      │     │ · Dashboard │
│   App           │     │ · DB_prod        │     │   (cierres)    │     │ · Spine     │     │ · KPIs      │
│ · Registro      │     │ · Google Sheets  │     │ · Backup Script│     │   Tables    │     │ · Controles │
│   diario        │     │                  │     │                │     │ · Modelo OBT│     │   dinámicos │
└─────────────────┘     └──────────────────┘     └────────────────┘     └─────────────┘     └─────────────┘
```

El flujo de información se divide en las siguientes capas:

1. **Frontend / Data Entry (AppSheet):** Interfaz móvil ("Econometrics App") donde el usuario ingresa sus transacciones diarias.
2. **Storage (Google Workspace):** Base de datos operacional alojada en Google Sheets, separada lógicamente en tablas de configuración (`DB_config`) y datos de producción (`DB_prod`).
3. **Automatización y ETL (Google Apps Script):** Scripts programados que transforman la información.
   - *Batch Script:* Genera cierres contables y transformaciones periódicas.
   - *Backup Script:* Crea respaldos automatizados de seguridad (`BACKUP`).
4. **Data Warehouse (Google BigQuery):** Las tablas de Workspace se conectan a BigQuery, donde mediante vistas y consultas SQL complejas (CTEs, Spine Tables) se consolida la información en un modelo analítico `One Big Table (OBT)`.
5. **Business Intelligence (Looker Studio):** Consumo de las vistas materializadas de BigQuery para alimentar el dashboard interactivo.

---

## 📊 KPIs y Visualización

El dashboard está diseñado para ofrecer una lectura rápida y clara del estado financiero. Los indicadores clave de rendimiento (KPIs) principales incluyen:

| KPI | Descripción |
|-----|-------------|
| 💵 **Ingreso Total** | Sumatoria de entradas de capital en el periodo seleccionado |
| 💸 **Gasto Total** | Sumatoria de salidas y gastos fijos/variables |
| 📈 **Balance Total** | Flujo de caja neto y salud financiera de las cuentas (`Init_balance` + Ingresos − Gastos) |

---

## 🛠️ Stack Tecnológico y Modelado de Datos

| Categoría | Herramienta | Uso |
|-----------|-------------|-----|
| Captura de Datos | AppSheet | App móvil para registro de transacciones en tiempo real |
| Almacenamiento | Google Sheets (Workspace) | Base de datos operacional (`DB_config`, `DB_prod`) |
| Automatización | Google Apps Script | Cierres por lote y backups automatizados |
| Data Warehouse | Google BigQuery | Transformación SQL y modelado analítico |
| Modelado | CTEs / Spine Tables / OBT | Tabla única desnormalizada para lecturas rápidas |
| BI | Looker Studio | Dashboard interactivo y controles dinámicos |

Este proyecto demuestra el uso avanzado de diversas tecnologías para automatizar procesos manuales:

* **SQL Avanzado:** Uso de múltiples `WITH` (CTEs) para uniones eficientes.
* **Ingeniería de Fechas:** Implementación de tablas maestras de calendario (Spine tables generadas con `GENERATE_DATE_ARRAY`) para garantizar la continuidad temporal en las gráficas, incluso en días sin transacciones.
* **Modelado OBT (One Big Table):** Desnormalización de múltiples catálogos (Cuentas, Categorías, Alertas) en una única tabla de lectura optimizada para reducir la carga de procesamiento en Looker Studio.
* **Parametrización Dinámica:** Uso de controles y campos calculados con condicionales matemáticas (`CASE WHEN`) para permitir a los usuarios modificar la granularidad temporal de los gráficos en vivo.

---

## 🗂️ Estructura del Repositorio

```
Econometrics/
│
├── 📁 sql/            # Consultas y vistas de BigQuery
│   └── ...
│
├── 📁 scripts/         # Código de automatización (Google Apps Script) para cierres y backups
│   └── ...
│
├── 📁 docs/            # Documentación técnica (incl. Diccionario de Datos)
│   └── Architecture_diagram.png
│
├── 📁 assets/          # Imágenes y capturas del dashboard
│   ├── Looker_1.png
│   └── Looker_2.png
│
└── README.md
```

---

## 👤 Autor

**Analista de Datos | BI & Ingeniería de Datos**

---

<div align="center">
  <sub>⭐ Si este proyecto te fue útil, considera dejar una estrella en el repositorio</sub>
</div>
