// import React from 'react'
import InvoiceDetails from 'src/components/invoice/details'

export default function invoicePage() {
  const currentInvoice = [
    {
      createDate: 'Thu Mar 02 2023 ',
      discount: 10,
      dueDate: ' Sat Mar 25 2023 ',
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
      invoiceFrom: {
        address: '36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836',
        company: 'Grimes Inc',
        email: 'letha_lubowitz24@yahoo.com',
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        name: 'Reece Chung',
        phone: '990-588-5716',
      },
      invoiceNumber: '17052',
      invoiceTo: '17052',
      items: [
        {
          description:
            'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          price: 16.19,
          quantity: 5,
          service: 'ui design',
          title: 'Apply These 7 Secret Techniques To Improve Event',
          total: 16.19,
        },
        {
          description:
            'Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.',
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          price: 35.71,
          quantity: 5,
          service: 'full stack development',
          title: 'Believing These 7 Myths About Event Keeps You From Growing',
          total: 35.71,
        },
      ],
      sent: 1,
      status: 'paid',
      subTotalPrice: 89.09,
      taxes: 5,
      totalPrice: 89.09,
    },
  ]
  return (
    <>
      <InvoiceDetails invoice={currentInvoice} />
    </>
  )
}
