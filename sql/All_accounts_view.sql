-- Transaction Up (TrU)
-- ###################################
WITH Transactions_up AS (
  SELECT
    SUM(Mount) AS Mount_transaction_up,
    Id_account_upper AS Id_account_upper_transaction_up
  FROM
    `econometrics-500823.DB_prod.Transaction`
  WHERE
    Status = "available"
      AND
    Id IS NOT NULL
  GROUP BY
    Id_account_upper
),
-- Transaction Less (TrL)
-- ###################################
Transactions_less AS (
  SELECT
    SUM(Mount) AS Mount_transaction_less,
    Id_account_less AS Id_account_less_transaction_less
  FROM
    `econometrics-500823.DB_prod.Transaction`
  WHERE
    Status = "available"
      AND
    Id IS NOT NULL
  GROUP BY
    Id_account_less
),
-- Accounts (Ac)
-- ###################################
Account_valid AS (
  SELECT
    Id AS Id_account,
    Name AS Name_account,
    Type AS Type_account,
    Init_balance AS Init_balance_account,
    SAFE_CAST(R_date AS DATE) AS R_date_account,
    Status AS Status_account
  FROM
    `econometrics-500823.DB_prod.Account`
  WHERE
    Status = "available"
      AND
    Id IS NOT NULL
)
-- Accounts (Ac)
-- Transaction Up (TrU)
-- Transaction Less (TrL)
-- ###################################
SELECT
  Ac.Name_account,
  Ac.Type_account,
  Ac.Init_balance_account,
  COALESCE(TrU.Mount_transaction_up,0) AS Mount_transaction_up,
  COALESCE(TrL.Mount_transaction_less,0) AS transaction_less,
  COALESCE(
    Ac.Init_balance_account + COALESCE(TrU.Mount_transaction_up,0) - COALESCE(TrL.Mount_transaction_less,0),
    0) AS Balance_account,
  Ac.R_date_account
FROM
  Account_valid Ac
LEFT JOIN
  Transactions_up TrU ON Ac.Id_account = TrU.Id_account_upper_transaction_up
LEFT JOIN
  Transactions_less TrL ON Ac.Id_account = TrL.Id_account_less_transaction_less