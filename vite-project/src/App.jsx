import { useState } from 'react'
import './App.css'
import UploadPage from './components/UploadPage';
import ReceiptPreprocessPage from './components/ReceiptPreprocessPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <UploadPage/>
      <ReceiptPreprocessPage data={{
  account_number: null,
  bill_to: {
    address: null,
    name: 'YOU!',
    parsed_address: null,
    vat_number: null
  },
  cashback: null,
  category: 'Meals & Entertainment',
  created_date: '2023-11-15 04:32:27',
  currency_code: 'USD',
  date: null,
  delivery_date: null,
  discount: null,
  document_reference_number: null,
  document_title: null,
  document_type: 'receipt',
  due_date: null,
  duplicate_of: null,
  external_id: null,
  id: 167596952,
  img_file_name: '167596952.jpg',
  img_thumbnail_url: 'https://scdn.veryfi.com/receipts/bf988f5c6d3413d1/6a7c9e51-2262-4f4d-b8ee-f3608c238c87/thumbnail.jpg?Expires=1700023647&Signature=NMi0GdOTgy1rX6O5x3qXCCWpkMop5F671TuB9V-~Ian~0udn9r17mdb35JmfqLmYBxZbfjfvehY~T1IQUUDOIp4lDONvndfmLvrLRrX8r~E2cXhwtKH~12CMRQfNiWQZ5BnOivR2-kEm0qIdjg1VxUYH3hQ5Sjs8Xq3QLEPzwnIocGui-6yrMViSnqQFrds9C2Dt~2vVrAcySHwQxEhu~RFoBZ79zZ-Syhg951YHC62AkfJ-GMqNk9RhuqQ5LvxBfi19ooewvNB9s74tvWZbH-dm9yKsN1ai8OpEn3f8WnPEf9Yc1CnTLN9FTOHue7ENCFerCx28t2dp51gF8TX~kA__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ',
  img_url: 'https://scdn.veryfi.com/receipts/bf988f5c6d3413d1/6a7c9e51-2262-4f4d-b8ee-f3608c238c87/279e5ad3-0bef-4d90-9ec2-eea078022faa.jpg?Expires=1700023647&Signature=d0~I89Cm2SmV8fiorbLA2RyxAkMpJCdVtgxTluUGVHpDkznzlKARRVov2h5U~MraULPDnRMplmVW~FiJVdHfPuniKpCTsiwIMA2KrBvajpNgxQMc0hkXP~ule-4J1m6IKRr9Cag1BWxroM9qWvz~saUooEwk7hiTzO-yzERmn~NO~j-nYK7TVdfvOKGWX~wGdNI~WMHT1arWBik3Jqp2ulmETo97sQNMAgZZohDLV5USWfrsybWa0ljrhnMEc4WaUwJVOyYKThw-j3~unT6qLyLfugzm7qDTzqMbiqLmnCo8XPEUrFjrjHs5sRoFYyvgiGy5C7DbXQTWWAhvcVXF1Q__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ',
  insurance: null,
  invoice_number: '98',
  is_duplicate: false,
  is_money_in: false,
  line_items: [
    {
      date: null,
      description: 'Counter-Eat In\nDblDbl',
      discount: null,
      discount_rate: null,
      end_date: null,
      id: 732970169,
      order: 0,
      price: null,
      quantity: 1,
      reference: null,
      section: null,
      sku: null,
      start_date: null,
      tags: [],
      tax: null,
      tax_rate: null,
      text: 'Counter-Eat In\n\t2.65\nDblDbl',
      total: 2.65,
      type: 'food',
      unit_of_measure: null,
      upc: null
    },
    {
      date: null,
      description: '98 Meat Pty XChz\nCounter-Eat In',
      discount: null,
      discount_rate: null,
      end_date: null,
      id: 732970170,
      order: 1,
      price: null,
      quantity: 1,
      reference: null,
      section: null,
      sku: null,
      start_date: null,
      tags: [],
      tax: null,
      tax_rate: null,
      text: '98 Meat Pty XChz\t\t88.20\nCounter-Eat In',
      total: 88.2,
      type: 'food',
      unit_of_measure: null,
      upc: null
    }
  ],
  meta: {
    owner: 'andieliu',
    pages: [ [Object] ],
    processed_pages: 1,
    source: 'api',
    source_documents: [ [Object] ],
    total_pages: 1
  },
  notes: null,
  ocr_text: '2004-10-31\t\t8:21 PM\n' +
    '\n' +
    'YOUR GUEST NUMBER IS\n' +
    '\t98\n' +
    'IN-N-OUT BURGER LAS VEGAS EASTERN\n' +
    '2004-10-31\t\t8:21 PM\n' +
    '165 15 98\n' +
    'Cashier: SAM\n' +
    'GUEST #: 98\n' +
    'Counter-Eat In\n' +
    '\t2.65\n' +
    'DblDbl\n' +
    '98 Meat Pty XChz\t\t88.20\n' +
    'Counter-Eat In\t\t90.85\n' +
    'TAX 7.50%\t\t\t6.81\n' +
    'Amount Due\t\t97.66\n' +
    'CASH TENDER\t\t$97.66\n' +
    'Change\t\t\t$.00\n' +
    '2004-10-31\t\t8:21 PM\n' +
    'THANK YOU!',
  order_date: null,
  payment: {
    card_number: null,
    display_name: 'Cash',
    terms: null,
    type: 'cash'
  },
  pdf_url: 'https://scdn.veryfi.com/receipts/bf988f5c6d3413d1/6a7c9e51-2262-4f4d-b8ee-f3608c238c87/5b0613f7-52e6-42eb-b01e-be3c52a17740.pdf?Expires=1700023647&Signature=KB4ITM5h619hHLmnZZoX9Z9pWQdLowcrJb3Q8jNeBp8nfDe4-g7RHuxzVLZwGMTgbYqbtiIVJL4tlzCQpRXLsxFsB875tyUDGq2g3s7RxWcbQj4ElAZhqQfeTJ~AncBczn8SixKZPS2drex2NvBTzf1tLKQcqKBVOAU0roKCQu1ngrU3qsfxVPstF~SrJIug~d3qQ7Jzg7RK3Yvq80LPoVfWubuOUSt0v25wtozcMx7sWjdlEoZADamFvv2rQdG3J35ocYzW5sULBCtt3D0Bumebh2AwJcfNbvGrMjltSKxUL-UjLd57k2pC-rwXsV3p23RvlUsBreD48ZAnq2eWTA__&Key-Pair-Id=APKAJCILBXEJFZF4DCHQ',
  purchase_order_number: null,
  reference_number: 'VBEJF-96952',
  rounding: null,
  service_end_date: null,
  service_start_date: null,
  ship_date: null,
  ship_to: { address: null, name: null, parsed_address: null },
  shipping: null,
  store_number: null,
  subtotal: 90.85,
  tags: [],
  tax: 6.81,
  tax_lines: [ { base: null, name: null, order: 0, rate: 7.5, total: 6.81 } ],
  tip: null,
  total: 97.66,
  total_weight: null,
  tracking_number: null,
  updated_date: '2023-11-15 04:32:27',
  vendor: {
    abn_number: null,
    account_number: null,
    address: null,
    bank_name: null,
    bank_number: null,
    bank_swift: null,
    category: 'Fast Food',
    email: null,
    fax_number: null,
    iban: null,
    lat: null,
    lng: null,
    logo: 'https://cdn.veryfi.com/logos/us/949103001.png',
    name: 'In-N-Out Burger',
    phone_number: '165 15 98',
    raw_address: null,
    raw_name: 'In-N-Out Burger',
    reg_number: null,
    type: 'Fast Food',
    vat_number: null,
    web: null
  }
}}/>
    </>
  )
}

export default App
