import { cx } from '@linaria/core'
import { BodyText, elMt11, elMt8, FlexContainer, Loader, Subtitle, Table } from '@reapit/elements'
import { PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'
import * as React from 'react'
import Chart from 'react-apexcharts'
import { GiGreenhouse } from 'react-icons/gi'
import { MdApartment, MdLandscape, MdOutlineDeveloperBoard, MdOutlineHouse } from 'react-icons/md'
import { useGetPropertiesBy } from '../../../platform-api/property-api'
import { createTableRows } from '../../../utils/helpers'
import { isFlexGap4, PropertyIcon } from '../__styles__/styles'

enum PropertyType {
  house = 'house',
  flatApartment = 'flatApartment',
  land = 'land',
  cottage = 'cottage',
  developmentPlot = 'developmentPlot',
}

const trigoStrength = 3
const iteration = 11

function getRandom() {
  const i = iteration
  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  let i = 0
  const series: any[] = []
  while (i < count) {
    const x = baseval
    const y = (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)

    series.push([x, y])
    baseval += 300000
    i++
  }
  console.log(yrange)
  return series
}

const options = {
  chart: {
    id: 'apexchart-example',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  },
}
const series = [
  {
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
  },
]

const optionsLine = {
  chart: {
    height: 350,
    stacked: true,
    animations: {
      enabled: true,
      dynamicAnimation: {
        speed: 1000,
      },
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22,
    },
    events: {
      animationEnd: function (chartCtx) {
        const newData1 = chartCtx.w.config.series[0].data.slice()
        newData1.shift()
        const newData2 = chartCtx.w.config.series[1].data.slice()
        newData2.shift()
        window.setTimeout(function () {
          chartCtx.updateOptions(
            {
              series: [
                {
                  data: newData1,
                },
                {
                  data: newData2,
                },
              ],
              subtitle: {
                text: parseInt((getRandom() * Math.random()).toString()),
              },
            },
            false,
            false,
          )
        }, 300)
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 5,
  },
  grid: {
    padding: {
      left: 0,
      right: 0,
    },
  },
  markers: {
    size: 0,
    hover: {
      size: 0,
    },
  },

  xaxis: {
    range: 2700000,
  },
  legend: {
    show: true,
    floating: true,
    onItemClick: {
      toggleDataSeries: false,
    },
    offsetY: -33,
    offsetX: 60,
  },
}

const seriesLine = [
  {
    name: 'This year',
    data: generateMinuteWiseTimeSeries(new Date('12/12/2016 00:20:00').getTime(), 12, {
      min: 30,
      max: 110,
    }),
  },
  {
    name: 'Last year',
    data: generateMinuteWiseTimeSeries(new Date('12/12/2016 00:20:00').getTime(), 12, {
      min: 30,
      max: 110,
    }),
  },
]

const optionsCircle = {
  chart: {
    height: 250,
    offsetX: 0,
  },
  plotOptions: {
    radialBar: {
      inverseOrder: false,
      hollow: {
        margin: 5,
        size: '48%',
        background: 'transparent',
      },
      track: {
        show: true,
        background: '#40475D',
        strokeWidth: '10%',
        opacity: 1,
        margin: 3, // margin is in pixels
      },
    },
  },
  labels: ['House', 'Flat Apartment'],
  legend: {
    show: true,
    // position: 'left',
    offsetX: -30,
    offsetY: -10,
    formatter: function (val, opts) {
      return val + ' - ' + opts.w.globals.series[opts.seriesIndex] + '%'
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
}

const seriesCircle = [71, 63]

const Home = () => {
  const [showListing, setShowListing] = React.useState<PropertyType>(PropertyType.house)

  const house = useGetPropertiesBy({
    pageNumber: 1,
    type: 'house',
    officeId: 'MKT',
  })
  const flatApartment = useGetPropertiesBy({
    pageNumber: 1,
    type: 'flatApartment',
    officeId: 'MKT',
  })
  const land = useGetPropertiesBy({
    pageNumber: 1,
    type: 'land',
    officeId: 'MKT',
  })
  const cottage = useGetPropertiesBy({
    pageNumber: 1,
    type: 'cottage',
    officeId: 'MKT',
  })
  const developmentPlot = useGetPropertiesBy({
    pageNumber: 1,
    type: 'developmentPlot',
    officeId: 'MKT',
  })

  let propertyType: PropertyModelPagedResult | null = null
  if (house.data && flatApartment.data && cottage.data && land.data && developmentPlot.data) {
    switch (showListing) {
      case PropertyType.house:
        propertyType = house.data
        break
      case PropertyType.flatApartment:
        propertyType = flatApartment.data
        break
      case PropertyType.cottage:
        propertyType = cottage.data
        break
      case PropertyType.land:
        propertyType = land.data
        break
      case PropertyType.developmentPlot:
        propertyType = developmentPlot.data
        break
      default:
        throw new Error('Property Type is not defined')
    }
  }

  return (
    <>
      <FlexContainer className={isFlexGap4}>
        <PropertyIcon className="blue" onClick={() => setShowListing(PropertyType.house)}>
          <BodyText>House</BodyText>
          <MdOutlineHouse size={48} /> {house.data?.totalCount}
        </PropertyIcon>

        <PropertyIcon onClick={() => setShowListing(PropertyType.flatApartment)}>
          <BodyText>Flat Apartment</BodyText>
          <MdApartment size={48} /> {flatApartment.data?.totalCount}
        </PropertyIcon>

        <PropertyIcon className="green" onClick={() => setShowListing(PropertyType.cottage)}>
          <BodyText>Cottage</BodyText>
          <GiGreenhouse size={48} /> {cottage.data?.totalCount}
        </PropertyIcon>

        <PropertyIcon className="yellow" onClick={() => setShowListing(PropertyType.land)}>
          <BodyText>Land</BodyText>
          <MdLandscape size={48} /> {land.data?.totalCount}
        </PropertyIcon>

        <PropertyIcon className="red" onClick={() => setShowListing(PropertyType.developmentPlot)}>
          <BodyText>Development Plot</BodyText>
          <MdOutlineDeveloperBoard size={48} />
          {developmentPlot.data?.totalCount}
        </PropertyIcon>
      </FlexContainer>
      <FlexContainer className={cx(elMt11)} isFlexWrap>
        <FlexContainer isFlexColumn>
          <Subtitle>Revenue</Subtitle>
          <Chart options={options} series={series} type="bar" width={500} height={320} />
        </FlexContainer>
        <FlexContainer isFlexColumn>
          <Subtitle>Selling</Subtitle>
          <Chart options={optionsLine} series={seriesLine} type="line" width="500" />
        </FlexContainer>
        <FlexContainer isFlexColumn>
          <Subtitle>This Month</Subtitle>
          <Chart options={optionsCircle} series={seriesCircle} type="donut" width="500" />
        </FlexContainer>
      </FlexContainer>
      {!propertyType ? (
        <Loader label="loading" />
      ) : (
        <FlexContainer isFlexColumn className={elMt8}>
          <Subtitle>{showListing.toUpperCase()}</Subtitle>
          <Table numberColumns={9} rows={createTableRows(propertyType)} />
        </FlexContainer>
      )}
    </>
  )
}

export default Home
