-- CTE with Calendar (Cale)
--######################################
WITH Calendar AS (
  SELECT
    fecha_calendario
  FROM
    `econometrics-500823.DB_prod.dim_calendario`
),
-- CTE with Transactions (Tr)
--######################################
Transacctions AS (
  SELECT 
    Id AS Id_transacction,
    Name AS Name_transacction,
    SAFE_CAST(Date_ as DATE) AS Date_transacction,
    Mount AS Mount_transacction,
    Status AS Status_transacction,
    Id_account_upper AS Id_account_upper_transacction,
    Id_account_less AS Id_account_less_transacction,
    Id_category AS Id_category_transacction,
    Id_alert AS Id_alert_transacction
  FROM
    `econometrics-500823.DB_prod.Transaction`
  WHERE
    Id IS NOT NULL
),
-- CTE with Accounts (Ac)
--######################################
Accounts AS (
  SELECT
    Id AS Id_Account,
    Name AS Name_Account,
    Type AS Type_Account,
    Init_balance AS Init_balance_Account,
    SAFE_CAST(R_date as DATE) AS Date_Account,
    Status AS Status_Account
  FROM
    `econometrics-500823.DB_prod.Account`
  WHERE
    Id IS NOT NULL
),
-- CTE with Categorys (Ca)
--######################################
Categorys AS (
  SELECT
    Id AS Id_Category,
    Name AS Name_Category,
    Type AS Type_Category,
    Max_m AS Max_m_Category,
    Status AS Status_Category
  FROM
    `econometrics-500823.DB_prod.Category`
  WHERE
    Id IS NOT NULL
),
-- CTE with Alerts (Al)
--######################################
Alerts AS (
  SELECT
    Id AS Id_Alert,
    SAFE_CAST(Date_ as DATE) AS Date_Alert
  FROM
    `econometrics-500823.DB_prod.Alerts`
  WHERE
    Id IS NOT NULL
)
-- Query for the main view type OBT
-- CTE with Calendar (Cale)
-- Transactions (Tr)
-- Accounts Up (Acup)
-- Accounts Less (Acless)
-- Categorys (Ca)
-- Alerts (Al)
--######################################

SELECT 
-- Transaction data
  Cale.fecha_calendario,
  COALESCE(Tr.Name_transacction, "N/A") AS Name_transacction,
  COALESCE(Tr.Date_transacction, NULL) AS Date_transacction,
  COALESCE(Tr.Mount_transacction, 0) AS Mount_transacction,
  COALESCE(Tr.Status_transacction, "N/A") AS Status_transacction,
  IF(Tr.Id_account_less_transacction IS NOT NULL, "GASTO", "ABONO") AS Type_transacction,
-- Account Up data
  COALESCE(Acup.Name_Account, "GASTO") AS Name_Account_up,
  COALESCE(Acup.Type_Account, "N/A") AS Type_Account_up,
  COALESCE(Acup.Init_balance_Account, 0) AS Init_balance_Account_up,
  COALESCE(Acup.Date_Account, NULL) AS Date_Account_up,
  COALESCE(Acup.Status_Account, "N/A") AS Status_Account_up,
-- Account Less data
  COALESCE(Acless.Name_Account, "ABONO") AS Name_Account_less,
  COALESCE(Acless.Type_Account, "N/A") AS Type_Account_less,
  COALESCE(Acless.Init_balance_Account, 0) AS Init_balance_Account_less,
  COALESCE(Acless.Date_Account, NULL) AS Date_Account_less,
  COALESCE(Acless.Status_Account, "N/A") AS Status_Account_less,
-- Category data
  COALESCE(Ca.Name_Category,"N/A") AS Name_Category,
  COALESCE(Ca.Type_Category,"N/A") AS Type_Category,
  COALESCE(Ca.Max_m_Category,0) AS Max_m_Category,
  COALESCE(Ca.Status_Category,"N/A") AS Status_Category,
-- Alerts data
  IF(Al.Date_Alert IS NULL, "Not Alert", "This Alert") AS Is_Alert,
  COALESCE(Al.Date_Alert,NULL) AS Date_Alert
FROM
  Calendar Cale
LEFT JOIN
  Transacctions Tr ON Cale.fecha_calendario = Tr.Date_transacction
LEFT JOIN
  Accounts Acup ON Tr.Id_account_upper_transacction = Acup.Id_Account
LEFT JOIN
  Accounts Acless ON Tr.Id_account_less_transacction = Acless.Id_Account
LEFT JOIN
  Categorys Ca ON Tr.Id_category_transacction = Ca.Id_Category
LEFT JOIN
  Alerts Al ON Tr.Id_alert_transacction = Al.Id_Alert