import { padding } from '@mui/system'
import { Font, StyleSheet } from '@react-pdf/renderer'

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf' },
    { src: '/fonts/Roboto-Bold.ttf' },
  ],
})

// const styles = StyleSheet.create({
//   col4: { width: '25%' },
//   col8: { width: '75%' },
//   col6: { width: '50%' },
//   mb8: { marginBottom: 8 },
//   mb40: { marginBottom: 40 },
//   overline: {
//     fontSize: 8,
//     marginBottom: 8,
//     fontWeight: 700,
//     textTransform: 'uppercase',
//   },
//   h3: { fontSize: 16, fontWeight: 700 },
//   h4: { fontSize: 13, fontWeight: 700 },
//   body1: { fontSize: 10 },
//   subtitle2: { fontSize: 9, fontWeight: 700 },
//   alignRight: { textAlign: 'right' },
//   page: {
//     padding: '40px 24px 0 24px',
//     fontSize: 9,
//     lineHeight: 1.6,
//     fontFamily: 'Roboto',
//     backgroundColor: '#fff',
//     textTransform: 'capitalize',
//   },
//   footer: {
//     left: 0,
//     right: 0,
//     bottom: 0,
//     padding: 24,
//     margin: 'auto',
//     borderTopWidth: 1,
//     borderStyle: 'solid',
//     position: 'absolute',
//     borderColor: '#DFE3E8',
//   },
//   gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
//   table: { display: 'flex', width: 'auto' },
//   tableHeader: {},
//   tableBody: {},
//   tableRow: {
//     padding: '8px 0',
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderStyle: 'solid',
//     borderColor: '#DFE3E8',
//   },
//   noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
//   tableCell_1: { width: '5%' },
//   tableCell_2: { width: '50%', paddingRight: 16 },
//   tableCell_3: { width: '15%' },
// });

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  col10: { width: '85%' },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 0 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#919EAB',
  },
  h3: { fontSize: 14, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  subtitle1: {
    fontSize: 9,
    fontWeight: 700,
    lineHeight: 1.6,
    color: '#ff5451',
  },
  statusId: {
    backgroundColor: '#F3F3F3',
    color: '#ff5451',
    fontSize: 10,
    fontWeight: 700,
    lineHeight: 1.6,
    padding: '1px 1px',
    borderRadius: '4px',
  },
  subtitle2: { fontSize: 9, fontWeight: 700, lineHeight: 1.6 },
  subtitle4: { fontSize: 12, fontWeight: 700, lineHeight: 1.6 },
  subtitle3: { fontSize: 11, fontWeight: 700, lineHeight: 1.6 },
  alignRight: { textAlign: 'right' },
  paddingPage: { padding: '20px ' },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'Roboto',
    backgroundColor: '#000',
    textTransform: 'capitalize',
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8',
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  Container: { width: '90%' },
  table: { display: 'flex', width: '75%' },
  tableHeader: { padding: '0px 5px' },
  tableBody: { width: '50%', padding: '20px' },
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  border: { border: '1px solid red' },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '5%' },
  tableCell_2: { width: '50%' },
  tableCell_3: { width: '15%' },
  capitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  // tableCell_4: { width: '13%' },
  // tableCell_5: { width: '12%' },
  // tableCell_6: { width: '10%' },
  // tableCell_7: { width: '10%' },
  // tableCell_8: { width: '15%' },
  // tableCell_9: { width: '10%' },
})

export default styles
