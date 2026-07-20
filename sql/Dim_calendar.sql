SELECT
  fecha AS fecha_calendario,
  EXTRACT(YEAR FROM fecha) AS anio,
  EXTRACT(QUARTER FROM fecha) AS trimestre,
  EXTRACT(MONTH FROM fecha) AS mes_num,
  EXTRACT(WEEK FROM fecha) AS semana_num,
  EXTRACT(DAY FROM fecha) AS dia_del_mes,
  EXTRACT(DAYOFWEEK FROM fecha) AS dia_de_semana_num
FROM 
  UNNEST(GENERATE_DATE_ARRAY('2020-01-01', '2030-12-31', INTERVAL 1 DAY)) AS fecha