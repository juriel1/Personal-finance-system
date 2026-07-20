# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ENGLISH
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<details>
# Data Structure (Data Dictionary)

This document describes the schema of the tables used in the system's databases, divided into configuration tables (`DB_Config.xlsx`) and production tables (`DB_Prod.xlsx`).

## Database: Production (DB_Prod.xlsx)

### Table: `User`
Registry of the system's users.

| Column | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Unique identifier for the user. |
| `Name` | STRING | - | Full name of the user. |
| `Mail` | STRING | - | Contact email address. |
| `R_date` | DATE | - | Registration date in the system. |

---

### Table: `Account`
Catalog of financial accounts registered by users.

| Column | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Unique identifier for the account. |
| `Name` | STRING | - | Assigned name for the account. |
| `Type` | STRING | - | Account type (related to the `Types_account` catalog). |
| `Init_balance` | FLOAT | - | Initial balance of the account. |
| `R_date` | DATE | - | Registration date of the account. |
| `Status` | STRING | - | Account status (related to `Status_general`). |
| `Id_user` | STRING | FK | ID of the user who owns the account (relation to `User`). |

---

### Table: `Category`
Catalog to group, classify, and budget transactions.

| Column | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Unique identifier for the category. |
| `Name` | STRING | - | Descriptive name of the category. |
| `Type` | STRING | - | General classification (related to `Types_category`). |
| `Max_m` | FLOAT | - | Maximum monthly spending limit established (budget). |
| `Status` | STRING | - | Category status (related to `Status_general`). |
| `Id_user` | STRING | FK | ID of the user who created the category (relation to `User`). |

---

### Table: `Transaction`
Stores the detailed record of each financial movement, whether it is an income or an expense.

| Column | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Unique identifier for the transaction. |
| `Name` | STRING | - | Description or concept of the movement. |
| `Date_` | DATE | - | Date when the transaction was made. |
| `Mount` | FLOAT | - | Exact transaction amount. |
| `Status` | STRING | - | Current status of the transaction (related to `Status_general`). |
| `Id_user` | STRING | FK | ID of the user who made the transaction (relation to `User`). |
| `Id_account_upper` | STRING | FK | ID of the main account involved (relation to `Account`). |
| `Id_account_less` | STRING | FK | ID of the secondary account (relation to `Account`). |
| `Id_category` | STRING | FK | ID of the transaction category (relation to `Category`). |
| `Id_alert` | STRING | FK | ID of the associated alert (relation to `Alerts`). |

---

### Table: `Alerts`
Record of scheduled or generated alerts for transactions.

| Column | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Unique identifier for the alert. |
| `Date_` | DATE | - | Scheduled or trigger date of the alert. |
| `Status` | STRING | - | Alert status (related to `Status_general`). |
| `Id_category` | STRING | FK | ID of the category associated with the alert (relation to `Category`). |

---

## Database: Configuration (DB_Config.xlsx)
*These tables act as catalogs or fixed value domains to maintain data integrity.*

### Table: `Status_general`
| Column | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `Status_g` | STRING | PK | General statuses allowed in the system (e.g., *available*, *pending*). |

---

### Table: `Types_account`
| Column | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `Types_account` | STRING | PK | Allowed account types (e.g., Credit, Debit). |

---

### Table: `Types_category`
| Column | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `Types_category` | STRING | PK | Allowed category types. |

> **Note on keys:** 
> * **PK** = Primary Key. Unique and unrepeatable identifier.
> * **FK** = Foreign Key. Field that connects to the primary key of another table.
</details>

<br><br>

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ESPAÑOL
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<details>
# Estructura de Datos (Data Dictionary)

Este documento describe el esquema de las tablas utilizadas en las bases de datos del sistema, divididas en las tablas de configuración (`DB_Config.xlsx`) y las tablas de producción (`DB_Prod.xlsx`).

## Base de Datos: Producción (DB_Prod.xlsx)

### Tabla: `User`
Registro de los usuarios del sistema.

| Columna | Tipo de Dato | Llave | Descripción |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Identificador único del usuario. |
| `Name` | STRING | - | Nombre completo del usuario. |
| `Mail` | STRING | - | Correo electrónico de contacto. |
| `R_date` | DATE | - | Fecha de registro en el sistema. |

---

### Tabla: `Account`
Catálogo de las cuentas financieras registradas por los usuarios.

| Columna | Tipo de Dato | Llave | Descripción |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Identificador único de la cuenta. |
| `Name` | STRING | - | Nombre asignado a la cuenta. |
| `Type` | STRING | - | Tipo de cuenta (relacionado con el catálogo `Types_account`). |
| `Init_balance` | FLOAT | - | Saldo inicial de la cuenta. |
| `R_date` | DATE | - | Fecha de registro de la cuenta. |
| `Status` | STRING | - | Estado de la cuenta (relacionado con `Status_general`). |
| `Id_user` | STRING | FK | ID del usuario propietario de la cuenta (relación con `User`). |

---

### Tabla: `Category`
Catálogo para agrupar, clasificar y presupuestar las transacciones.

| Columna | Tipo de Dato | Llave | Descripción |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Identificador único de la categoría. |
| `Name` | STRING | - | Nombre descriptivo de la categoría. |
| `Type` | STRING | - | Clasificación general (relacionado con `Types_category`). |
| `Max_m` | FLOAT | - | Límite máximo de gasto mensual establecido (presupuesto). |
| `Status` | STRING | - | Estado de la categoría (relacionado con `Status_general`). |
| `Id_user` | STRING | FK | ID del usuario que creó la categoría (relación con `User`). |

---

### Tabla: `Transaction`
Almacena el registro detallado de cada movimiento financiero, ya sea un ingreso o un gasto.

| Columna | Tipo de Dato | Llave | Descripción |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Identificador único de la transacción. |
| `Name` | STRING | - | Descripción o concepto del movimiento. |
| `Date_` | DATE | - | Fecha en la que se realizó la transacción. |
| `Mount` | FLOAT | - | Monto exacto de la transacción. |
| `Status` | STRING | - | Estado actual de la transacción (relacionado con `Status_general`). |
| `Id_user` | STRING | FK | ID del usuario que realizó la transacción (relación con `User`). |
| `Id_account_upper` | STRING | FK | ID de la cuenta principal involucrada (relación con `Account`). |
| `Id_account_less` | STRING | FK | ID de la cuenta secundaria (relación con `Account`). |
| `Id_category` | STRING | FK | ID de la categoría del movimiento (relación con `Category`). |
| `Id_alert` | STRING | FK | ID de la alerta asociada (relación con `Alerts`). |

---

### Tabla: `Alerts`
Registro de alertas programadas o generadas para las transacciones.

| Columna | Tipo de Dato | Llave | Descripción |
| :--- | :--- | :---: | :--- |
| `Id` | STRING | PK | Identificador único de la alerta. |
| `Date_` | DATE | - | Fecha programada o de disparo de la alerta. |
| `Status` | STRING | - | Estado de la alerta (relacionado con `Status_general`). |
| `Id_category` | STRING | FK | ID de la categoría asociada a la alerta (relación con `Category`). |

---

## Base de Datos: Configuración (DB_Config.xlsx)
*Estas tablas actúan como catálogos o dominios de valores fijos para mantener la integridad de los datos.*

### Tabla: `Status_general`
| Columna | Tipo de Dato | Llave | Descripción |
| :--- | :--- | :---: | :--- |
| `Status_g` | STRING | PK | Estados generales permitidos en el sistema (ej. *available*, *pending*). |

---

### Tabla: `Types_account`
| Columna | Tipo de Dato | Llave | Descripción |
| :--- | :--- | :---: | :--- |
| `Types_account` | STRING | PK | Tipos de cuenta permitidos (ej. Crédito, Débito). |

---

### Tabla: `Types_category`
| Columna | Tipo de Dato | Llave | Descripción |
| :--- | :--- | :---: | :--- |
| `Types_category` | STRING | PK | Tipos de categoría permitidos. |

> **Nota sobre las llaves:** 
> * **PK** = Primary Key (Llave Primaria). Identificador único e irrepetible.
> * **FK** = Foreign Key (Llave Foránea). Campo que se conecta con la llave primaria de otra tabla.
</details>