function generarRespaldoUnico() {
  // --- CONFIGURACIÓN ---
  const idCarpetaRespaldos = "ID";
  
  const nombreRespaldo = "BackUp_DB_Fin";
  // ---------------------

  try {
    const carpetaDestino = DriveApp.getFolderById(idCarpetaRespaldos);
    
    const idBaseDatosActual = SpreadsheetApp.getActiveSpreadsheet().getId();
    const archivoBaseDatos = DriveApp.getFileById(idBaseDatosActual);

    const archivosExistentes = carpetaDestino.getFilesByName(nombreRespaldo);
    
    let eliminados = 0;
    while (archivosExistentes.hasNext()) {
      let archivoViejo = archivosExistentes.next();
      archivoViejo.setTrashed(true);
      eliminados++;
    }
    
    archivoBaseDatos.makeCopy(nombreRespaldo, carpetaDestino);
    
    Logger.log("Respaldo exitoso. Se eliminaron " + eliminados + " archivo(s) anterior(es) y se creó el nuevo Snapshot.");

  } catch (error) {
    Logger.log("Error crítico al intentar respaldar: " + error.toString());
  }
}