import { Order } from '@/payload-types'
import React from 'react'
import { GenericHeading, GenericParagraph } from '../Generic'
import dayjs from 'dayjs'

const UserOrders = ({ orders }: { orders: Order[] }) => {
  const statusColors = {
    pending: 'bg-orange-500',
    processing: 'bg-yellow-500',
    shipped: 'bg-blue-500',
    delivered: 'bg-green-500',
    returned: 'bg-pink-500',
    cancelled: 'bg-red-500',
  }

  const statusNameInBg = {
    pending: 'Очаква обработка',
    processing: 'Обработва се',
    shipped: 'Изпратена',
    delivered: 'Доставена',
    returned: 'Върната',
    cancelled: 'Отказана',
  }

  const ordersContent = orders.map((order) => {
    const orderNumber = order.orderNumber
    const orderStatus = order.status
    const orderDate = order.orderDate
    const orderProducts = order.items

    const productsContent = orderProducts.map((product) => {
      return (
        <div
          key={product.id}
          className="w-full flex flex-col gap-s rounded-[12px] bg-brown border-[2px] border-white py-2"
        >
          <GenericHeading
            headingType="h5"
            fontStyle="font-sansation font-[700]"
            textColor="text-white"
            extraClass="text-center"
          >
            <h2>{product.productTitle}</h2>
          </GenericHeading>
          <GenericHeading
            headingType="h5"
            fontStyle="font-sansation font-[700]"
            textColor="text-white"
            extraClass="text-center"
          >
            <h2>Количество: {product.quantity}</h2>
          </GenericHeading>
        </div>
      )
    })

    return (
      <li key={order.id} className="w-full">
        <div className="w-full p-2 border-[1px] border-brown/80 rounded-[16px] flex flex-col gap-s bg-brown/20">
          <div className="w-full flex flex-col gap-s">
            <div className="w-full flex flex-col gap-s">
              <GenericHeading
                headingType="h5"
                fontStyle="font-sansation font-[700]"
                textColor="text-brown"
                extraClass="text-center border-b-[1px] border-b-brown/80 pb-1"
              >
                <h2>
                  <span>Поръчка</span>{' '}
                  <span className="font-bold text-bordo">
                    <strong>No: {orderNumber}</strong>
                  </span>
                </h2>
              </GenericHeading>

              <div className="flex items-center justify-center gap-2">
                <GenericHeading
                  headingType="h5"
                  fontStyle="font-sansation font-[700]"
                  textColor="text-brown"
                  extraClass="text-center"
                >
                  <h2>
                    Статус:{' '}
                    <span className="font-bold text-bordo">
                      <strong>{statusNameInBg[orderStatus as keyof typeof statusNameInBg]}</strong>
                    </span>
                  </h2>
                </GenericHeading>

                <div
                  className={`w-[32px] h-[32px] md:w-[40px] md:h-[40px] border-[1px] border-white ${statusColors[orderStatus as keyof typeof statusColors]} rounded-full`}
                ></div>
              </div>

              <div className="w-full flex flex-col gap-s">{productsContent}</div>

              <div className="w-full mt-auto">
                <GenericHeading
                  headingType="h5"
                  fontStyle="font-sansation font-[700]"
                  textColor="text-brown"
                  extraClass="text-center"
                >
                  <h2>
                    Дата:{' '}
                    <span className="font-bold text-bordo">
                      <strong>{dayjs(orderDate).format('DD-MM-YYYY')}</strong>
                    </span>
                  </h2>
                </GenericHeading>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  })

  return (
    <div className="w-full flex flex-col gap-m">
      <div className="w-full flex flex-col gap-s">
        <GenericHeading
          headingType="h4"
          fontStyle="font-sansation font-[700]"
          textColor="text-bordo"
          extraClass="border-b-[1px] border-b-bordo/80 text-center"
        >
          <h2>Продукти</h2>
        </GenericHeading>

        <div>
          <GenericParagraph
            fontStyle="font-sansation font-[400]"
            textColor="text-brown"
            extraClass="text-center"
          >
            Тук може да проследите статуса на вашите поръчки, всяка поръчка ще бъде обновявана в
            реално време, при смяна на статус
          </GenericParagraph>
        </div>
      </div>

      {orders.length === 0 && (
        <GenericHeading
          headingType="h5"
          fontStyle="font-sansation font-[700]"
          textColor="text-bordo"
          extraClass="text-center"
        >
          <h2>Нямате текущи поръчки</h2>
        </GenericHeading>
      )}

      {orders.length > 0 && <ul className="w-full flex flex-col gap-m">{ordersContent}</ul>}
    </div>
  )
}

export default UserOrders
