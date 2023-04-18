import { useState, Fragment } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { Checkbox, Divider, FormControlLabel, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { MdClose } from 'react-icons/md'
import { AppButton } from '../basics'
import Scrollbar from '../scrollbar/Scrollbar'
import { BsFilter } from 'react-icons/bs'

export default function ProductFilterSideBar({
  categoryState,
  categories,
  handleCategoryFilter,
}) {
  const [state, setState] = useState({
    left: false,
  })
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  //----------------------------------------------------------------------------------

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300,
        height: '600px',
      }}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />

      <div className="flex justify-between px-0 sm:px-2">
        <h5 className="mb-5 ml-1 text-base font-bold uppercase">Filter</h5>
        <span
          className="mt-6 cursor-pointer text-xl"
          onClick={toggleDrawer(anchor, false)}
        >
          <span className="transition-all duration-500 hover:rotate-90">
            <MdClose />
          </span>
        </span>
      </div>
      <Divider />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 2.5 }}>
          <Stack spacing={1}>
            <Typography variant="subtitle1"> Category </Typography>
            {categories?.map((item) => {
              return (
                <FormControlLabel
                  key={item?._id}
                  label={item?.name}
                  control={
                    <Checkbox
                      key={item?._id}
                      value={item?._id}
                      checked={categoryState?.split(',')?.includes(item?._id)}
                      onChange={handleCategoryFilter}
                    />
                  }
                />
              )
            })}
          </Stack>
          <Divider />
          {/* <Stack spacing={1}>
            <Typography variant="subtitle1">Brand</Typography>
            <RHFRadioGroup name="brand" options={[1, 2, 3, 4]} row={false} />
          </Stack> */}

          {/* <Stack spacing={1}>
              <Typography variant="subtitle1"> Color </Typography>

              <Controller
                name="colors"
                control={control}
                render={({ field }) => (
                  <ColorMultiPicker
                    selected={field.value}
                    colors={FILTER_COLOR_OPTIONS}
                    onChangeColor={(color) => field.onChange(getSelected(field.value, color))}
                    sx={{ maxWidth: 36 * 4 }}
                  />
                )}
              />
            </Stack> */}

          {/* <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Price
              </Typography>

              <Stack direction="row" spacing={2}>
                <InputRange type="min" />
                <InputRange type="max" />
              </Stack>

              <RHFSlider
                name="priceRange"
                step={10}
                min={0}
                max={200}
                marks={marksLabel}
                getAriaValueText={(value) => `$${value}`}
                valueLabelFormat={(value) => `$${value}`}
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">Rating</Typography>

              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {FILTER_RATING_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            icon={<Rating readOnly value={4 - index} />}
                            checkedIcon={<Rating readOnly value={4 - index} />}
                            sx={{
                              '&:hover': { bgcolor: 'transparent' },
                            }}
                          />
                        }
                        label="& Up"
                        sx={{
                          my: 0.5,
                          borderRadius: 1,
                          '&:hover': { opacity: 0.48 },
                          ...(field.value.includes(item) && {
                            bgcolor: 'action.selected',
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </Stack> */}
        </Stack>
      </Scrollbar>
    </Box>
  )

  return (
    <Box className="cursor-pointer">
      {['right'].map((anchor) => (
        <Fragment key={anchor}>
          <Box onClick={toggleDrawer(anchor, true)}>
            <AppButton title="Filter" endIcon={<BsFilter />} />
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </Box>
  )
}
