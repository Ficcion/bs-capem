var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var encuestaSchema = new Schema({
  codigo: {
    type: String,
    required: [true, 'El código es oblicatorio'] },
  numEmp: {
    type: String,
    required: [true, 'El número de empleado es oblicatorio'] },
  fecha: {
    type: String,
    required: [true, 'La fecha es obligatoria'] },
  fiebre: {
    type: String,
    required: false },
  tos: {
    type: String,
    required: false },
  diarrea: {
    type: String,
    required: false },
  vomito: {
    type: String,
    required: false },
  calosfrios: {
    type: String,
    required: false },
  dlrCabeza: {
    type: String,
    required: false },
  dlrAbdominal: {
    type: String,
    required: false },
  dlrMuscular: {
    type: String,
    required: false },
  dlrArticulaciones: {
    type: String,
    required: false },
  debilidadMal: {
    type: String,
    required: false, },
  secrNasal: {
    type: String,
    required: false },
  dlrGarganta: {
    type: String,
    required: false },
  conjuntivitis: {
    type: String,
    required: false },
  sintomas2: {
    type: String,
    required: false },
  diabetes: {
    type: String,
    required: false },
  presion: {
    type: String,
    required: false },
  enfCorazon: {
    type: String,
    required: false },
  enfRenal: {
    type: String,
    required: false },
  enfPulmonares: {
    type: String,
    required: false },
  cancer: {
    type: String,
    required: false },
  inmunocompromiso: {
    type: String,
    required: false },
  vih: {
    type: String,
    required: false },
  ninguna: {
    type: String,
    required: false },
  secc2Riesgo: {
    type: String,
    required: false },
  secc3Riesgo: {
    type: String,
    required: false },
}, { collection: 'encuestas' });

module.exports = mongoose.model('Encuesta', encuestaSchema);