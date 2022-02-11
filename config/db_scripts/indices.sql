CREATE UNIQUE INDEX Indice_Aseguradora ON Aseguradora(rif_aseguradora);
CREATE UNIQUE INDEX Indice_Agente_Propio ON Agente_Propio(cedula_agente_propio);
CREATE UNIQUE INDEX Indice_Ejecutivo ON Ejecutivo(cedula_ejecutivo);
CREATE UNIQUE INDEX Indice_Asegurado_Persona_Natural ON Asegurado_Persona_Natural(cedula_asegurado_per_nat);
CREATE UNIQUE INDEX Indice_Asegurado_Persona_Juridica ON Asegurado_Persona_Juridica(rif_asegurado_per_jur);
CREATE UNIQUE INDEX Indice_Poliza ON Poliza(numero_poliza);
CREATE UNIQUE INDEX Indice_Colectivo ON Colectivo(numero_colectivo);
CREATE UNIQUE INDEX Indice_Recibo ON Recibo(numero_recibo);