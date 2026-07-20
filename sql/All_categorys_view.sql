-- Transactions (Tr)
-- ############################
WITH Transactions AS (
  SELECT
    Id_category AS Id_category_Transaction,
    SUM(Mount) AS Mount_Transaction
  FROM
    `econometrics-500823.DB_prod.Transaction`
  WHERE
    Status = "available"
      AND
    Id IS NOT NULL
  GROUP BY
    Id_category
),
-- Category (Ca)
-- ############################
Categorys AS (
  SELECT
    Id AS Id_category,
    Name AS Name_category,
    Type AS Type_category,
    Max_m AS Max_m_category,
    Status AS Status_category
  FROM
    `econometrics-500823.DB_prod.Category`
  WHERE
    Id IS NOT NULL
)
-- Transactions (Tr)
-- Category (Ca)
-- ############################
SELECT
  Ca.Name_category,
  Ca.Type_category,
  Ca.Max_m_category,
  COALESCE(Tr.Mount_Transaction,0),
  Ca.Status_category
FROM
  Categorys Ca
LEFT JOIN
  Transactions Tr ON Ca.Id_category = Tr.Id_category_Transaction