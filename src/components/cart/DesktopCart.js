import { Fragment } from 'react'
import Box from '@mui/material/Box'
import Image from 'next/image'
import { MdClose } from 'react-icons/md'
import Skeleton from '@mui/material/Skeleton'

function DesktopCart({
  pageLoading,
  // handleAddItems,
  // handleMinusItems,
  // removeCartIdItems,
  // removeCartItems,
  allCartItems,
  totalPrice,
  // handleAddManualItems,
}) {
  const TABLE_HEAD =
    'text-sm text-center py-4 pl-1 uppercase tracking-wide font-semibold'
  const TABLE_DATA = 'text-sm text-center py-4 pl-1 font-normal'
  return (
    <div className="mx-auto my-10 hidden w-full md:container md:block">
      <Box>
        <div className="w-full">
          {/* headings */}
          <div className="grid gap-4 bg-light-grey md:grid-cols-8 lg:grid-cols-8">
            <div />
            <div
              style={{ textAlign: 'left' }}
              className={`${TABLE_HEAD} md:col-span-1 lg:col-span-2`}
            >
              product
            </div>
            <div className={`${TABLE_HEAD}`}>part no.</div>
            <div className={`${TABLE_HEAD}`}>price</div>
            <div className={`${TABLE_HEAD}`}>qty</div>
            <div className={`${TABLE_HEAD}`}>subtotal</div>
            <div className={`${TABLE_HEAD}`}>remove</div>
          </div>
          {/* cart items */}
          <div className="mt-4 grid gap-4 md:grid-cols-8 lg:grid-cols-8">
            {allCartItems?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className="flex items-center">
                    <div className="relative mx-auto h-[110px] w-[110px] overflow-hidden rounded-lg">
                      {pageLoading ? (
                        <Skeleton
                          variant="rectangular"
                          height={'100%'}
                          width={'100%'}
                        />
                      ) : (
                        <Image
                          //   placeholderSrc={item?.image}
                          fill
                          src={'https://picsum.photos/seed/picsum/200/300'}
                          className={`cat_border h-full w-full overflow-hidden rounded-lg object-cover transition-all duration-500`}
                        />
                      )}
                    </div>
                  </div>
                  <div className={`md:col-span-2 lg:col-span-2 ${TABLE_DATA}`}>
                    {pageLoading ? (
                      <Skeleton width={'70%'} height={'30px'} />
                    ) : (
                      <div
                        style={{ textAlign: 'left' }}
                        className="w-[95%] text-base font-[500] capitalize"
                      >
                        {item?.title}
                        <div className="text-[13px] text-[gray]">
                          {item?.varients != '' && (
                            <>
                              <span className="mr-3">
                                {item?.firstvarianttype != undefined &&
                                  item?.firstvarianttype +
                                    ': ' +
                                    item?.varients?.firstvariant}
                              </span>
                              <span className="mr-3">
                                {item?.secondvarianttype != undefined &&
                                  item?.secondvarianttype +
                                    ': ' +
                                    item?.varients?.secondvariant}
                              </span>
                              <span className="">
                                {item?.thridvarianttype != undefined &&
                                  item?.thridvarianttype +
                                    ': ' +
                                    item?.varients?.thridvariant}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`${TABLE_DATA}`}>{item?.part_no}</div>
                  <div className={`${TABLE_DATA}`}>
                    {pageLoading ? (
                      <div className="flex justify-center">
                        <Skeleton width={'50%'} height={'30px'} />
                      </div>
                    ) : (
                      <span
                        className="font-[500]"
                        style={{ fontFamily: 'Encode Sans' }}
                      >
                        {'INR ' + item?.b2csellprice}
                      </span>
                    )}
                  </div>
                  <div className={`${TABLE_DATA}`}>
                    {pageLoading ? (
                      <Skeleton
                        variant="rectangular"
                        width={'100%'}
                        height={'40px'}
                      />
                    ) : (
                      <div className="w-full">
                        {/* <QuantitySet
                          handleAddManualItems={handleAddManualItems}
                          qty={item?.quantity}
                          item={item}
                          handleAddItems={handleAddItems}
                          handleMinusItems={handleMinusItems}
                        /> */}
                      </div>
                    )}
                  </div>
                  <div className={`${TABLE_DATA}`}>
                    {pageLoading ? (
                      <div className="flex justify-center">
                        <Skeleton width={'50%'} height={'30px'} />
                      </div>
                    ) : (
                      <span
                        className="font-[500]"
                        style={{ fontFamily: 'Encode Sans' }}
                      >
                        {'INR ' + item?.b2csellprice * item?.quantity}
                      </span>
                    )}
                  </div>
                  <div
                    className={`${TABLE_DATA}`}
                    style={{ paddingLeft: 0 }}
                    // onClick={() => {
                    //   if (item?.varients != undefined) {
                    //     dispatch(removeCartItems(item?.varients?.url, toast))
                    //   } else {
                    //     dispatch(removeCartIdItems(item?._id, toast))
                    //   }
                    // }}
                  >
                    {pageLoading ? null : (
                      <div className="mx-auto flex h-full w-full justify-center hover:cursor-pointer">
                        <MdClose fontSize={'18px'} />
                      </div>
                    )}
                  </div>
                </Fragment>
              )
            })}
          </div>
          {/* total */}
          <div className="grid gap-4 md:grid-cols-8 lg:grid-cols-8">
            <div className="md:col-span-5 lg:col-span-5" />

            <div style={{ fontSize: '15px' }} className={`${TABLE_HEAD}`}>
              grand total
            </div>
            <div className="">
              {pageLoading ? (
                <div className="flex justify-center">
                  <Skeleton width={'50%'} height={'30px'} />
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: 'Encode Sans',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                  className={`${TABLE_DATA}`}
                >
                  {'INR ' + totalPrice}
                </div>
              )}
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default DesktopCart
