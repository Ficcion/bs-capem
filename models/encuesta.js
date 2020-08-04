var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var encuestaSchema = new Schema({
  codigo: {
    type: String,
    required: [true, 'El código es oblicatorio.'] },
  numeroEmpleado: {
    type: String,
    required: [true, 'El número de empleado es oblicatorio.'] },
  fecha: {
    type: String,
    required: [true, 'La fecha es obligatoria.'] },
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
  dolorCabeza: {
    type: String,
    required: false },
  dolorAbdominal: {
    type: String,
    required: false },
  dolorMuscular: {
    type: String,
    required: false },
  dolorArticulaciones: {
    type: String,
    required: false },
  debilidadMalestar: {
    type: String,
    required: false, },
  secrecionNasal: {
    type: String,
    required: false },
  dolorGarganta: {
    type: String,
    required: false },
  conjuntivitis: {
    type: String,
    required: false },
  sintomasComplicacion: {
    type: String,
    required: false },
  diabetes: {
    type: String,
    required: false },
  presion: {
    type: String,
    required: false },
  enfermedadCorazon: {
    type: String,
    required: false },
  enfermedadRenal: {
    type: String,
    required: false },
  enfermedadPulmonar: {
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
  sospechosoComplicacion: {
    type: String,
    required: false },
  sospechosoRiesgo: {
    type: String,
    required: false },
}, { collection: 'encuestas' });

module.exports = mongoose.model('Encuesta', encuestaSchema);