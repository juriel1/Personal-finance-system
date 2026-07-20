//---------------------------------------------------------- FUNC INIT ----------------------------------------------------------
function CierreCon() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaCuentas = libro.getSheetByName("Account");
  const hojaTransacciones = libro.getSheetByName("Transaction");
  
  if (!hojaCuentas || !hojaTransacciones) {
    throw new Error("No se encontraron las pestañas 'Account' o 'Transaction'.");
  }

  let datosCuentas = hojaCuentas.getDataRange().getValues();
  let datosTransacciones = hojaTransacciones.getDataRange().getValues();

  const headersCuentas = datosCuentas[0];
  const headersTrans = datosTransacciones[0];

  // --- CONFIGURACIÓN DE COLUMNAS ---
  const colCuentas_Id = "Id"; 
  const colCuentas_InitBalance = "Init_balance";
  const colCuentas_RDate = "R_date";
  const colCuentas_Status = "Status";
  
  const colTrans_IdCuentaPositiva = "Id_account_upper";
  const colTrans_IdCuentaNegativa = "Id_account_less";
  const colTrans_Monto = "Mount";         
  const colTrans_Estado = "Status";       
  // ---

  const idxCuentas_Id = headersCuentas.indexOf(colCuentas_Id);
  const idxCuentas_Init = headersCuentas.indexOf(colCuentas_InitBalance);
  const idxCuentas_RDate = headersCuentas.indexOf(colCuentas_RDate);
  const idxCuentas_Status = headersCuentas.indexOf(colCuentas_Status);
  
  const idxTrans_CuentaPos = headersTrans.indexOf(colTrans_IdCuentaPositiva);
  const idxTrans_CuentaNeg = headersTrans.indexOf(colTrans_IdCuentaNegativa);
  const idxTrans_Monto = headersTrans.indexOf(colTrans_Monto);
  const idxTrans_Estado = headersTrans.indexOf(colTrans_Estado);

  if (idxCuentas_Id === -1 || idxCuentas_Init === -1 || idxCuentas_RDate === -1 || idxCuentas_Status === -1) {
    throw new Error("No se encontraron todas las columnas de la pestaña 'Account' (Id, Init_balance, R_date, Status).");
  }
  if (idxTrans_CuentaPos === -1 || idxTrans_CuentaNeg === -1 || idxTrans_Monto === -1 || idxTrans_Estado === -1) {
    throw new Error("No se encontraron todas las columnas de la pestaña 'Transaction'.");
  }

  let filasDuplicadas = [];
  let fechaActual = new Date();
  
  let maxId = 0;
  let esNumerico = true;
  for (let i = 1; i < datosCuentas.length; i++) {
    let idVal = datosCuentas[i][idxCuentas_Id];
    if (idVal !== "" && idVal !== null && idVal !== undefined) {
      let num = Number(idVal);
      if (isNaN(num)) {
        esNumerico = false;
      } else {
        if (num > maxId) maxId = num;
      }
    }
  }

  let limiteOriginal = datosCuentas.length;
  let contadorDuplicados = 0;

  for (let i = 1; i < limiteOriginal; i++) {
    let estado = datosCuentas[i][idxCuentas_Status];
    
    if (estado === "available") {
      
      let filaCopia = [...datosCuentas[i]]; 
      
      filaCopia[idxCuentas_Status] = "bloq";
      
      let idOriginal = datosCuentas[i][idxCuentas_Id];
      let nuevoId;
      if (esNumerico) {
        maxId++;
        nuevoId = maxId;
      } else {
        contadorDuplicados++;
        nuevoId = idOriginal + "_BLQ_" + Utilities.formatDate(fechaActual, Session.getScriptTimeZone(), "yyyyMMdd") + "_" + contadorDuplicados;
      }
      filaCopia[idxCuentas_Id] = nuevoId;
      
      filasDuplicadas.push(filaCopia);
      
      datosCuentas[i][idxCuentas_RDate] = fechaActual;
    }
  }

  datosCuentas = datosCuentas.concat(filasDuplicadas);
  // =========================================================================

  let sumasPorCuenta = {};

  for (let i = 1; i < datosTransacciones.length; i++) {
    let estado = datosTransacciones[i][idxTrans_Estado];
    let monto = parseFloat(datosTransacciones[i][idxTrans_Monto]) || 0;
    
    let idCuentaPos = datosTransacciones[i][idxTrans_CuentaPos];
    let idCuentaNeg = datosTransacciones[i][idxTrans_CuentaNeg];

    if (estado !== "Bloq") {
      
      if (idCuentaPos !== "" && idCuentaPos !== null) {
        if (!sumasPorCuenta[idCuentaPos]) sumasPorCuenta[idCuentaPos] = 0;
        sumasPorCuenta[idCuentaPos] += monto;
      }

      if (idCuentaNeg !== "" && idCuentaNeg !== null) {
        if (!sumasPorCuenta[idCuentaNeg]) sumasPorCuenta[idCuentaNeg] = 0;
        sumasPorCuenta[idCuentaNeg] -= monto;
      }
    }
  }

  for (let i = 1; i < datosCuentas.length; i++) {
    let idCuenta = datosCuentas[i][idxCuentas_Id];
    let balanceInicial = parseFloat(datosCuentas[i][idxCuentas_Init]) || 0;
    let estadoCuenta = datosCuentas[i][idxCuentas_Status];

    if (estadoCuenta === "available" && sumasPorCuenta[idCuenta] !== undefined) {
      datosCuentas[i][idxCuentas_Init] = balanceInicial + sumasPorCuenta[idCuenta];
    }
  }

  hojaCuentas.getRange(1, 1, datosCuentas.length, datosCuentas[0].length).setValues(datosCuentas);
  
  Logger.log("Cierre de saldos y duplicación de registros históricos ejecutados con éxito.");
}
//---------------------------------------------------------- FUNC END ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------- FUNC INIT ----------------------------------------------------------
function BloqueoTranc() {
  // --- CONFIGURACIÓN DE FECHA LÍMITE AUTOMÁTICA ---
  const hoy = new Date();
  const fechaCierre = Utilities.formatDate(hoy, Session.getScriptTimeZone(), "yyyy-MM-dd");
  // ---
  BloqueoTrancFunc(fechaCierre);
}
//---------------------------------------------------------- FUNC END ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------- FUNC INIT ----------------------------------------------------------
function BloqueoTrancFunc(fechaLimiteStr) {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaTransacciones = libro.getSheetByName("Transaction");

  if (!hojaTransacciones) {
    throw new Error("No se encontró la pestaña 'Transaction'. Verifica el nombre.");
  }
  const fechaLimite = new Date(fechaLimiteStr + "T00:00:00");
  
  if (isNaN(fechaLimite.getTime())) {
    throw new Error("El formato de la fecha límite no es válido. Usa 'AAAA-MM-DD'.");
  }

  let datosTransacciones = hojaTransacciones.getDataRange().getValues();
  const headersTrans = datosTransacciones[0];

  // --- CONFIGURACIÓN DE COLUMNAS ---
  const colTrans_Fecha = "Date";
  const colTrans_Estado = "Status";
  // 

  const idxTrans_Fecha = headersTrans.indexOf(colTrans_Fecha);
  const idxTrans_Estado = headersTrans.indexOf(colTrans_Estado);

  if (idxTrans_Fecha === -1 || idxTrans_Estado === -1) {
    throw new Error("No se encontraron las columnas de 'Fecha' o 'Status' en la hoja.");
  }

  let contadorBloqueados = 0;

  for (let i = 1; i < datosTransacciones.length; i++) {
    let valorCeldaFecha = datosTransacciones[i][idxTrans_Fecha];
    let estadoActual = datosTransacciones[i][idxTrans_Estado];

    let fechaTransaccion = new Date(valorCeldaFecha);

    if (!isNaN(fechaTransaccion.getTime())) {
      
      fechaTransaccion.setHours(0,0,0,0);
      fechaLimite.setHours(0,0,0,0);

      if (fechaTransaccion <= fechaLimite && estadoActual !== "bloq") {
        datosTransacciones[i][idxTrans_Estado] = "bloq";
        contadorBloqueados++;
      }
    }
  }

  if (contadorBloqueados > 0) {
    hojaTransacciones.getRange(1, 1, datosTransacciones.length, datosTransacciones[0].length).setValues(datosTransacciones);
    Logger.log("Se bloquearon con éxito " + contadorBloqueados + " transacciones.");
  } else {
    Logger.log("No se encontraron transacciones activas anteriores a la fecha especificada.");
  }
}
//---------------------------------------------------------- FUNC END ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------- FUNC INIT ----------------------------------------------------------
function LimpiarAlert() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  const hojaCategorias = libro.getSheetByName("Category");
  const hojaTransacciones = libro.getSheetByName("Transaction");
  const hojaAlertas = libro.getSheetByName("Alerts");

  if (!hojaCategorias || !hojaTransacciones || !hojaAlertas) {
    throw new Error("No se encontraron todas las pestañas requeridas ('Category', 'Transaction', 'Alertas').");
  }

  let datosCategorias = hojaCategorias.getDataRange().getValues();
  let datosTransacciones = hojaTransacciones.getDataRange().getValues();
  let datosAlertas = hojaAlertas.getDataRange().getValues();

  const headersCat = datosCategorias[0];
  const headersTrans = datosTransacciones[0];
  const headersAle = datosAlertas[0];

  // --- CONFIGURACIÓN DE NOMBRE DE COLUMNAS ---
  const colCat_Id = "Id";
  const colCat_MaxM = "Max_m";

  const colTrans_IdCat = "Id_category";
  const colTrans_Monto = "Mount";
  const colTrans_Estado = "Status";
  const colTrans_Fecha = "Date";

  const colAle_IdCat = "Id_category";
  const colAle_Estado = "Status";
  // ---

  const idxCat_Id = headersCat.indexOf(colCat_Id);
  const idxCat_MaxM = headersCat.indexOf(colCat_MaxM);

  const idxTrans_IdCat = headersTrans.indexOf(colTrans_IdCat);
  const idxTrans_Monto = headersTrans.indexOf(colTrans_Monto);
  const idxTrans_Estado = headersTrans.indexOf(colTrans_Estado);
  const idxTrans_Fecha = headersTrans.indexOf(colTrans_Fecha);

  const idxAle_IdCat = headersAle.indexOf(colAle_IdCat);
  const idxAle_Estado = headersAle.indexOf(colAle_Estado);

  if (idxCat_Id === -1 || idxTrans_IdCat === -1 || idxAle_IdCat === -1) {
    throw new Error("No se pudieron mapear las columnas esenciales de ID. Verifica los encabezados.");
  }

  const hoy = new Date();
  const mesActual = hoy.getMonth(); 
  const anioActual = hoy.getFullYear();

  let currentM_Calculado = {};
  for (let i = 1; i < datosCategorias.length; i++) {
    let idCat = datosCategorias[i][idxCat_Id];
    currentM_Calculado[idCat] = 0;
  }

  for (let i = 1; i < datosTransacciones.length; i++) {
    let idCat = datosTransacciones[i][idxTrans_IdCat];
    let monto = parseFloat(datosTransacciones[i][idxTrans_Monto]) || 0;
    let estado = datosTransacciones[i][idxTrans_Estado];
    let fechaTrans = new Date(datosTransacciones[i][idxTrans_Fecha]);

    if (!isNaN(fechaTrans.getTime()) && estado !== "bloq" && estado !== "Bloqueado") {
      if (fechaTrans.getMonth() === mesActual && fechaTrans.getFullYear() === anioActual) {
        if (currentM_Calculado[idCat] !== undefined) {
          currentM_Calculado[idCat] += monto;
        }
      }
    }
  }

  let categoriasSeguras = {};
  for (let i = 1; i < datosCategorias.length; i++) {
    let idCat = datosCategorias[i][idxCat_Id];
    let maxM = parseFloat(datosCategorias[i][idxCat_MaxM]) || 0;
    let currentM = currentM_Calculado[idCat] || 0;

    if (currentM < maxM) {
      categoriasSeguras[idCat] = true;
    }
  }

  let contadorAlertasLimpiadas = 0;
  for (let i = 1; i < datosAlertas.length; i++) {
    let idCatAlerta = datosAlertas[i][idxAle_IdCat];
    let estadoAlerta = datosAlertas[i][idxAle_Estado];

    if (estadoAlerta === "available" && categoriasSeguras[idCatAlerta] === true) {
      datosAlertas[i][idxAle_Estado] = "bloq"; // Cambiamos el estado para darla por cerrada
      contadorAlertasLimpiadas++;
    }
  }

  if (contadorAlertasLimpiadas > 0) {
    hojaAlertas.getRange(1, 1, datosAlertas.length, datosAlertas[0].length).setValues(datosAlertas);
    Logger.log("Mantenimiento concluido: Se desactivaron con éxito " + contadorAlertasLimpiadas + " alertas.");
  } else {
    Logger.log("Mantenimiento concluido: No se encontraron alertas activas que necesitaran limpieza.");
  }
}
//---------------------------------------------------------- FUNC END ----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------